import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function onCreate(
  event: React.FormEvent<HTMLFormElement>,
  fnPost: Function,
  fnError: Function,
  router: AppRouterInstance
) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const res = await fnPost(formData);
  console.log(res);

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
    console.log("submitted succesfully!");
    router.push("/");
  }
}
