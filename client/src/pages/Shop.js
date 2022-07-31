import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import FileBase64 from 'react-file-base64';
import { QUERY_USER_MERCH } from '../utils/queries';
import { ADD_MERCH, REMOVE_MERCH } from '../utils/mutations';
import Auth from '../utils/auth';

import Shop from '../components/Shop';

const Store = () => {
  // console.log('load');

  const { loading, data } = useQuery(QUERY_USER_MERCH, {
    variables: { username: Auth.getProfile().data.username }
  });

  // console.log(data);
  const merch = data?.merch.merch || [];
  // console.log(merch);

  // set the person logged in as the artist
  const loggedInArtist = Auth.getProfile().data.username;

  useEffect(() => {
    console.log('use effect');
    console.log('load');
  }, []);

  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: ''
  });

  const [addMerch] = useMutation(ADD_MERCH);
  const [removeMerch] = useMutation(REMOVE_MERCH);

  // convert the image into base64 and make it a string to send to the database
  const convert64 = async (value) => {
    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string
    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // set the image state
    setImage(image);
  };

  // handler for adding march to store
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await addMerch({
      variables: {
        name: formState.name,
        description: formState.description,
        price: formState.price,
        quantity: formState.quantity,
        image: image,
        createdBy: loggedInArtist // set the artist as the person logged in
      }
    });
    // console.log('this is the response', response);
  };

  // for getting details from the add merch form
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    // let parsedPrice;
    // let parsedQuantity;
    // console.log(name);

    // parsing price and quantity as numbers to be passed into the database
    if (name === 'price') {
      // console.log('this is the price');
      // console.log(value);
      let parsedPrice = Number(value);
      // console.log('int price', parsedPrice);

      // set state for price
      setPrice(parsedPrice);
    }
    if (name === 'quantity') {
      // console.log('this is the quantity');
      // console.log(value);
      let parsedQuantity = Number(value);
      // console.log('int quantity', parsedQuantity);

      //set state for quantity
      setQuantity(parsedQuantity);
    }
    setFormState({
      ...formState,
      [name]: value,
      price: price,
      quantity: quantity,
      image: image,
      createdBy: loggedInArtist // set the artist as the person logged in
    });
    // console.log('this is the', formState);
  };

  // const postContainerStyling = {
  //   flex: '0 0 45%',
  //   border: '1px solid blue',
  //   backgroundColor: 'var(--pale-pink)',
  //   margin: '10px 0'

  // delete event for deleting a post
  const handleDeleteClick = async (event) => {
    // get the merch ID out of the button
    const merchId = event.target.getAttribute('merchid');

    const deleteMerch = await removeMerch({
      variables: {
        merchId,
        createdBy: loggedInArtist
      }
    });
    console.log('deletedMerch: ', deleteMerch);
  };

  return (
    <div>
      <h1>My Artist Table</h1>
      <div className="add-post">
        <h2>Add your merch!</h2>
        <form>
          <div>
            <label htmlFor="name">Merch Name: </label>
            <input
              placeholder="name of merch"
              name="name"
              type="text"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder="description of merch"
              name="description"
              type="text"
              id="description"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <label htmlFor="img">Upload img:</label>

            <FileBase64
              name="file"
              type="file"
              accept="image/*"
              multiple={false}
              onDone={({ base64 }) => convert64({ base64 })}
            />
          </div>

          <div>
            <label htmlFor="price">Price: </label>
            <input
              placeholder="price of merch"
              name="price"
              type="text"
              id="price"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="title">Quantity in Stock: </label>
            <input
              placeholder="quantity of merch"
              name="quantity"
              type="text"
              id="quantity"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button type="submit" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="posts">
        <h2>Merch</h2>

        <div style={{ border: '1px solid orange' }}>
          {loading ? (
            <div> loading </div>
          ) : (
            merch.map((item) => (
              <div key={item._id} className="post-container">
                <Shop shopItems={item} />
                <button
                  type="button"
                  merchid={item._id}
                  onClick={handleDeleteClick}
                >
                  Delete Item
                </button>
                {/* <h3>{item.title}</h3>
                <p>{item.description}</p>
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={item.description}
                />
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p> */}
                {/* <Post postDetails={items} loggedInArtist={loggedInArtist} /> */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
