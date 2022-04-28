import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import GaugeDrawer from '../gauge/GaugeDrawer';
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
      <Typography variant="body2" color="text.secondary">{category}</Typography>
      <GaugeDrawer likes={likes} dislikes={dislikes} />
      <CardActions>
        <Button size="small" onClick={(e) => onButtonClick(movie, e)}>Delete</Button>
      </CardActions>
    </Card>
  )
};

export default MovieComponent;