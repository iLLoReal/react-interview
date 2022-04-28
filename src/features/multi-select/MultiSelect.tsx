import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const MultiSelect = (props: any) => {
  const { selected } = props;
  const { onChange } = props;
  const { items } = props;
  const { name } = props;

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