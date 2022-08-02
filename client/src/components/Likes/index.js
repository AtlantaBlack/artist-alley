import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';
import { QUERY_SINGLE_POST } from '../../utils/queries';

const LikeCounter = ({ postId }) => {
  // console.log('postId in Likes: ', postId);
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });
  // let totalLikes = 0;

  // if (data) {
  //   console.log(data);
  //   totalLikes = data.singlePost.likes;
  // }

  const totalLikes = data?.singlePost.likes || 0;

  // let totalLikes = data?.singlePost.likes;
  console.log('totalLikes: ', totalLikes);

  const [count, setCount] = useState(totalLikes);
  const [addLike] = useMutation(ADD_LIKE);

  const handleIncrement = async () => {
    setCount(count + 1);
    const diff = count - totalLikes;
    console.log(diff);

    console.log(`
    count: ${count}
    totalLikes: ${totalLikes}
    diff: ${diff}`);

    const response = await addLike({
      variables: {
        postId: postId,
        likes: diff
      }
    });
    console.log(`click!
    count: ${count}`);
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
          <button type="button" onClick={handleIncrement}>
            Like
          </button>
          <p>{totalLikes} Likes</p>
        </div>
      )}
    </div>
  );
};

export default LikeCounter;
