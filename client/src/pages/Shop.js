import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import FileBase64 from 'react-file-base64';
import { QUERY_USER_MERCH } from '../utils/queries';
import { ADD_MERCH, REMOVE_MERCH } from '../utils/mutations';
import Auth from '../utils/auth';

import Merch from '../components/Merch';

const Shop = () => {
  // console.log('load shop');
  const { loading, data } = useQuery(QUERY_USER_MERCH, {
    variables: { username: Auth.getProfile().data.username }
  });

  // console.log(data);
  const merch = data?.merch.merch || [];
  // console.log(merch);

  // set the person logged in as the artist
  const loggedInArtist = Auth.getProfile().data.username;

  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: ''
  });

  const [addMerch] = useMutation(ADD_MERCH);
  const [removeMerch] = useMutation(REMOVE_MERCH);

  // reveal 'make a post' on button click
  // https://stackoverflow.com/questions/71784034/react-how-to-add-a-button-click-handler-to-reveal-text
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = async () => {
    setShowForm((showForm) => !showForm);
  };

  // convert the image into base64 and make it a string to send to the database
  const convert64 = async (value) => {
    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string
    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // set the image state
    setImage(image);
  };

  // handler for adding march to store
  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // eslint-disable-next-line no-unused-vars
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
  };

  // for getting details from the add merch form
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    let parsedQuantity;

    // parsing price and quantity as numbers to be passed into the database
    if (name === 'price') {
      let parsedPrice = Number(value);
      setPrice(parsedPrice); // set state for price
    }
    if (name === 'quantity') {
      parsedQuantity = parseInt(value);
    }
    setFormState({
      ...formState,
      [name]: value,
      price: price,
      quantity: parsedQuantity,
      image: image,
      createdBy: loggedInArtist // set the artist as the person logged in
    });
    // console.log('this is the', formState);
  };

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
      <Link to="/dashboard">← Return to Dashboard</Link>
      <h1 className="table-heading">My Artist's Table</h1>
      <button onClick={showFormHandler}>Add Merch!</button>

      {showForm && (
        <div className="merch">
          <h2 className="text-center">Add merch to your table!</h2>
          <div className="merch-container">
            <form>
              <div>
                <label htmlFor="name">Merch name: </label>
                <input
                  placeholder="Name of merch"
                  name="name"
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  placeholder="Description of merch"
                  name="description"
                  type="text"
                  id="description"
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="img">Upload image (Max file size 5MB):</label>

                <FileBase64
                  name="file"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onDone={({ base64 }) => convert64({ base64 })}
                />
              </div>

              <div>
                <label htmlFor="price">Price: $</label>
                <input
                  placeholder="Price of merch"
                  name="price"
                  type="text"
                  id="price"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="title">Quantity in Stock: </label>
                <input
                  placeholder="Quantity of merch in stock"
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
        </div>
      )}

      <div className="posts">
        <h2>Merch</h2>

        <div style={{ border: '1px solid orange' }}>
          {loading ? (
            <div> loading </div>
          ) : (
            merch.map((item) => (
              <div key={item._id} className="merch-container">
                <Merch merch={item} />
                <button
                  type="button"
                  merchid={item._id}
                  onClick={handleDeleteClick}
                >
                  Delete Item
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
