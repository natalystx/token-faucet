import { cn } from "@/utils/cn";
import React from "react";

export enum BUTTON_VARIANT {
  CONTAINED = "CONTAINED",
  LINK = "LINK",
}

type ButtonProps = {
  variant?: BUTTON_VARIANT;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  variant = BUTTON_VARIANT.CONTAINED,
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        "p-2 rounded-lg h-11 text-sm font-medium cursor-pointer",
        {
          ["bg-primary-500  text-white disabled:text-gray-300 disabled:bg-[#25233b]"]:
            variant === BUTTON_VARIANT.CONTAINED,
          ["bg-transparent text-primary-300 disabled:opacity-60 hover:text-white"]:
            variant === BUTTON_VARIANT.LINK,
        },

        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
