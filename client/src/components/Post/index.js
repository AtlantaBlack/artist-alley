import './index.css';
import { Link } from 'react-router-dom';
import LikeCounter from '../Likes';

// this component is for the 'preview'/thumbnail/simplified version of an artist's post.

const Post = ({ postDetails }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy, createdAt } = postDetails;

  //format the createdAt date from UNIX to date
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(
    createdAt
  );

  // rendering
  return (
    <div className="post" postid={_id}>
      <h2 className="post-title">
        <Link to={`/posts/${_id}`} className="link-card">
          {title}
        </Link>
      </h2>

      <h4 className="post-artist">
        <Link to={`/artists/${createdBy}`} className="link-card">
          {createdBy}
        </Link>
      </h4>

      <Link to={`/posts/${_id}`} className="link-card">
        <img src={`data:image/png;base64,${image}`} alt={title} />
      </Link>
      <LikeCounter postId={_id} />
      <p>Posted On: {formattedDate}</p>
    </div>
  );
};

export default Post;
