import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import Auth from '../../utils/auth';

const LikeCounter = ({ postId }) => {
  let sessionUser;

  if (Auth.loggedIn()) {
    sessionUser = Auth.getProfile().data;
  }

  // console.log('sessionUser in likes: ', sessionUser);

  // console.log('postId in Likes: ', postId);
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });

  // if (data) {
  //   console.log(data);
  //   totalLikes = data.singlePost.likes;
  // }

  let totalLikes = data?.singlePost.likes.length || 0;
  // let totalLikes = thisPost.likes.length;

  // console.log('thisPost: ', thisPost);
  console.log('totalLikes: ', totalLikes);

  // const [count, setCount] = useState(totalLikes);
  const [addLike] = useMutation(ADD_LIKE);

  const handleAddLike = async () => {
    console.log(`likes before click!
    count: ${totalLikes}`);

    // setCount(count + 1);
    // const diff = count - totalLikes;
    // console.log(diff);

    // console.log(`
    // count: ${count}
    // totalLikes: ${totalLikes}
    // diff: ${diff}`);

    const response = await addLike({
      variables: {
        postId: postId,
        userId: sessionUser._id
      }
    });
    console.log(`likes after click!
    count: ${totalLikes}`);
    console.log('response', response);
  };

  //     <div style={{ border: '1px solid orange' }}>
  //       {loading ? (
  //         <div> loading </div>
  //       ) : (
  //         posts.map((post) => (
  //           <div key={post._id} className="post-container">
  //             {<Post postDetails={post} />}
  //           </div>
  //         ))
  //       )}
  //     </div>;

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="likes">
      {loading ? (
        <div> loading... </div>
      ) : (
        <div>
          <button type="button" onClick={handleAddLike}>
            Like
          </button>
          <p>{totalLikes} Likes</p>
        </div>
      )}
    </div>
  );
};

export default LikeCounter;
