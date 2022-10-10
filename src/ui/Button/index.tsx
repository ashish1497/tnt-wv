import { FC, ButtonHTMLAttributes } from 'react';

import { variant, VariantTypes } from '../common';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant: VariantTypes;
  cn?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  variant: varProps,
  cn,
  ...props
}) => {
  return (
    <button
      className={`${variant[varProps]} ${cn} my-2 inline-flex items-center justify-center rounded-md px-4 py-2 transition duration-200 ease-in focus:outline-none `}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
