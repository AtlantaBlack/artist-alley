import './index.css';

const Post = ({ postDetails }) => {
  console.log(postDetails);
  const { title, image, description, createdBy } = postDetails;

  return (
    <div className="post-container">
      <h4 className="post">post title: {title}</h4>
      <ul>
        <li>{image}</li>
        <li>{description}</li>
        <li>created by: {createdBy}</li>
      </ul>
    </div>
  );
};

export default Post;
