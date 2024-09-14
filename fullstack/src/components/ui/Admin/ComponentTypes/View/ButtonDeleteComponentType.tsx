"use client";

import ButtonDelete from "@/components/ui/Buttons/actions/ButtonDelete";
import { onDelete } from "@/forms/handlers/onDelete";

export default function ButtonDeleteComponentType({
  fnPost,
  fnOnSuccess,
  id,
}: {
  fnPost: (id: number) => Promise<{ success: boolean }>;
  fnOnSuccess: () => Promise<void>;
  id: number;
}) {
  async function handleDelete() {
    onDelete(id, fnPost, fnOnSuccess);
  }

  return <ButtonDelete onClick={handleDelete} defaultLogo={true} />;
}
