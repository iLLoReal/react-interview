import {
  Button,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import GaugeDrawer from '../Gauge/GaugeDrawer';
import styles from './Movies.module.css';

const MovieComponent = (props: any) => {
  const { movie, onButtonClick } = props;
  const {
    title,
    category,
    likes,
    dislikes
  } = movie;

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }}
        className={styles.movie} title={title} />
      <CardContent sx={{fontSize: '2vh'}} >{category}</CardContent>
      <GaugeDrawer likes={likes} dislikes={dislikes} />
      <Button onClick={(e) => onButtonClick(movie, e)}>X</Button>
    </Card>
  )
};

export default MovieComponent;