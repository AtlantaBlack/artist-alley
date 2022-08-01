import './index.css';

const ShopItems = ({ shopItems }) => {
  // console.log(postDetails);

  // eslint-disable-next-line no-unused-vars
  const { _id, name, image, description, price, quantity } = shopItems;

  return (
    <>
      <div className="merch">
        <h3 className="merch-artist">{name}</h3>
        <img src={`data:image/png;base64,${image}`} alt={description} />
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Quantity: {quantity}</p>
        {/* <Post postDetails={items} loggedInArtist={loggedInArtist} /> */}
      </div>
    </>
  );
};

export default ShopItems;
