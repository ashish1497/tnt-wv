import { FC, InputHTMLAttributes } from 'react';

import Text from '../Text';

import { variant, VariantTypes } from '../common';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  variant: VariantTypes;
  cn?: string;
  errorMessage?: string;
}

const Input: FC<InputProps> = ({
  name,
  label,
  variant: varProps,
  cn,
  errorMessage,
  ...props
}) => {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-bold text-primary-300">
        {label}
      </label>
      <input
        id={name}
        className={`focus:shadow-outline box-border w-full appearance-none rounded py-2 px-3 shadow focus:outline-none ${
          variant[varProps]
        } ${cn} ${errorMessage ? 'border border-red-800' : null}`}
        {...props}
      />
      {errorMessage ? <Text variant="failure" text={errorMessage} /> : null}
    </div>
  );
};

export default Input;
