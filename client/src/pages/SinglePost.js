import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_POST } from '../utils/queries';
import PostDetails from '../components/PostDetails';

const SinglePost = () => {
  const { postId } = useParams();
  // query the post information
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });
  // grab the data if any
  const post = data?.singlePost || {};

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
