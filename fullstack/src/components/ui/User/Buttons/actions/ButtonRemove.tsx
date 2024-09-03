"use client";

import ButtonAction from "../ButtonAction";

export default function ButtonRemove({
  onClick,
  defaultLogo,
  customText
}: {
  onClick: () => Promise<void>;
  defaultLogo: boolean;
  customText?: string
}) {
  return <ButtonAction onClick={onClick} defaultLogo={defaultLogo} logo="Remove" customText={customText} />;
}
