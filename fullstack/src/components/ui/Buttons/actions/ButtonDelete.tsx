"use client";

import ButtonAction from "../ButtonAction";

export default function ButtonDelete({
  onClick,
  defaultLogo,
  customText
}: {
  onClick: () => Promise<void>;
  defaultLogo: boolean;
  customText?: string
}) {
  return <ButtonAction onClick={onClick} defaultLogo={defaultLogo} logo="Del" customText={customText} />;
}
