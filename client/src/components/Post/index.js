import './index.css';

const Post = ({ postDetails }) => {
  console.log(postDetails);
  const { title, image, description, createdBy } = postDetails;

  return (
    <div className="post-container">
      <div className="post">
        <h4>{title}</h4>
        <img src={`data:image/png;base64,${image}`} alt={description} />
        <p>{description}</p>
        <p>created by: {createdBy}</p>
      </div>
    </div>
  );
};

export default Post;
