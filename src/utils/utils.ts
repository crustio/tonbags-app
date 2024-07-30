import { encodeTelegramUrlParameters, isTelegramUrl, WalletInfoRemote } from '@tonconnect/sdk';
import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { responseData } from '../pages/files';

export const AT_WALLET_APP_NAME = 'telegram-wallet';

export const pTimeoutException = Symbol();

export function pTimeout<T>(
    promise: Promise<T>,
    time: number,
    exception: unknown = pTimeoutException
): Promise<T> {
    let timer: ReturnType<typeof setTimeout>;
    return Promise.race([
        promise,
        new Promise((_r, rej) => (timer = setTimeout(rej, time, exception)))
    ]).finally(() => clearTimeout(timer)) as Promise<T>;
}

export function addTGReturnStrategy(link: string, strategy: string): string {
    const parsed = new URL(link);
    parsed.searchParams.append('ret', strategy);
    link = parsed.toString();

    const lastParam = link.slice(link.lastIndexOf('&') + 1);
    return link.slice(0, link.lastIndexOf('&')) + '-' + encodeTelegramUrlParameters(lastParam);
}

export function convertDeeplinkToUniversalLink(link: string, walletUniversalLink: string): string {
    const search = new URL(link).search;
    const url = new URL(walletUniversalLink);

    if (isTelegramUrl(walletUniversalLink)) {
        const startattach = 'tonconnect-' + encodeTelegramUrlParameters(search.slice(1));
        url.searchParams.append('startattach', startattach);
    } else {
        url.search = search;
    }

    return url.toString();
}

export async function buildUniversalKeyboard(
    link: string,
    wallets: WalletInfoRemote[]
): Promise<InlineKeyboardButton[]> {
    const atWallet = wallets.find(wallet => wallet.appName.toLowerCase() === AT_WALLET_APP_NAME);
    const atWalletLink = atWallet
        ? addTGReturnStrategy(
              convertDeeplinkToUniversalLink(link, atWallet?.universalLink),
              process.env.TELEGRAM_BOT_LINK!
          )
        : undefined;

    const keyboard = [
        {
            text: 'Choose a Wallet',
            callback_data: JSON.stringify({ method: 'chose_wallet' })
        },
        {
            text: 'Open Link',
            url: `https://ton-connect.github.io/open-tc?connect=${encodeURIComponent(link)}`
        }
    ];

    if (atWalletLink) {
        keyboard.unshift({
            text: '@wallet',
            url: atWalletLink
        });
    }

    return keyboard;
}

export const timestampToDateTime = (timestamp: number) => {
    const date = new Date((timestamp * 1000) / 1000);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
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
