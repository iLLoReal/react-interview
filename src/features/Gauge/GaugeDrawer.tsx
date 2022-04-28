import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const getPercentage = (likes: number, dislikes: number) => {
  return Math.round(100 * likes / (likes + dislikes));
}

const GaugeDrawer = (props: any) => {
  const { likes, dislikes } = props;
  const likeSx = {
    cursor: 'pointer',
    color: 'darkgreen',
    fontSize: '1.5vh'
  };
  const dislikeSx = {
    cursor: 'crosshair',
    color: 'darkred',
    fontSize: '1.5vh'
  };

  const [ratio, setRatio] = useState(getPercentage(likes, dislikes));
  const [likeToggle, setLikeToggle] = useState({ like: false, dislike: false });
  const [likeDislikeSx, setLikeDislikeSx] = useState({ likeSx: likeSx, dislikeSx: dislikeSx })

  


  const handleLike = (e: any) => {
    setLikeToggle({like: true, dislike: false});
    setLikeDislikeSx({
      likeSx: { ...likeDislikeSx.likeSx, color: 'green'},
      dislikeSx: { ...likeDislikeSx.dislikeSx, color: 'darkred'}
    });
  }
  const handleDislike = (e: any) => {
    setLikeToggle({like: false, dislike: true});
    setLikeDislikeSx({
      likeSx: { ...likeDislikeSx.likeSx, color: 'darkgreen'},
      dislikeSx: { ...likeDislikeSx.dislikeSx, color: 'red'}
    });
  }

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
        <ThumbUpIcon onClick={handleLike} sx={likeDislikeSx.likeSx} />
        {likes} <ThumbDownIcon onClick={handleDislike} sx={likeDislikeSx.dislikeSx}/> {dislikes}
      </div>
    </>
  )
};

export default GaugeDrawer;