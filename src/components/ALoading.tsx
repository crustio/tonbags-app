import classNames from "classnames";
import { HTMLAttributes } from "react";
import { RiLoader2Fill } from "react-icons/ri";

export function Loading(p: { size?: string } & HTMLAttributes<HTMLDivElement>) {
  const { className, color, size = "", ...other } = p;
  return (
    <div
      {...other}
      className={classNames(
        "text-black w-full h-full flex items-center justify-center sticky left-0",
        className
      )}
    >
      <RiLoader2Fill
        color={color}
        style={size ? { fontSize: size } : {}}
        className="text-[3.125rem] animate-spin"
      />
    </div>
  );
}

export function LoadingFull() {
  return (
    <Loading className="fixed z-50 left-0 top-0 w-full !h-full bg-black/25" />
  );
}
