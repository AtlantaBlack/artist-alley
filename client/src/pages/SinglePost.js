import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_POST } from '../utils/queries';
import PostDetails from '../components/PostDetails';

const SinglePost = () => {
  const { postId } = useParams();
  // console.log('postId: ', postId);

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });

  // if (data) {
  //   console.log('data: ', data);
  // }

  const post = data?.singlePost || {};
  // console.log('post: ', post);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PostDetails postDetails={post} />
    </>
  );
};

export default SinglePost;
