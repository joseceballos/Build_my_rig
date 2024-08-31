'use server';
import ResumePartsTable from "@/components/layouts/Tables/ResumePartsTable";
import { Part, Parts, PartTypes } from "@/types/Parts";

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

export default async function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <ResumePartsTable partsCollection={partsCollection} />
    </main>
  );
}
