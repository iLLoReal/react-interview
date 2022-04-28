import { FormControl, Input, InputLabel } from '@mui/material';

const MaxMoviesPerPageInput = (props: any) => {
  const { setter } = props;

  return (
    <>
      <FormControl sx={{marginLeft: '1vh'}}>
        <InputLabel id='max-movies-per-page-label'>Number of items per page</InputLabel>
        <Input onChange={setter} />
      </FormControl>
    </>
  )
};

export default MaxMoviesPerPageInput;