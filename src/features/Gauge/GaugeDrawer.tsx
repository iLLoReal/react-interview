import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const getPercentage = (likes: number, dislikes: number) => {
  return Math.round(100 * likes / (likes + dislikes));
}

const GaugeDrawer = (props: any) => {
  const { likes, dislikes } = props;
  const [ratio, setRatio] = useState(getPercentage(likes, dislikes));

  useEffect(() => {
    setRatio(getPercentage(likes, dislikes));
  }, [likes, dislikes])

  return (
    <>
      <div style={{
        position: 'relative',
        width: '100%',
        background: 'red',
      }}>
        <div style={{
          position: 'relative',
          width: ratio + '%',
          background: 'green',
          height: '0.5vh',
        }}>
        </div>
      </div>
      <div>
        <ThumbUpIcon sx={{color: 'green', fontSize: '1.5vh'}}/> {likes} <ThumbDownIcon sx={{color: 'red', fontSize: '1.5vh'}}/> {dislikes}
      </div>
    </>
  )
};

export default GaugeDrawer;