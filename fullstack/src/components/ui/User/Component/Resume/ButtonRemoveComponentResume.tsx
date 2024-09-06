'use client';

import { deleteCookie } from "@/app/actions/cookies";
import ButtonRemove from "../../../Buttons/actions/ButtonRemove";

export default function ButtonRemoveComponentResume({
  typeName,
}: {
  typeName: string;
}) {
  async function handleDeleteCookie() {
    deleteCookie(typeName);
  }

  return <ButtonRemove onClick={handleDeleteCookie} defaultLogo={true} />;
}
