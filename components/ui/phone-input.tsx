"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import { Input } from "./input";

interface PhoneInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (value: any) => void;
  error?: boolean;
}

const PhoneInputField = React.forwardRef<
  HTMLInputElement,
  PhoneInputFieldProps
>(({ className, error, value, ...props }, ref) => {
  return (
    <PhoneInput
      value={value.replace(/\s/g, '')}
      international
      inputComponent={Input}
      countryCallingCodeEditable={false}
      defaultCountry="GN"
      className={cn(
        "flex h-10 w-full rounded-md border-input bg-background py-2 ps-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-500",
        className
      )}
      {...props}
    />
  );
});

PhoneInputField.displayName = "PhoneInputField";

export { PhoneInputField };
