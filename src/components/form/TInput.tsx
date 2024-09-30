// eslint-disable-next-line prettier/prettier
"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function TInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  defaultValue,
  label,
  placeholder,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative w-full">
      <Input
        {...register(name)}
        defaultValue={defaultValue}
        isInvalid={!!errors[name]}
        label={label}
        placeholder={placeholder}
        required={required}
        size={size}
        type={type}
        variant={variant}
      />
      {errors[name] && (
        <p className="text-red-700 text-xs absolute -bottom-5">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
