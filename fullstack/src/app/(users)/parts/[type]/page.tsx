'use server';

import SelectPartTable from "@/components/layouts/Tables/SelectPartTable";
import { Part, Parts, PartTypes } from "@/types/Parts";
import { redirect } from "next/navigation";

const partsCollection: Record<PartTypes, Part[]> = {
  [PartTypes.cpu]: [
    { id: 1, productName: "AMD Ryzen 5 7600X" },
    { id: 2, productName: "AMD Ryzen 5 7700X" },
  ],
  [PartTypes.motherboard]: [
    { id: 1, productName: "AMD Ryzen 5 7600X" },
    { id: 2, productName: "AMD Ryzen 5 7700X" },
  ],
};


function typeValidation(param: string): (PartTypes | undefined) {
  const enumKey:([string, PartTypes] | undefined) = Object.entries(PartTypes).find(
    ([key,val]) => val.toLowerCase() === param.toLowerCase()
  );

  if(enumKey !== undefined)
  {
    return(enumKey[1]);
  }

  else {
    return undefined;
  }
}

export default async function SelectPartPage({params}:{params: {type: string} }) {
  const type = typeValidation(params.type);
  if(!type)
  {
    redirect('/');
  }
  
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <SelectPartTable type={type} parts={partsCollection[type]} />
    </main>
  );
}