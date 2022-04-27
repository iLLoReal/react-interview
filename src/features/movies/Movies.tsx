import { Button, Card, CardContent, CardHeader } from '@mui/material';
import styles from './Movies.module.css';

const MovieComponent = (props: any) => {
  const { movie, onButtonClick } = props;
  const { title, category } = movie;

   return (
   <Card>
      <CardHeader title={category} />
       <CardContent>{title}</CardContent>
       <Button onClick={onButtonClick}>X</Button>
   </Card>
  )
};

export default MovieComponent;