import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';

const LikeCounter = ({ postId }) => {
  console.log('postId in Likes: ', postId);

  const [counter, setCounter] = useState(0);

  const [addLike] = useMutation(ADD_LIKE);

  const handleIncrement = async (event) => {
    setCounter(counter + 1);

    const response = await addLike({
      variables: {
        postId: postId,
        likes: counter
      }
    });
    console.log(`click!
    counter: ${counter}`);
    console.log('response', response);
  };

  return (
    <div className="likes">
      <button type="button" onClick={handleIncrement}>
        Like
      </button>
      <div>
        <p>{counter} Likes</p>
      </div>
    </div>
  );
};

export default LikeCounter;
