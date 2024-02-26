import { cn } from "@/utils/cn";
import React from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn("py-6 px-4 rounded-2xl bg-primary-950", className)}>
      {children}
    </div>
  );
};

export default Card;
