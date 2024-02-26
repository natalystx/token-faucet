import React, { useEffect } from "react";
import Input from "../Input";
import { cn } from "@/utils/cn";
import { useViewModel } from "./viewmodel";
import type { Option } from "./viewmodel";
import { ReactComponent as LeftArrow } from "@/assets/icons/chevron-left.svg";
import { css } from "@emotion/css";

type DropdownProps = {
  options: Option[];
  onChange: (val: Option) => void;
};

const Dropdown = ({ options, onChange }: DropdownProps) => {
  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    setRefElement,
    setPopperElement,
    isOpen,
    setIsOpen,
    highlightedIndex,
    styles,
    attributes,
    selectedItem,
    refElement,
  } = useViewModel(options);

  useEffect(() => {
    selectedItem && onChange(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem?.value]);

  return (
    <div {...getLabelProps()} className="w-full">
      <Input
        {...getToggleButtonProps({ ref: setRefElement })}
        label="Token"
        className="w-full"
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        defaultValue={selectedItem?.label}
        endIcon={
          <LeftArrow
            className={cn(
              isOpen ? "rotate-90" : "-rotate-90",
              "size-4 text-white"
            )}
          />
        }
      />
      <ul
        {...getMenuProps({ ref: setPopperElement })}
        className={cn(
          !isOpen && "invisible",
          "bg-white rounded-lg z-10 overflow-hidden",
          css`
            width: ${refElement?.getBoundingClientRect()?.width}px;
          `
        )}
        style={{ ...styles.popper }}
        {...attributes.popper}
      >
        {options.map((item, index) => (
          <li
            key={item.value}
            {...getItemProps({
              item,
              index,
            })}
            className={cn(
              "h-9 w-full px-4 py-2 flex-1 cursor-pointer",
              highlightedIndex === index && "bg-slate-400"
            )}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
