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
  onClick: (() => Promise<void>) | Function;
  defaultLogo: boolean,
  logo?: string;
  customText?: string
}) {
  return <Button className={className} onClick={onClick}>{defaultLogo ? logo : customText}</Button>;
}
