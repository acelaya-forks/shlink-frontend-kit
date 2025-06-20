import clsx from 'clsx';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef , useCallback, useId, useImperativeHandle , useMemo , useRef,useState  } from 'react';
import { Listbox } from '../content';
import type { SearchInputProps } from './SearchInput';
import { SearchInput } from './SearchInput';

type BaseInputProps = Omit<
  SearchInputProps,
  'role' | 'aria-autocomplete' | 'aria-expanded' | 'aria-controls' | 'aria-activedescendant' | 'onChange' | 'autoComplete' | 'autoCorrect'
>;

export type SearchComboboxProps<Item> = BaseInputProps & {
  /** If defined, it will display a listbox with the search results */
  searchResults?: Map<string, Item>;
  /** Invoked when the search input value changes */
  onSearch: (searchTerm: string) => void;
  /** Invoked when the active search result is selected */
  onSelectSearchResult: (item: Item) => void;
  /** To customize the look and feel of a search result */
  renderSearchResult: (item: Item) => ReactNode;

  /**
   * Determines how the listbox should span when visible.
   * - `full`: Be always as big as the input, regardless its content.
   * - `auto`: Take only the needed space to display its content, up to the width of the input.
   *
   * Defaults to `full`.
   */
  listboxSpan?: 'full' | 'auto';

  /** Classes to add to the wrapping container */
  containerClassName?: string;
  /** Classes to add to the listbox */
  listboxClassName?: string;
};

/**
 * This component combines a SearchInput with a Listbox, to behave close to an editable combobox with autocomplete, as
 * described in https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/.
 * The main difference is that the input is used only to search in the listbox, and once an item is selected, the input
 * is cleared and the listbox is closed.
 */
function SearchComboboxInner<Item>({
  searchResults,
  onSearch,
  onSelectSearchResult,
  renderSearchResult,
  size = 'md', // SearchInput defaults its size to 'lg'. Change it to 'md'
  listboxSpan = 'full',
  onFocus,
  containerClassName,
  listboxClassName,
  ...rest
}: SearchComboboxProps<Item>, ref: ForwardedRef<HTMLInputElement>) {
  const listboxId = useId();
  const [activeKey, setActiveKey] = useState<string>();

  const searchInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => searchInputRef.current!);

  // The active key is undefined while the listbox is closed. While open, we use the explicitly set activeKey, or the
  // first key of the search results.
  const currentlyActiveKey = useMemo(
    () => !searchResults ? undefined : (activeKey ?? [...searchResults.keys()][0]),
    [activeKey, searchResults],
  );

  const applySearchResult = useCallback((item: Item) => {
    onSelectSearchResult(item);
    onSearch('');
    searchInputRef.current!.value = '';
  }, [onSearch, onSelectSearchResult, searchInputRef]);

  return (
    <div
      className={clsx('relative', containerClassName)}
      onBlur={(e) => {
        // Clears search when focus is moving away of this container, so that the listbox is closed.
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onSearch('');
        }
      }}
    >
      <SearchInput
        onChange={onSearch}
        size={size}
        ref={searchInputRef}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={!!searchResults}
        aria-controls={listboxId}
        aria-activedescendant={currentlyActiveKey ? `${listboxId}_${currentlyActiveKey}` : undefined}
        autoComplete="off"
        autoCorrect="off"
        onFocus={(e) => {
          onFocus?.(e);
          // "Recover" search when focus is set, so that the listbox is open for current value
          onSearch(e.target.value);
        }}
        {...rest}
      />
      {searchResults && (
        <Listbox
          id={listboxId}
          items={searchResults}
          anchor={searchInputRef}
          onSelectItem={applySearchResult}
          onActiveItemChange={setActiveKey}
          renderItem={renderSearchResult}
          className={clsx(
            'absolute top-full mt-1 z-10',
            {
              'min-w-60': listboxSpan === 'auto',
              'w-full': listboxSpan === 'full',
            },
            listboxClassName,
          )}
          aria-label="Matching items"
          noItemsMessage="No results found matching search"
        />
      )}
    </div>
  );
}

export const SearchCombobox = forwardRef(SearchComboboxInner) as <T>(
  props: SearchComboboxProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof SearchComboboxInner>;
