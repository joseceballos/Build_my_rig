"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCookie(type: string, id: number) {
  const cookiesStore = cookies();

  await cookiesStore.set({ name: type, value: id.toString() });

  redirect("/");
}

export async function deleteCookie(type: string) {
  const cookiesStore = cookies();

  await cookiesStore.delete(type);

  redirect("/");
}
