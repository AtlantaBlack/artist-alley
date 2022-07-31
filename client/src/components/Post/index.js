import './index.css';

import { Link } from 'react-router-dom';

const Post = ({ postDetails }) => {
  // console.log(postDetails);

  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy } = postDetails;

  return (
    <>
      <Link to="/posts/:postId" className="link-card">
        <div className="post">
          <h3 className="post-title">
            {title}
            <br />
            <span className="post-artist">{createdBy}</span>
          </h3>
          <img src={`data:image/png;base64,${image}`} alt={description} />
        </div>
      </Link>
    </>
  );
};

export default Post;
