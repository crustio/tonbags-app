import { useTonAddress, } from '@tonconnect/ui-react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import ATable from '../components/ATable';
import { Pagination } from '../components/Pagination';
import { copyTextToClipboard, getCurrentUrlParams, truncateMiddle } from '../utils/utils';

export type pagination = {
  "page": number,
  "pageSize": number,
  "totalRecords": number,
  "totalPages": number
}

export type data = {
  address: string;
  file: string;
  fileName: string;
  fileSize: string;
  from: string;
  id: string;
  bagId: string;
  uploadDate: string;
}

export type responseData = {
  data: data[]
  countFileSize: number
  pagination: pagination

}

const Files = () => {
  const [userData, setUserData] = useState<responseData>()
  // const tonAdd = useTonWallet();
  const [pgNum, setPgNum] = useState(1)
  const userFriendlyAddress = useTonAddress();
  const add = getCurrentUrlParams()




  // const userFriendlyAddress = tonAdd?.account.address && toUserFriendlyAddress(tonAdd.account.address, false)

  const getCurrentUserInfo = async () => {
    const url = `https://tonbags-api.crust.network/users?address=${add.address}&page=${pgNum}&pageSize=10`

    console.log('urlurl', url);

    if (!add?.address) return
    fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    })
      .then((res) => {
        console.log('ressss,res', res);

        if (res.success && res.data.length) {
          setUserData({} as responseData)
          setUserData(res)
        }

      })
      .catch((err) => {
        console.log('err', err);

      })
  }



  useEffect(() => {
    getCurrentUserInfo()
  }, [add?.address, pgNum])



  return (
    <div className=' mb-[100px]'>
      <div className=' flex justify-center'>
        {/* <TonConnectButton /> */}
      </div>
      {
        // userFriendlyAddress && (
        <div className=' border-[#snow]  my-5  '>
          <div className=' text-black  text-left'>
            <span className=' text-xl'>
              My Files
            </span>
            {add?.address && <div className='flex  items-center gap-5 mt-5'>
              <span className=' '>
                Address:
              </span>
              <div className=' font-medium'>
                {truncateMiddle(add?.address, 5, 5)}
              </div>
              <button onClick={() => copyTextToClipboard(add?.address || '')}>
                <img src='/copy.svg' className=" w-5" />
              </button>
            </div>}



            <div className=' flex w-full gap-5  mt-5 text-black'>
              <div>
                Files Stored: {userData?.pagination?.totalRecords || ''}
              </div>
              <div>
                Space Usage: {userData?.countFileSize}
              </div>

            </div>
            <div className='mt-5   mo:w-[350px]  overflow-auto '>
              <ATable
                header={[{ name: 'Name' }, { name: 'BagID', }, { name: 'Size', }, { name: 'Upload Date' }, { name: 'From' }]}
                data={userData?.data}
              />


            </div>
            <div className=' mt-[30px]'>
              <Pagination
                onChange={(num: number, count?: number) => {
                  setPgNum(num);
                  if (num === 1 || !count) return;
                }}
                total={userData?.pagination?.totalRecords || 0}
                pgSize={Number(userData?.pagination.pageSize) || 1}
                pgNum={Number(userData?.pagination.page) || 10} />

            </div>
          </div>

        </div>
        // )
      }

    </div>
  )
}

export default Files