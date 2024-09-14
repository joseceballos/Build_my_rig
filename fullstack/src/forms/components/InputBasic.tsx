import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";

export default function InputBasic({
  id,
  title,
  placeholder,
  type,
  form,
  errors,
  defaultValue,
  value,
  options,
  onChangeHandle,
}: {
  id: string;
  title: string;
  placeholder: string;
  type: string;
  form: UseFormReturn<any, any, undefined>;
  errors: { [key: string]: string };
  defaultValue?: string | number;
  value?: string | number;
  options?: { value: number | string; name: string }[];
  onChangeHandle?: (value: string) => void;
}) {
  let content;

  function handleValueChange(value: string) {
    if (onChangeHandle !== undefined) {
      onChangeHandle(value);
      console.log(value);
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (onChangeHandle) onChangeHandle(e.target.value);
  }

  if (type === "select") {
    content = (
      <Select
        defaultValue={defaultValue?.toString()}
        value={value?.toString()}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>
            {options !== undefined &&
              options.map((option) => (
                <SelectItem key={option.name} value={option.value.toString()}>
                  {option.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  } else if (type === "textarea") {
    content = (
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        {...form.register(id)}
        onChange={handleChange}
      />
    );
  } else if (type === "hidden") {
    <input key={id} type="hidden" name={id} value={value} />;
  } else {
    content = (
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        {...form.register(id)}
        onChange={handleChange}
      />
    );
  }

  return (
    <div key={id}>
      <label htmlFor={id}>{title}</label>
      {content}
      {errors[id] && <p className="text-red-500">{errors[id]}</p>}
    </div>
  );
}
