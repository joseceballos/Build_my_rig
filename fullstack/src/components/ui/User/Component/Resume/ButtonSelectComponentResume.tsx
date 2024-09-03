'use client';

import { useRouter } from "next/navigation";
import ButtonAdd from "../../Buttons/actions/ButtonAdd";

export default function ButtonSelectComponent({typeName}:{typeName: string}) {
  const router = useRouter();

  async function handleRedirect() {
    router.push(`parts/${typeName}`);
  }

  return (
    <ButtonAdd onClick={handleRedirect} defaultLogo={false} customText={`Choose a ${typeName}`} />
  )
}