import { PartTypes } from "@/types/Parts";

export function partTypeValidation(key: string): PartTypes {
    const enumKey:([string, PartTypes]) = Object.entries(PartTypes).find(
      ([_,val]) => val.toLowerCase() === key.toLowerCase()
    )!;
    
    return(enumKey[1]);
}