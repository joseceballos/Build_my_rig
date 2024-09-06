"use client";

import ButtonAction from "../ButtonAction";

export default function ButtonEdit({
  onClick,
  defaultLogo,
  customText
}: {
  onClick: Function;
  defaultLogo: boolean;
  customText?: string
}) {
  return <ButtonAction onClick={onClick} defaultLogo={defaultLogo} logo="Edit" customText={customText} />;
}
