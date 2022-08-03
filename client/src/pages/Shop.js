/* eslint-disable no-unused-vars */
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
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  // const [errorMsg, setErrorMessage] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: ''
  });

  const { loading, data } = useQuery(QUERY_USER_MERCH, {
    variables: { username: Auth.getProfile().data.username }
  });

  const merch = data?.merch.merch || [];

  // set the person logged in as the artist
  const loggedInArtist = Auth.getProfile().data.username;

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
    // https://stackoverflow.com/questions/25763533/how-to-identify-file-type-by-base64-encoded-string-of-a-image
    // console.log(Object.values(value));

    //image validation to ensure file types are jpg or png
    // const imageVal = JSON.stringify(Object.values(value));

    // console.log(imageVal);

    // if (imageVal.includes('["data:image/png')) {
    //   setErrorMessage('');
    // } else if (imageVal.startsWith('["data:image/jpeg')) {
    //   setErrorMessage('');
    // } else if (imageVal.startsWith('["data:image/jpg')) {
    //   setErrorMessage('');
    // } else {
    //   setErrorMessage('Invalid file type');
    // }

    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string
    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // set the image state
    setImage(image);
  };

  // handler for adding march to store
  const handleFormSubmit = async (event) => {
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
  };

  // delete event for deleting a post
  const handleDeleteClick = async (merchId) => {
    const deleteMerch = await removeMerch({
      variables: {
        merchId,
        createdBy: loggedInArtist
      },
      refetchQueries: [
        {
          query: QUERY_USER_MERCH,
          variables: { username: Auth.getProfile().data.username }
        }
      ]
    });
    console.log('deletedMerch: ', deleteMerch);
  };

  // file upload validation
  // https://stackoverflow.com/questions/69793785/react-file-validation
  // const fileUploadVal = (event) => {
  // set error message to true so it will conditionally display if an image is the incorrect format
  // setErrorMessage((errorMsg) => !errorMsg);
  // console.log('change!', event.target);
  // console.log(event.type);

  // obtain file type from the event object
  // const file = event.type;

  //cases for image file types and default if file upload does not match cases
  //   switch (file) {
  //     case 'image/jpeg':
  //       break;
  //     case 'image/jpg':
  //       break;
  //     case 'image/png':
  //       break;
  //     default:
  //       setErrorMessage('Invalid file type! Please upload an image.');
  //   }
  // };

  return (
    <div className="table-heading">
      <Link to="/dashboard">← Return to Dashboard</Link>
      <h1>My Artist's Table</h1>
      <div className="text-center">
        <button id="merch-button" onClick={showFormHandler}>
          Add Merch!
        </button>
      </div>

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
                <label htmlFor="img">
                  Upload image (.jpg or .jpeg. Max file size 5MB):
                </label>
                <FileBase64
                  name="file"
                  type="file"
                  accept=".jpg, .jpeg"
                  multiple={false}
                  onDone={({ base64 }) => convert64({ base64 })}
                />
                {/* {errorMsg && ( */}
                <p className="error-handle embolden"></p>
                {/* {errorMsg}</p> */}
                {/* )} */}
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
                <button
                  type="submit"
                  // disabled={errorMsg}
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="posts">
        <div style={{ border: '1px solid orange' }}>
          {loading ? (
            <div> loading </div>
          ) : (
            merch.map((item) => (
              <div key={item._id} className="merch-container">
                <Merch merch={item} />
                <button
                  className="float-right"
                  type="button"
                  merchid={item._id}
                  onClick={() => handleDeleteClick(item._id)}
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
