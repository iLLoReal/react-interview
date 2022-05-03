import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Chip,
  FormControl,
  TextField,
} from '@mui/material';
import { SyntheticEvent } from 'react';

export type SelectChangeEventHandler = (
  event: SyntheticEvent<Element, Event>,
  value: string[],
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<string> | undefined
) => void;

export interface MultiSelectProps {
  selected: string[],
  onChange: SelectChangeEventHandler,
  items: string[],
  label: string,
}

const MultiSelect = ({
  selected,
  onChange,
  items,
  label,
}: MultiSelectProps) => {

  return (
    <>
      {selected &&
        <FormControl>
          <Autocomplete
            multiple
            id="select-movie"
            value={selected}
            onChange={onChange}
            options={items}
            getOptionLabel={(option: string) => option}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  disabled={false}
                />
              ))
            }
            style={{maxWidth: 'min-content'}}
            renderInput={(params) => (
              <TextField {...params} label={label} placeholder="Favorites" />
            )}
          />
        </FormControl>
      }
    </>
  )
};

export default MultiSelect;