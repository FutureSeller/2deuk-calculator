import { useState } from "react";

export const useDisclosure = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(!!defaultValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle,
  } as const;
};
