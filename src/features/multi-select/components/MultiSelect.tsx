import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export type SelectChangeEventHandler = (event: SelectChangeEvent<string>) => void

export interface MultiSelectProps {
  selected: string,
  onChange: SelectChangeEventHandler,
  items: string[],
  name: string,
}

const MultiSelect = ({
  selected,
  onChange,
  items,
  name
}: MultiSelectProps) => {

  return (
    <>
      {selected && items.includes(selected) &&
        <FormControl>
          <InputLabel id='select-movie-label'>Movie</InputLabel>
          <Select
            labelId='select-movie-label'
            id='select-movie'
            value={selected}
            onChange={onChange}
          >
            {items.map((item: string, id: number) =>
              <MenuItem
                key={`${name}/${item}/${id}`}
                value={item}>{item}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      }
    </>
  )
};

export default MultiSelect;