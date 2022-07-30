import './index.css';

const Post = ({ postDetails }) => {
  console.log(postDetails);
  const { title, image, description } = postDetails;

  return (
    <div style={{ border: '1px solid purple' }}>
      this is a post
      {title}
    </div>
  );
};

export default Post;
