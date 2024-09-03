"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormWithRouter } from "@/hooks/useFormWithRouter";
import { FieldValues, Path, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { onSubmitForm } from "../handlers/onSubmit";

type FormDefaultValues<T> = DefaultValues<T>;

type FormConfig<T extends z.ZodObject<any>> = {
  formSchema: T;
  defaultValues: FormDefaultValues<z.infer<T>>;
};

type FormBasicProps<T extends z.ZodObject<any>> = {
  config: FormConfig<T>;
  fnPost: Function;
  inputs: {
    name: Path<z.infer<T>>;
    title: string;
    placeHolder: string;
    type: string;
  }[];
};

export default function FormBasic<T extends z.ZodObject<any>>({
  config,
  fnPost,
  inputs,
}: FormBasicProps<T>) {
  const { errors, setErrors, router, form } = useFormWithRouter(config);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    onSubmitForm(event, fnPost, setErrors, router);
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {inputs.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name}>{input.title}</label>
            <Input
              id={input.name}
              placeholder={input.placeHolder}
              type={input.type}
              {...form.register(input.name)}
            />
            {errors[input.name] && (
              <p className="text-red-500">{errors[input.name]}</p>
            )}
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
