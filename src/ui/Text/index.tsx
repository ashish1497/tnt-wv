import { FC, HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  variant: 'default' | 'failure' | 'success' | 'warning';
  cn?: string;
}

const css = {
  default: ' text-gray-700',
  failure: 'text-red-700',
  success: 'text-green-700',
  warning: 'text-yellow-900',
};

const Text: FC<TextProps> = ({ variant, text, cn, ...props }) => {
  return (
    <span className={`${css[variant || 'default']} ${cn}`} {...props}>
      {text}
    </span>
  );
};

export default Text;
