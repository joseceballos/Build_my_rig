"use client";

import { Button } from "../button";

export default function ButtonAction({
  className,
  onClick,
  defaultLogo,
  logo,
  customText
}: {
  className?: string;
  onClick: (() => Promise<void>) | (() => void);
  defaultLogo: boolean;
  logo?: string;
  customText?: string;
}) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick();
  }

  return (
    <Button className={className} onClick={handleClick}>
      {defaultLogo ? logo : customText}
    </Button>
  );
}