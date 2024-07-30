import { useCallback, useEffect, useState } from 'react';
import '../App.css'
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react'
import axios from 'axios'
import ATable from '../components/ATable'
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


  const userFriendlyAddress = useTonAddress();

  const getCurrentUserInfo = useCallback(async () => {
    if (!userFriendlyAddress) return
    const { status, data = { success: false, data: [] }, } = await axios(`http://localhost:3010/users?address=${userFriendlyAddress}`, {})
    if (status === 200 && data.success === true) {
      setUserData([])

      setUserData(data.data)
    }
  }, [userFriendlyAddress])

  console.log('resresres', userData,);


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
          <div>
            <div className=' text-3xl text-left'>
              My FIles
            </div>
            <div className=' flex w-full gap-10 ml-5 mt-5'>
              <div>
                Files stored: {totalSize}
              </div>
              <div>
                space usage: 233 B
              </div>

            </div>
            <div className='ml-5 mt-5 '>
              <ATable
                header={[{ name: 'Name' }, { name: 'CID', }, { name: 'Size', }, { name: 'uploadDate', }, { name: 'From' }]}
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