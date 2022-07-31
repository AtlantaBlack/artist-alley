import './index.css';

const Shop = ({ shopItems }) => {
  // console.log(postDetails);

  // eslint-disable-next-line no-unused-vars
  const { _id, name, image, description, price, quantity } = shopItems;

  return (
    <div className="shop">
      <h4>{name}</h4>
      <img src={`data:image/png;base64,${image}`} alt={description} />
      <p>{description}</p>
      <p>{price}</p>
      <p>{quantity}</p>
    </div>
  );
};

export default Shop;
