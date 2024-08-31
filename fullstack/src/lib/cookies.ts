import { cookies } from "next/headers";
import { PartTypes } from "@/types/Parts";
import { partTypeValidation } from "./validation";

export function getResumePartsFromCookies() {
  const cookiesStore = cookies();
  console.log('cookies', cookiesStore.getAll());

  const resumeParts = Object.entries(PartTypes).map(([key, value]) => {
    if(cookiesStore.has(value))
    {
      return {type: partTypeValidation(key), value: +cookiesStore.get(value)!.value};
    }
    return {type: partTypeValidation(key), value: undefined};
  })

  return resumeParts;
}