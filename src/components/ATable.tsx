import { FC, useEffect } from "react";
import { data } from "../pages/files";
import { copyTextToClipboard, formatBytes, timestampToDateTime, truncateMiddle } from "../utils/utils";
import { Loading } from "./ALoading";
type ATableProps = {
    header: { name: string }[]
    data?: data[]
    loading?: boolean
}

const ATable: FC<ATableProps> = ({ header = [], data = [], loading }) => {

    const fileHost = (item: data) => {
        const cru_host = 'https://gw.crust-gateway.xyz/ipfs'
        const ton_host = 'https://ton-gateway.crust.network/gateway'
        if (!cru_host || !ton_host) return
        let host = `${item.bagId ? ton_host : cru_host}/${item.cid || item.bagId}?filename=${encodeURI(item.fileName)}`
        return host
    }

    const onDownloadFile = (item: data) => {
        const host = fileHost(item)
        const link = document.createElement("a");
        link.href = host || '';
        link.click();
        URL.revokeObjectURL(link.href);
        window.open()
    }

    const onShare = (item: data) => {
        return fileHost(item)
    }


    return <>

        <table className=" overflow-auto mb-[5px]  ">
            <tr className=" bg-[#FAFAFA] rounded-lg h-[50px] w-[200px] border-b-[#FFFFFF]  ">
                {header.map((item, i) => {
                    return <th key={`table_${i}`} className={`${data.length && !loading && ' w-full'} th`}>{item.name}</th>
                })}
            </tr>
            {!loading && data.length > 0 && data.map((item, i) => {
                return <tr className="bg-[#FFFFFF] border-b  odd:bg-slate-50  pl-3" key={`col_${i}`}>
                    <td><div id="not-clickable"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={item.fileName}
                        data-tooltip-delay-hide={100}
                        data-tooltip-place='top-start' className="w-[200px]  pl-2  h-[40px] flex items-center">{truncateMiddle(item.fileName, 6, 6)}</div></td>
                    <td>
                        <div className="w-[130px]  flex items-center justify-between mr-5  ">{truncateMiddle(item.bagId || item.cid, 5, 5)}
                            <button onClick={() => copyTextToClipboard(item.bagId || item.cid)}>
                                <img src='/copy.svg' className=" w-5" />
                            </button>
                        </div>
                    </td>
                    <td>
                        <div className="w-[30px]  flex items-center justify-between mr-5  ">
                            {item.saveMode}
                        </div>
                    </td>
                    <td><div className="w-[100px]"
                    >{formatBytes(Number(item.fileSize))}</div></td>
                    <td><div className="w-[150px]">{timestampToDateTime(Number(item.uploadDate))}</div></td>
                    <td><div className="w-[100px]">{truncateMiddle(item.from, 5, 5)}</div></td>
                    <td><div className="w-[100px] flex gap-2">
                        <button onClick={() => copyTextToClipboard(onShare(item))}>
                            <img src="share.svg" className="w-5" />
                        </button>
                        <button onClick={() => onDownloadFile(item)}>
                            <img src="download.svg" className="w-5" />
                        </button>
                    </div></td>
                </tr>

            })}

        </table>
        {loading && <Loading />}

    </>;
};

export default ATable
