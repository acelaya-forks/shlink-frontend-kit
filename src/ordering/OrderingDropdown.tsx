import { faSortAmountDown as sortDescIcon, faSortAmountUp as sortAscIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import type { Order, OrderDir } from './ordering';
import { determineOrderDir } from './ordering';

export type OrderingDropdownProps<T extends string = string> = {
  items: Record<T, string>;
  order: Order<T>;
  onChange: (orderField?: T, orderDir?: OrderDir) => void;
  isButton?: boolean;
  right?: boolean;
  prefixed?: boolean;
};

export function OrderingDropdown<T extends string = string>(
  { items, order, onChange, isButton = true, right = false, prefixed = true }: OrderingDropdownProps<T>,
) {
  const handleItemClick = (fieldKey: T) => () => {
    const newOrderDir = determineOrderDir(fieldKey, order.field, order.dir);
    onChange(newOrderDir ? fieldKey : undefined, newOrderDir);
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        color={isButton ? 'primary' : 'link'}
        className={clsx({
          'dropdown-btn__toggle btn-block pe-4 overflow-hidden': isButton,
          'btn-sm p-0': !isButton,
        })}
      >
        {!isButton && <>Order by</>}
        {isButton && !order.field && <i>Order by...</i>}
        {isButton && order.field && <>{prefixed && 'Order by: '}{items[order.field]} - <small>{order.dir ?? 'DESC'}</small></>}
      </DropdownToggle>
      <DropdownMenu end={right} className="w-100" style={!isButton ? { minWidth: '11rem' } : undefined}>
        {Object.entries(items).map(([fieldKey, fieldValue]) => (
          <DropdownItem
            key={fieldKey}
            active={order.field === fieldKey}
            onClick={handleItemClick(fieldKey as T)}
            className="d-flex justify-content-between align-items-center"
          >
            {fieldValue as string}
            {order.field === fieldKey && <FontAwesomeIcon icon={order.dir === 'ASC' ? sortAscIcon : sortDescIcon} />}
          </DropdownItem>
        ))}
        <DropdownItem divider />
        <DropdownItem disabled={!order.field} onClick={() => onChange()}>
          <i>Clear selection</i>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
