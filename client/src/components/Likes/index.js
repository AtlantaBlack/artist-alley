import React from 'react';

// import the userQuery, useMutation function and applicable mutations/queries
import { useQuery, useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';
import { QUERY_SINGLE_POST } from '../../utils/queries';

// import Auth util
import Auth from '../../utils/auth';

// import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const LikeCounter = ({ postId }) => {
  let sessionUser;
  // grab session user data and store it in a variable
  if (Auth.loggedIn()) {
    sessionUser = Auth.getProfile().data;
  }
  // query the current post(s) using the postIds to get post information
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });

  // set the total likes of each post to the length of their likes array OR set to 0
  let totalLikes = data?.singlePost.likes.length || 0;

  const [addLike] = useMutation(ADD_LIKE);

  // handler for button click
  const handleAddLike = async () => {
    // add like using postId and userId
    const response = await addLike({
      variables: {
        postId: postId,
        userId: sessionUser._id
      }
    });
    // console.log('response', response);
  };

  // rendering
  return (
    <div className="likes">
      {loading ? (
        <div> loading... </div>
      ) : (
        <div>
          <button id="likes" type="button" onClick={handleAddLike}>
            <FontAwesomeIcon icon={solid('heart-circle-plus')} /> {totalLikes}{' '}
            Likes
          </button>
        </div>
      )}
    </div>
  );
};

export default LikeCounter;
