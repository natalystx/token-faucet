"use client";

import { cn } from "@/utils/cn";
import React, { forwardRef, useId } from "react";

type InputProps = {
  label: string;
  wrapperClassName?: string;
  endIcon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, wrapperClassName, className, endIcon, ...rest }, ref) => {
    const id = useId();
    return (
      <div
        className={cn(
          "flex flex-col gap-y-2 w-full relative",
          wrapperClassName
        )}
      >
        <label htmlFor={id} className="text-white text-sm font-medium">
          {label}
        </label>
        <div className="w-full relative">
          <input
            {...rest}
            className={cn(
              "h-11 rounded-lg border border-primary-500 text-white bg-primary-950",
              !!endIcon && "pr-10",
              className
            )}
            ref={ref}
            id={id}
          />
          {endIcon && (
            <div className="w-10 h-full flex justify-center items-center absolute right-0 top-0">
              {endIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
