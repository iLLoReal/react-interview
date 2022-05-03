import {
  FormControl,
  Input, 
  InputLabel,
} from '@mui/material';
import { InputChangeEventHandler } from '../../../app/types';

export interface PaginationProps {
  setter: InputChangeEventHandler
}

const Pagination = ({setter}: PaginationProps) => {

  return (
    <>
      <FormControl sx={{ marginLeft: '1vh' }}>
        <InputLabel id='pagination'>Number of items per page</InputLabel>
        <Input onChange={setter} />
      </FormControl>
    </>
  )
};

export default Pagination;