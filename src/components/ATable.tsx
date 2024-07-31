import { FC } from "react";
import { responseData } from "../pages/files";
import { formatBytes, timestampToDateTime, truncateMiddle } from "../utils/utils";
type ATableProps = {
    header: { name: string }[]
    data: responseData[]
}

const ATable: FC<ATableProps> = ({ header = [], data = [] }) => {
    return <>

        <table className=" overflow-auto">
            <tr className=" bg-[#FAFAFA] rounded-lg h-[50px] border-b-[#FFFFFF] ">
                {header.map((item, i) => {
                    return <th key={`table_${i}`} className=" w-[200px]">{item.name}</th>
                })}
            </tr>

            {data.length > 0 && data.map((item, i) => {
                return <tr className="bg-[#FFFFFF] border-b" key={`col_${i}`}>
                    <td>{item.fileName}</td>
                    <td>{truncateMiddle(item.id, 6, 6)}</td>
                    <td>{formatBytes(Number(item.fileSize))}</td>
                    <td>{timestampToDateTime(Number(item.uploadDate))}</td>
                    <td>{item.from}</td>
                </tr>

            })}

        </table>

    </>;
};

export default ATable
