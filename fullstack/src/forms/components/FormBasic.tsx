"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormWithRouter } from "@/hooks/useFormWithRouter";
import { Path, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { onCreate } from "../handlers/onCreate";
import InputBasic from "./InputBasic";
import { useState } from "react";

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
    options?: { value: number | string; name: string }[];
  }[];
};

export default function FormBasic<T extends z.ZodObject<any>>({
  config,
  fnPost,
  inputs,
}: FormBasicProps<T>) {
  const [inputValues, setInputValues] = useState(config.defaultValues);
  const { errors, setErrors, router, form } = useFormWithRouter(config);
  const defaultValues = config.defaultValues;

  console.log(errors);

  function handleOnChange(name: keyof z.infer<T>, value: string) {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    onCreate(event, fnPost, setErrors, router);
  }

  return (
    <>
    <div className="space-y-4">
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
          onChangeHandle={(
            eventOrValue:
              | string
              | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            if (typeof eventOrValue === "string") {
              handleOnChange(input.name, eventOrValue);
            } else {
              handleOnChange(input.name, eventOrValue.target?.value);
            }
          }}
        />
      ))}

      <Form {...form}>
        <form onSubmit={onSubmit}>
          {inputs.map((input) => (
            <input
              key={input.name}
              type="hidden"
              name={input.name}
              value={inputValues[input.name]}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </>
  );
}
