import { useState } from 'react';
import { Combobox, Flex, Image, InputBase, Loader, Text, useCombobox } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { fetchCoinsList } from '@/Redux/thunks/CryptoThunks';
import { useRouter } from 'next/navigation';

interface Iprops {
  SelectionHandler: (val: string) => void; // Specify the type of SelectionHandler
}

export function SearchableDropdown({ SelectionHandler }: Iprops) {
  const { coinList, loading, error } = useSelector((state: RootState) => state.coins);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch(''); // Reset search input on close
    },
    onDropdownOpen: () => {
      if (coinList.length === 0 && !loading) {
        dispatch(fetchCoinsList());
      }
      combobox.focusSearchInput(); // Focus the search input when dropdown opens
    },
  });

  const filteredOptions = coinList
    .filter((item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase().trim())
    )
    .map((item: any) => (
      <Combobox.Option value={item.id} key={item.id}>
        <Flex gap={10} align="center">
          <Image src={item.image} width={16} height={16} alt={item.name} />
          <Text fw={'lighter'}>{item.name}</Text>
        </Flex>
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val: string) => {
        setValue(val);
        SelectionHandler(val); // Call the SelectionHandler with the selected value
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Text>Select Coin</Text>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search coins"
        />
        <Combobox.Options
          style={{
            maxHeight: '250px', // Set the maximum height for the dropdown
            overflowY: 'auto', 
            borderRadius: '20px', // Enable vertical scrolling when content overflows
          }}
        >
          {loading ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : filteredOptions.length > 0 ? (
            filteredOptions
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
