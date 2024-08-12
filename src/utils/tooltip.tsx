import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

export function InitToolTip() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return isMounted ? (
        <Tooltip
            className="z-[999999]  break-all shadow-[0_10px_10px_0_rgba(0,0,0,0.3)] border border-[#eee] max-w-[20.5rem]"
            style={{ backgroundColor: 'rgb(255, 255, 255,1)', color: '#222' }}
            id="tooltip"
            anchorSelect="#not-clickable"
            opacity={1}
            delayHide={100}
        />
    ) : null;
}
