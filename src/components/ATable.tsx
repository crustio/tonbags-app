import { FC } from "react";
import { data } from "../pages/files";
import { copyTextToClipboard, formatBytes, timestampToDateTime, truncateMiddle } from "../utils/utils";
type ATableProps = {
    header: { name: string }[]
    data?: data[]
}

const ATable: FC<ATableProps> = ({ header = [], data = [] }) => {
    return <>

        <table className=" overflow-auto mb-[5px]  ">
            <tr className=" bg-[#FAFAFA] rounded-lg h-[50px] w-[200px] border-b-[#FFFFFF]  ">
                {header.map((item, i) => {
                    return <th key={`table_${i}`} className={`${data.length && ' w-full pl-1'}`}>{item.name}</th>
                })}
            </tr>

            {data.length > 0 && data.map((item, i) => {
                return <tr className="bg-[#FFFFFF] border-b  odd:bg-slate-50  pl-3" key={`col_${i}`}>
                    <td><div className="w-[170px] h-[40px] flex items-center">{truncateMiddle(item.fileName, 5, 5)}</div></td>
                    <td><div className="w-[120px]  flex items-center justify-between ">{truncateMiddle(item.bagId, 5, 5)}
                        <button onClick={() => copyTextToClipboard(item.bagId)}>
                            <img src='/copy.svg' className=" w-5" />
                        </button>
                    </div></td>
                    <td><div className="w-[100px]">{formatBytes(Number(item.fileSize))}</div></td>
                    <td><div className="w-[150px]">{timestampToDateTime(Number(item.uploadDate))}</div></td>
                    <td><div className="w-[100px]">{truncateMiddle(item.from, 5, 5)}</div></td>
                </tr>

            })}

        </table>

    </>;
};

export default ATable
