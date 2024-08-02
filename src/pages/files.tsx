import { TonConnectButton, toUserFriendlyAddress, useTonWallet } from '@tonconnect/ui-react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import ATable from '../components/ATable';
import { Pagination } from '../components/Pagination';

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
  uploadDate: string;
}

export type responseData = {
  data: data[]
  countFileSize: number
  pagination: pagination

}

const Files = () => {
  const [userData, setUserData] = useState<responseData>()
  const tonAdd = useTonWallet();
  const [pgNum, setPgNum] = useState(1)

  const userFriendlyAddress = tonAdd?.account.address && toUserFriendlyAddress(tonAdd.account.address, false)



  const getCurrentUserInfo = useCallback(async () => {
    if (!userFriendlyAddress) return
    const { status, data = { success: false, data: [] }, } = await axios(`https://tonbags-api.crust.network/users?address=${userFriendlyAddress}&page=${pgNum}&pageSize=10`)
    if (status === 200 && data.success === true) {
      setUserData({} as responseData)
      setUserData(data)
    }
  }, [userFriendlyAddress, pgNum])



  useEffect(() => {
    getCurrentUserInfo()

  }, [getCurrentUserInfo])



  return (
    <div className=' mb-40'>
      <div className=' flex justify-center'>
        <TonConnectButton />
      </div>
      {
        userFriendlyAddress && (
          <div className=' border-[#snow]  my-5  '>
            <div>
              <div className=' text-xl text-left text-black  '>
                My Files
              </div>
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
              <div className=' mt-10'>
                <Pagination
                  onChange={(num: number, count?: number) => {
                    setPgNum(num);
                    if (num === 1 || !count) return;
                  }}
                  total={userData?.pagination?.totalRecords || 0}
                  pgSize={userData?.pagination?.pageSize || 1}
                  pgNum={userData?.pagination?.page || 10} />

              </div>
            </div>

          </div>
        )
      }

    </div>
  )
}

export default Files