import { useEffect, useState } from 'react';
import '../App.css';
import ATable from '../components/ATable';
import { Pagination } from '../components/Pagination';
import {
    copyTextToClipboard,
    getCurrentUrlParams,
    scrollToTop,
    truncateMiddle
} from '../utils/utils';

export type pagination = {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
};

export type data = {
    address: string;
    file: string;
    fileName: string;
    fileSize: string;
    from: string;
    id: string;
    bagId: string;
    uploadDate: string;
    saveMode: '' | 'ton' | 'crust';
    cid: string;
};

export type responseData = {
    data: data[];
    countFileSize: number;
    pagination: pagination;
};

const Files = () => {
    const [userData, setUserData] = useState<responseData>();
    const [loading, setLoading] = useState(true);
    // const tonAdd = useTonWallet();
    const [pgNum, setPgNum] = useState(1);
    // const userFriendlyAddress = useTonAddress();
    const add = getCurrentUrlParams();

    // const userFriendlyAddress = tonAdd?.account.address && toUserFriendlyAddress(tonAdd.account.address, false)

    const getCurrentUserInfo = async () => {
        setLoading(true);
        const url = `https://tonbags-api.crust.network/users?address=${add.address}&page=${pgNum}&pageSize=8`;
        if (!add?.address) return;
        fetch(url, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                if (res.success && res.data.length) {
                    setUserData({} as responseData);
                    setUserData(res);
                }
            })
            .catch(err => {
                console.log('err', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getCurrentUserInfo();
    }, [add?.address, pgNum]);

    return (
        <div className="h-full min-h-[584px] w-full text-black text-left flex flex-col ">
            {
                <>
                    <span className=" text-xl">My Files</span>
                    {add?.address && (
                        <div className="flex  items-center gap-5 mt-5">
                            <span className=" ">Address:</span>
                            <div className=" font-medium">{truncateMiddle(add?.address, 5, 5)}</div>
                            <button onClick={() => copyTextToClipboard(add?.address || '')}>
                                <img src="/copy.svg" className=" w-5" />
                            </button>
                        </div>
                    )}

                    <div className=" flex w-full gap-5  flex-wrap mt-[10px] text-black">
                        <div>Files Stored: {userData?.pagination?.totalRecords || ''}</div>
                        <div>Space Usage: {userData?.countFileSize}</div>
                    </div>

                    <div className="mt-5  w-full flex-1  overflow-auto pb-2.5">
                        <ATable
                            className='w-[57.8125rem]'
                            loading={loading}
                            header={[
                                { name: 'Name', className: 'min-w-[211px]' },
                                { name: 'Identifier', className: 'min-w-[161px]' },
                                { name: 'Mode', className: 'min-w-[61px]' },
                                { name: 'Size', className: 'min-w-[111px]' },
                                { name: 'Upload Date', className: 'min-w-[161px]' },
                                { name: 'From', className: 'min-w-[111px]' },
                                { name: 'Action', className: 'min-w-[111px]' }
                            ]}
                            data={userData?.data}
                        />
                    </div>
                </>
            }
            <div className="shrink-0 mt-4">
                <Pagination
                    onChange={(num: number, count?: number) => {
                        setPgNum(num);
                        scrollToTop();
                        if (num === 1 || !count) return;
                    }}
                    total={userData?.pagination?.totalRecords || 0}
                    pgSize={Number(userData?.pagination.pageSize) || 1}
                    pgNum={Number(userData?.pagination.page) || 8}
                />
            </div>
        </div>
    );
};

export default Files;
