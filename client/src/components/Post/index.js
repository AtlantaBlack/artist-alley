import './index.css';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';

const Post = ({ postDetails }, { loggedInArtist }) => {
  const [removePost] = useMutation(REMOVE_POST);

  // console.log(postDetails);
  const { _id, title, image, description, createdBy } = postDetails;

  const handleDeleteClick = async (event) => {
    const postId = _id;

    const deletePost = await removePost({
      variables: {
        postId,
        createdBy: loggedInArtist
      }
    });
    console.log('deletedPost: ', deletePost);
  };

  return (
    <div className="post">
      <h4>{title}</h4>
      <img src={`data:image/png;base64,${image}`} alt={description} />
      <p>{description}</p>
      <p>created by: {createdBy}</p>
      <div>
        <button type="button" onClick={handleDeleteClick}>
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default Post;
