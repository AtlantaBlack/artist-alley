import './index.css';

import { Link } from 'react-router-dom';

const Post = ({ postDetails }) => {
  // console.log(postDetails);

  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy } = postDetails;

  return (
    <>
      <div className="post">
        <h2 className="post-title">
          <Link to={`/posts/${_id}`} className="link-card">
            {title}
          </Link>
        </h2>

        <h3 className="post-artist">
          <Link to="/artists/someArtist" className="link-card">
            {createdBy}
          </Link>
        </h3>

        <Link to={`/posts/${_id}`} className="link-card">
          <img src={`data:image/png;base64,${image}`} alt={description} />
        </Link>
      </div>
    </>
  );
};

export default Post;
