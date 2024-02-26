import { usePopover } from "@/hooks/usePopover";
import { useSelect } from "downshift";
import { useState } from "react";

export type Option = {
  label: string;
  value: string;
};

export const useViewModel = (options: Option[]) => {
  const {
    isOpen,
    setIsOpen,
    setPopperElement,
    setRefElement,
    styles,
    attributes,
    refElement,
  } = usePopover();

  const [selectedItem, setSelectedItem] = useState<Option | undefined | null>(
    options[0]
  );
  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
  } = useSelect({
    items: options,
    itemToString: (item) => item?.label || "",
    initialSelectedItem: options[0],
    selectedItem: selectedItem,
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => {
      setSelectedItem(_selectedItem);
      setIsOpen(false);
    },
    isOpen: isOpen,
  });

  return {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    isOpen,
    setIsOpen,
    setPopperElement,
    setRefElement,
    styles,
    attributes,
    options,
    highlightedIndex,
    selectedItem,
    refElement,
  };
};
