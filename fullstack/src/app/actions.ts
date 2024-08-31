'use server';

import { cookies } from 'next/headers';
import { Part, Parts, PartTypes } from "@/types/Parts";
import { redirect } from 'next/navigation';

export async function createCookie(type:PartTypes, id:number) {
  const cookiesStore = cookies();

  await cookiesStore.set({name: type, value: id.toString()});

  redirect("/");
}

export async function deleteCookie(type:PartTypes) {
  const cookiesStore = cookies();

  await cookiesStore.delete(type);

  redirect("/");
}