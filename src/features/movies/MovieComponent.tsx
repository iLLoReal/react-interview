import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import styles from './Movies.module.css';

const MovieComponent = (props: any) => {
  const { movie, onButtonClick } = props;
  const { title, category } = movie;

   return (
   <Card>
      <CardHeader 
        titleTypographyProps={{fontWeight: 'bold', variant: 'h5'}}
        className={styles.movie} title={title}/>
       <CardContent> {category}</CardContent>
       <Button onClick={(e) => onButtonClick(movie, e)}>X</Button>
   </Card>
  )
};

export default MovieComponent;