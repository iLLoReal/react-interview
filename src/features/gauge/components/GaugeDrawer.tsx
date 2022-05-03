import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const getPercentage = (likes: number, dislikes: number) => {
  return Math.floor(100 * likes / (likes + dislikes));
}

export interface GaugeDrawerProps {
  likes: number,
  dislikes: number,
  setLikes: (likes: number) => void,
  setDislikes: (disLikes: number) => void,
}

const GaugeDrawer = ({likes, dislikes, setLikes, setDislikes}: GaugeDrawerProps) => {
  const likeSx = {
    cursor: 'pointer',
    color: 'darkgreen',
    fontSize: '3.5vh'
  };
  const dislikeSx = {
    cursor: 'crosshair',
    color: 'darkred',
    fontSize: '3.5vh'
  };

  const [ratio, setRatio] = useState(getPercentage(likes, dislikes));
  const [likeToggle, setLikeToggle] = useState({ like: false, dislike: false });
  const [likeDislikeSx, setLikeDislikeSx] = useState({ likeSx: likeSx, dislikeSx: dislikeSx })

  const handleLike = () => {
    setLikeDislikeSx({
      likeSx: { ...likeDislikeSx.likeSx, color: likeDislikeSx.likeSx.color === 'darkgreen' ? 'lightgreen' : 'darkgreen'},
      dislikeSx: { ...likeDislikeSx.dislikeSx, color: 'darkred'}
    });
    setLikes((!likeToggle.like) ? likes + 1 : likes - 1);
    setDislikes((likeToggle.dislike) ? dislikes - 1 : dislikes);
    setLikeToggle({like: !likeToggle.like, dislike: false});
  }
  const handleDislike = () => {
    setLikeDislikeSx({
      likeSx: { ...likeDislikeSx.likeSx, color: 'darkgreen'},
      dislikeSx: { ...likeDislikeSx.dislikeSx, color: likeDislikeSx.dislikeSx.color === 'darkred' ? 'red' : 'darkred'}
    });
    setDislikes((!likeToggle.dislike) ? dislikes + 1 : dislikes - 1);
    setLikes((likeToggle.like) ? likes - 1 : likes);
    setLikeToggle({like: false, dislike: !likeToggle.dislike});
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