import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Typography,
} from '@mui/material';
import GaugeDrawer from '../../gauge/components/GaugeDrawer';
import styles from '../MovieComponent.module.css';

export type MovieElement = {
  id: string,
  title: string,
  category: string,
  likes: number,
  dislikes: number
}

export type MovieButtonHandler = (movie: MovieElement) => void;

export interface MovieProps {
  movie: MovieElement,
  onButtonClick: MovieButtonHandler
}

const Movie = ({movie, onButtonClick}: MovieProps) => {
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
      <Typography variant="body2" color="text.secondary">{category}</Typography>
      <GaugeDrawer likes={likes} dislikes={dislikes} />
      <CardActions>
        <Button size="small" onClick={() => onButtonClick(movie)}>Delete</Button>
      </CardActions>
    </Card>
  )
};

export default Movie;