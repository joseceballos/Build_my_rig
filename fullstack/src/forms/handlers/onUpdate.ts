import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function onUpdate(
  event: React.FormEvent<HTMLFormElement>,
  id: number,
  fnPost: Function,
  fnError: Function,
  fnOnSuccess: (id: number) => void,
  router: AppRouterInstance
) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const res = await fnPost(id, formData);

  if (!res.success && res.errors) {
    const flattenedErrors: { [key: string]: string } = {};

    Object.entries(res.errors.fieldErrors).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        flattenedErrors[key] = value?.join(", ") || "";
      } else {
        flattenedErrors[key] = "";
      }
    });

    fnError(flattenedErrors);
  } else {
    fnError({});
    fnOnSuccess(id);
    console.log("submitted succesfully!");
  }
}
