import { FC } from "react";
import { responseData } from "../pages/files";
import { formatBytes, timestampToDateTime } from "../utils/utils";
type ATableProps = {
    header: { name: string }[]
    data: responseData[]
}

const ATable: FC<ATableProps> = ({ header = [], data = [] }) => {
    return <>

        <table>
            <tr className="">
                {header.map((item, i) => {
                    return <th key={`table_${i}`} className=" w-[200px]">{item.name}</th>
                })}
            </tr>

            {data.length > 0 && data.map((item, i) => {
                return <tr key={`col_${i}`}>
                    <td>{item.fileName}</td>
                    <td>{item.id}</td>
                    <td>{formatBytes(Number(item.fileSize))}</td>
                    <td>{timestampToDateTime(Number(item.uploadDate))}</td>
                    <td>{item.from}</td>
                </tr>

            })}

        </table>

    </>;
};

export default ATable
