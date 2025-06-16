import clsx from 'clsx';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import type { Size } from '../types';

export type LinkButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'> & {
  size?: Size;
  type?: HTMLButtonElement['type'];
};

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>((
  { className, disabled, size = 'md', type = 'button', ...rest },
  ref,
) => (
  <button
    className={clsx(
      'inline-flex rounded-md focus-ring',
      'text-lm-brand dark:text-dm-brand',
      'highlight:text-lm-brand-dark dark:highlight:text-dm-brand-dark highlight:underline',
      {
        'px-1.5 py-1 text-sm': size === 'sm',
        'px-3 py-1.5': size === 'md',
        'px-4 py-2 text-lg': size === 'lg',
        'cursor-pointer': !disabled,
        'pointer-events-none opacity-65': disabled,
      },
      className,
    )}
    disabled={disabled}
    type={type}
    {...rest}
    ref={ref}
  />
));
