"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

type FormDefaultValues<T> = DefaultValues<T>;

type FormConfig<T extends z.ZodObject<any>> = {
  formSchema: T;
  defaultValues: FormDefaultValues<z.infer<T>>;
};

export function useFormWithRouter<T extends z.ZodObject<any>>(
  config: FormConfig<T>,
) {
  const { formSchema, defaultValues } = config;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return {
    errors,
    setErrors,
    router,
    form,
  };
}
