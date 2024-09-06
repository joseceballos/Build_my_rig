'use client';

import ButtonEdit from "@/components/ui/Buttons/actions/ButtonEdit";

export default function ButtonEditComponentType({onClickEditable}:{onClickEditable: Function}) {

  return (
    <ButtonEdit onClick={onClickEditable} defaultLogo={true} />
  )
}