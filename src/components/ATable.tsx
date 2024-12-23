import classNames from "classnames";
import FileSaver from 'file-saver';
import React, { useRef } from "react";
import { data } from "../pages/files";
import { copyTextToClipboard, formatBytes, timestampToDateTime, truncateMiddle } from "../utils/utils";
import { Loading } from "./ALoading";
type ATableProps = {
    header: { name: string, className?: string }[]
    data?: data[]
    loading?: boolean
    className?: string
}

export type ATableRef = { scroll: (to: 'start' | 'end') => void }
const ATable = React.forwardRef(({ header = [], data = [], loading, className }: ATableProps, ref?: React.ForwardedRef<ATableRef>) => {

    const fileHost = (item: data) => {
        const cru_host = 'https://gw.crust-gateway.xyz/ipfs'
        const ton_host = 'https://ton-gateway.crust.network/gateway'
        const host = `${item.bagId ? ton_host : cru_host}/${item.cid || item.bagId}?filename=${encodeURI(item.fileName)}`
        return host
    }

    const onDownloadFile = (item: data) => {
        const host = fileHost(item)
        // const link = document.createElement("a", {});
        // link.download = item.fileName;
        // link.target = "_blank"
        // link.href = host || '';
        // link.click();
        FileSaver.saveAs(host, item.fileName)
    }
    const onShare = (item: data) => {
        return fileHost(item)
    }
    const refFirst = useRef<HTMLElement>(null)
    const refEnd = useRef<HTMLElement>(null)
    if (ref) {
        const refData = {
            scroll: (to: 'start' | 'end') => {
                if (to == 'start') {
                    refFirst.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
                } else {
                    refEnd.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
                }
            }
        }
        typeof ref == 'function' ? ref(refData) : ref.current = refData
    }

    return <>

        <table className={classNames(" mb-[5px]", className)}>
            <tr className=" bg-[#FAFAFA] rounded-lg h-[50px] w-[200px] border-b-[#FFFFFF]  ">
                {header.map((item, i) => {
                    const itemRef = (i == 0 ? refFirst : i == header.length - 1 ? refEnd : () => { })
                    return <th ref={itemRef as any} key={`table_${i}`} className={classNames(`${data.length && !loading && ' w-full'} th`, item.className)}>{item.name}</th>
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
        {loading && <Loading className="mt-[100px]" />}

    </>;
});

export default ATable
