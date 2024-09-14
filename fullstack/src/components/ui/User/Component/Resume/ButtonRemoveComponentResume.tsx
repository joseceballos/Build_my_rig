"use client";

import { deleteCookie } from "@/actions/cookies";
import ButtonRemove from "../../../Buttons/actions/ButtonDelete";

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
