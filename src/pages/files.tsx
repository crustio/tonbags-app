import { TonConnectButton, toUserFriendlyAddress, useTonWallet } from '@tonconnect/ui-react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import ATable from '../components/ATable';
import { calculateTotalFileSize } from '../utils/utils';

export type responseData = {
  address: string;
  file: string;
  fileName: string;
  fileSize: string;
  from: string;
  id: string;
  uploadDate: string;
};

const Files = () => {
  const [userData, setUserData] = useState<responseData[]>([])
  const tonAdd = useTonWallet();
  const userFriendlyAddress = tonAdd?.account.address && toUserFriendlyAddress(tonAdd.account.address, false)




  const getCurrentUserInfo = useCallback(async () => {
    if (!userFriendlyAddress) return
    const { status, data = { success: false, data: [] }, } = await axios(`https://tonbags-api.crust.network/users?address=${userFriendlyAddress}`, {})
    if (status === 200 && data.success === true) {
      setUserData([])

      setUserData(data.data)
    }
  }, [userFriendlyAddress])



  useEffect(() => {
    getCurrentUserInfo()

  }, [getCurrentUserInfo])

  const totalSize = calculateTotalFileSize(userData, 'fileSize',);



  return (
    <>
      <div className=' flex justify-center'>
        <TonConnectButton />
      </div>
      {
        userFriendlyAddress && (
          <div className=' border-[#snow]  my-5'>
            <div className=' text-xl text-left text-black '>
              My Files
            </div>
            <div className=' flex w-full gap-5  mt-5 text-black'>
              <div>
                Files stored: {totalSize}
              </div>
              <div>
                Space usage
              </div>

            </div>
            <div className='mt-5 '>
              <ATable
                header={[{ name: 'Name' }, { name: 'BagID', }, { name: 'Size', }, { name: 'UploadDate' }, { name: 'From' }]}
                data={userData}
              />

            </div>
            <div>

            </div>

          </div>
        )
      }

    </>
  )
}

export default Files