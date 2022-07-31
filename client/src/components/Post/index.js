import './index.css';

const Post = ({ postDetails }, { loggedInArtist }) => {
  // console.log(postDetails);
  const { _id, title, image, description, createdBy } = postDetails;

  // let isPostCreator = false;
  // if (loggedInArtist === createdBy) {
  //   isPostCreator = true;
  // }
  // console.log('logged in artist: ', loggedInArtist);
  // console.log('createdBy: ', createdBy);
  // console.log('isPostCreator: ', isPostCreator);

  return (
    <div className="post">
      <h4>{title}</h4>
      <img src={`data:image/png;base64,${image}`} alt={description} />
      <p>{description}</p>
      <p>created by: {createdBy}</p>
    </div>
  );
};

export default Post;
