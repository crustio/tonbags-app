import { FC } from "react";
import { data } from "../pages/files";
import { formatBytes, timestampToDateTime, truncateMiddle } from "../utils/utils";
type ATableProps = {
    header: { name: string }[]
    data?: data[]
}

const ATable: FC<ATableProps> = ({ header = [], data = [] }) => {
    return <>

        <table className=" overflow-auto">
            <tr className=" bg-[#FAFAFA] rounded-lg h-[50px] w-[200px] border-b-[#FFFFFF] ">
                {header.map((item, i) => {
                    return <th key={`table_${i}`} className=" w-full">{item.name}</th>
                })}
            </tr>

            {data.length > 0 && data.map((item, i) => {
                return <tr className="bg-[#FFFFFF] border-b" key={`col_${i}`}>
                    <td><div className="w-[150px]">{truncateMiddle(item.fileName, 10, 4)}</div></td>
                    <td><div className="w-[100px]">{truncateMiddle(item.id, 5, 5)}</div></td>
                    <td><div className="w-[100px]">{formatBytes(Number(item.fileSize))}</div></td>
                    <td><div className="w-[150px]">{timestampToDateTime(Number(item.uploadDate))}</div></td>
                    <td><div className="w-[100px]">{item.from}</div></td>
                </tr>

            })}

        </table>

    </>;
};

export default ATable
