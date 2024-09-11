"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormWithRouter } from "@/hooks/useFormWithRouter";
import { Path, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { onUpdate } from "../handlers/onUpdate";
import InputBasic from "./InputBasic";

type FormDefaultValues<T> = DefaultValues<T>;

type FormConfig<T extends z.ZodObject<any>> = {
  formSchema: T;
  defaultValues: FormDefaultValues<z.infer<T>>;
};

type FormBasicProps<T extends z.ZodObject<any>> = {
  config: FormConfig<T>;
  fnPost: Function;
  fnOnSuccess: (id: number) => void;
  id: number;
  inputs: {
    name: Path<z.infer<T>>;
    title: string;
    placeHolder: string;
    type: string;
    options?: { value: number | string; name: string }[];
  }[];
};

export default function TableElementBasic<T extends z.ZodObject<any>>({
  config,
  fnPost,
  fnOnSuccess,
  id,
  inputs,
}: FormBasicProps<T>) {
  const { errors, setErrors, router, form } = useFormWithRouter(config);
  const [inputValues, setInputValues] = useState(config.defaultValues);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    onUpdate(event, id, fnPost, setErrors, fnOnSuccess, router);
  }

  function handleOnChange(name: keyof z.infer<T>, value: string) {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <TableRow>
      {inputs.map((input) => (
        <TableCell key={input.name} className="align-top">
          <InputBasic
            id={input.name}
            title={input.title}
            placeholder={input.placeHolder}
            type={input.type}
            form={form}
            errors={errors}
            value={inputValues[input.name]}
            options={input.options}
            onChangeHandle={(
              eventOrValue:
                | string
                | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              if (typeof eventOrValue === 'string') {
                handleOnChange(input.name, eventOrValue);
              } else {
                handleOnChange(input.name, eventOrValue.target?.value);
              }
            }}
          />
        </TableCell>
      ))}
      <TableCell>
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
      </TableCell>
    </TableRow>
  );
}
