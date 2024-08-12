import { toast } from 'sonner';

export const timestampToDateTime = (timestamp: number) => {
    const date = new Date((timestamp * 1000) / 1000);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

type DataItem = {
    [key: string]: string | null;
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
    if (!str) return '';
    if (str.length <= frontLen + endLen) return str;
    const start = str?.substring(0, frontLen) || '';
    const end = str?.substring(str.length - endLen) || '';
    return `${start}...${end}`;
};

export function getCurrentUrlParams() {
    const url = window.location.href;

    const urlObj = new URL(url);

    const params = new URLSearchParams(urlObj.search);

    const paramsObj: DataItem = {};

    params.forEach((value, key) => {
        paramsObj[key] = value;
    });

    return paramsObj;
}

export const copyTextToClipboard = async (text: string) => {
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        toast.success('Copy Successfully!');
    } catch (err) {
        console.error('Unable to copy text to clipboard:', err);
    }
};

export const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementsByClassName('overflow')[0]!.scrollLeft = 0;
};
