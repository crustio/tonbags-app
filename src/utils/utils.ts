export const timestampToDateTime = (timestamp: number) => {
    const date = new Date((timestamp * 1000) / 1000);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    // const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

type DataItem = {
    [key: string]: number | string;
};

export function calculateTotalFileSize<T extends DataItem>(data: T[], key: string) {
    if (data && data.length <= 0 && !key) return;
    let totalSize = 0;
    data.forEach(item => {
        totalSize += parseInt(item[key] as string);
    });
    return formatBytes(totalSize);
}

export const truncateMiddle = (str: string, frontLen: number, endLen: number) => {
    if (str.length <= frontLen + endLen) {
        return str;
    }
    const start = str.slice(0, frontLen);
    const end = str.slice(-endLen);
    return `${start}...${end}`;
};
