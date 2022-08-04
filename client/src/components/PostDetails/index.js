import './index.css';
import { Link } from 'react-router-dom';
import LikeCounter from '../Likes';

// post details

const PostDetails = ({ postDetails }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy, createdAt } = postDetails;

  //format the createdAt date from UNIX to date
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: 'false'
  };
  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(
    createdAt
  );

  // rendering
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
        <p>
          <span className="text-subbier">{formattedDate}</span>
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
