import './index.css';
import { useParams } from 'react-router-dom';

const PostDetails = ({ postDetails }) => {
  const { postId } = useParams();
  console.log('postId: ', postId);

  // console.log(postDetails);

  // eslint-disable-next-line no-unused-vars
  const { _id, title, image, description, createdBy } = postDetails;

  return (
    <div className="post">
      <h4>{title}</h4>
      <img src={`data:image/png;base64,${image}`} alt={description} />
      <p>{description}</p>
      <p>created by: {createdBy}</p>
    </div>
  );
};

export default PostDetails;
