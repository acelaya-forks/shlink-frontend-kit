import type { FC, PropsWithChildren } from 'react';
import { useId } from 'react';
import { LabeledFormGroup } from './LabeledFormGroup';

export type InputFormGroupProps = PropsWithChildren<{
  value: string;
  onChange: (newValue: string) => void;
  type?: HTMLInputElement['type'];
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}>;

/** @deprecated */
export const InputFormGroup: FC<InputFormGroupProps> = (
  { children, value, onChange, type, required, placeholder, className, labelClassName },
) => {
  const id = useId();

  return (
    <LabeledFormGroup label={<>{children}:</>} className={className} labelClassName={labelClassName} id={id}>
      <input
        id={id}
        className="form-control"
        type={type ?? 'text'}
        value={value}
        required={required ?? true}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </LabeledFormGroup>
  );
};
