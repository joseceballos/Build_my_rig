import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function onDelete(
  id: number,
  fnPost: Function,
  fnOnSuccess: (id: number) => void,
): Promise<{ success: boolean }> {
  const res = await fnPost(id);

  if (!res.success && res.errors) {
    return {
      success: false,
    };
  } else {
    fnOnSuccess(id);
    console.log("submitted succesfully!");
    return {
      success: true,
    };
  }
}
