import { clsx } from 'clsx';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import type { DropdownToggleProps } from 'reactstrap/types/lib/DropdownToggle';
import { useToggle } from '../hooks';
import './DropdownBtn.scss';

export type DropdownBtnProps = PropsWithChildren<Omit<DropdownToggleProps, 'caret' | 'size' | 'outline'> & {
  text: ReactNode;
  noCaret?: boolean;
  className?: string;
  dropdownClassName?: string;
  inline?: boolean;
  minWidth?: number;
  size?: 'sm' | 'md' | 'lg';
}>;

/** @deprecated */
export const DropdownBtn: FC<DropdownBtnProps> = ({
  text,
  disabled = false,
  className,
  children,
  dropdownClassName,
  noCaret,
  end = false,
  minWidth,
  inline,
  size,
  ...rest
}) => {
  const [isOpen, toggle] = useToggle();
  const toggleClasses = clsx('dropdown-btn__toggle', className, {
    'btn-block': !inline,
    'dropdown-btn__toggle--with-caret': !noCaret,
  });
  const menuStyle = { minWidth: minWidth && `${minWidth}px` };

  return (
    <Dropdown isOpen={isOpen} toggle={toggle} disabled={disabled} className={dropdownClassName}>
      <DropdownToggle size={size} caret={!noCaret} className={toggleClasses} color="primary" {...rest}>
        {text}
      </DropdownToggle>
      <DropdownMenu className="w-100" end={end} style={menuStyle}>{isOpen && children}</DropdownMenu>
    </Dropdown>
  );
};
