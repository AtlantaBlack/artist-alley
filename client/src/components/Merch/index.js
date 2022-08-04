import './index.css';

const Merch = ({ merch }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, name, image, description, price, quantity } = merch;

  // rendering
  return (
    <>
      <div className="merch">
        <h3 className="merch-artist">{name}</h3>
        <img src={`data:image/png;base64,${image}`} alt={name} />
        <p>{description}</p>
        <p>
          Price: ${price}
          <br />
          In stock: {quantity}
        </p>
      </div>
    </>
  );
};

export default Merch;
