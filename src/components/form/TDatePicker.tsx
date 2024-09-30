/* eslint-disable prettier/prettier */
import { DatePicker } from "@nextui-org/date-picker";
import React from "react";
import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";
interface IProps extends IInput {}
const TatePicker = ({ name, label, variant = "bordered" }: IProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field: { value, ...fields } }) => (
          <DatePicker
            label={label}
            {...fields}
            className=" min-w-full sm:min-w-[284px]"
            variant={variant}
          />
        )}
      />
    </div>
  );
};

export default FXDatePicker;