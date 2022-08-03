import './index.css';
import { Link } from 'react-router-dom';
import LikeCounter from '../Likes';

const PostDetails = ({ postDetails }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy } = postDetails;

  return (
    <div className="post">
      <div className="post-container">
        <h3>{title}</h3>
        <p className="italicised">
          Created by <Link to={`/artists/${createdBy}`}>{createdBy}</Link>
        </p>
        <img src={`data:image/png;base64,${image}`} alt={title} />
        <p>{description}</p>
        <LikeCounter postId={_id} />
      </div>
    </div>
  );
};

export default PostDetails;
