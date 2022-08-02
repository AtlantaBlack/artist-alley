import React, { useState } from 'react';
import DisplayLikes from './DisplayLikes';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';

const LikeCounter = () => {
  const [counter, setCounter] = useState(0);

  const [addLike] = useMutation(ADD_LIKE);

  const handleIncrement = async () => {
    setCounter(counter + 1);

    const response = await addLike({
      postId: '62e51524c8ae825ff503246d',
      likes: counter
    });
    console.log('click!' + counter + response);
  };

  return (
    <div className="likes">
      <DisplayLikes counter={counter} handleIncrement={handleIncrement} />
    </div>
  );
};

export default LikeCounter;
