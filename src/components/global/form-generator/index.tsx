import { Input } from "@/components/ui/input";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  FieldErrors,
  FieldValue,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  inputTypes: "select" | "input" | "textarea";
  type?: "text" | "password" | "email" | "number ";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
};

const FormGenerator = ({
  inputTypes,
  errors,
  name,
  register,
  label,
  lines,
  options,
  placeholder,
  type,
}: Props) => {
  switch (inputTypes) {
    case "input": {
      return (
        <>
          <Label
            className="flex flex-col gap-2 text-[#9D9D9D]"
            htmlFor={`input-${label}`}
          >
            {label && label}

            <Input
              id={`input-${label}`}
              type={type}
              placeholder={placeholder}
              {...register(name)}
              className={"bg-transparent border-themeGray text-themeTextGray"}
            />
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? " " : message}
                </p>
              )}
            ></ErrorMessage>
          </Label>
        </>
      );
      break;
    }
    case "select": {
      return (
        <>
          <Label
            className="flex flex-col gap-2 text-[#9D9D9D]"
            htmlFor={`input-${label}`}
          >
            {label && label}
            <select
              id={`select-${label} `}
              className={`w-full bg-transparent border-[1px] p-3 rounded-lg `}
              {...register}
            >
              {options?.length &&
                options.map((item) => (
                  <option
                    value={item.value}
                    key={item.id}
                    className="dark:bg-muted"
                  >
                    {item.label}
                  </option>
                ))}
            </select>
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? " " : message}
                </p>
              )}
            ></ErrorMessage>
          </Label>
        </>
      );

      break;
    }
    case "textarea": {
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Textarea
            className="bg-transparent border-themeGray text-themeGray"
            id={`textarea-${label}`}
            placeholder={placeholder}
            rows={lines}
            {...register(name)}
          ></Textarea>
          ;
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? " " : message}
              </p>
            )}
          ></ErrorMessage>
        </Label>
      );
    }
  }
};

export default FormGenerator;
