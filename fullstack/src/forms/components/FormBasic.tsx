import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormWithRouter } from "@/hooks/useFormWithRouter";
import { Path, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { onCreate } from "../handlers/onCreate";
import InputBasic from "./InputBasic";

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
    options?: string[] | number[];
  }[];
};

export default function FormBasic<T extends z.ZodObject<any>>({
  config,
  fnPost,
  inputs,
}: FormBasicProps<T>) {
  const { errors, setErrors, router, form } = useFormWithRouter(config);
  const defaultValues = config.defaultValues;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    onCreate(event, fnPost, setErrors, router);
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {inputs.map((input) => (
          <InputBasic
            key={input.name}
            id={input.name}
            title={input.title}
            placeholder={input.placeHolder}
            type={input.type}
            form={form}
            errors={errors}
            defaultValue={defaultValues[input.name]}
            options={input.options}
            {...form.register(input.name)}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
