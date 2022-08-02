import './index.css';

import LikeCounter from '../Likes';

const PostDetails = ({ postDetails }) => {
  // console.log(postDetails);

  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy } = postDetails;

  return (
    <div className="post">
      <div className="post-container">
        <h4>{title}</h4>
        <img src={`data:image/png;base64,${image}`} alt={description} />
        <p>{description}</p>
        <p>Created by: {createdBy}</p>
        <LikeCounter postId={_id} />
      </div>
    </div>
  );
};

export default PostDetails;
