import './index.css';
import { Link } from 'react-router-dom';
import LikeCounter from '../Likes';

// this component is for the 'preview'/thumbnail/simplified version of an artist's post.

const Post = ({ postDetails }) => {
  // console.log(postDetails);
  const { _id, title, image, description, createdBy } = postDetails;

  return (
    <>
      <div className="post" postid={_id}>
        <h2 className="post-title">
          <Link to={`/posts/${_id}`} className="link-card">
            {title}
          </Link>
        </h2>

        <h3 className="post-artist">
          <Link to={`/artists/${createdBy}`} className="link-card">
            {createdBy}
          </Link>
        </h3>

        <Link to={`/posts/${_id}`} className="link-card">
          <img src={`data:image/png;base64,${image}`} alt={description} />
        </Link>
        <LikeCounter postId={_id} />
      </div>
    </>
  );
};

export default Post;
