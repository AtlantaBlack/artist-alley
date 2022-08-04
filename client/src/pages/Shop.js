/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// import FileBase64 to convert uploaded images to base64 for the database
import FileBase64 from 'react-file-base64';

// import the queries and mutations
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER_MERCH } from '../utils/queries';
import { ADD_MERCH, REMOVE_MERCH } from '../utils/mutations';

// import Auth util
import Auth from '../utils/auth';

// import Merch component
import Merch from '../components/Merch';

const Shop = () => {
  // console.log('load shop');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

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

    //image validation to ensure file types are jpg or png - using Object.values as the value is returned as an Object and stringifying it includes the key name. Which we don't want.
    const imageVal = JSON.stringify(Object.values(value));

    // if/else to match data:image type and "conditionaly render" the error message.
    // used classList as useState was not playing nice with form submit
    const reveal = document.querySelector('.file-val-handle');

    if (imageVal.includes('["data:image/png')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/jpeg')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/jpg')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/gif')) {
      reveal.classList.add('hidden');
    } else {
      reveal.classList.remove('hidden');
    }

    //strip the data type from beginning of base64 string
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
  };

  // handler for empty field values that we want users to add a value to. Client-side validation
  const handleEmptyField = (event) => {
    let reveal = document.querySelector('.error-handle');

    if (event.target.value.length === 0) {
      reveal.classList.remove('hidden');
    } else {
      reveal.classList.add('hidden');
    }
  };

  // rendering
  return (
    <div className="dash-flex">
      <div className="dash-flex-child dash-bg text-center">
        <div className="table-heading">
          <h1>My Artist's Table</h1>
        </div>
        <button className="merch-button" onClick={showFormHandler}>
          Add Merch!
        </button>
        <Link to="/dashboard">
          <button type="button" className="merch-button">
            ← Back to Dashboard
          </button>
        </Link>
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
                    onBlur={handleEmptyField}
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
                    onBlur={handleEmptyField}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="img">
                    Upload image:{' '}
                    <span className="text-subbier">
                      (Max file size 5MB. File types: .jpg, .jpeg and .png)
                    </span>
                  </label>
                  <FileBase64
                    name="file"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple={false}
                    onDone={({ base64 }) => convert64({ base64 })}
                  />
                  <p className="file-val-handle embolden hidden">
                    Incorrect file type. Please upload a jpg, jpeg, png or gif
                    file.
                  </p>
                </div>
                <div>
                  <label htmlFor="price">
                    Price: <span className="text-subbier">$</span>
                  </label>
                  <input
                    placeholder="Price of merch"
                    name="price"
                    type="decimal"
                    inputMode="decimal"
                    id="price"
                    onChange={handleInputChange}
                    onBlur={handleEmptyField}
                  />
                </div>
                <div>
                  <label htmlFor="title">Quantity in stock:</label>
                  <input
                    placeholder="Quantity of merch in stock"
                    name="quantity"
                    type="number"
                    inputMode="numeric"
                    id="quantity"
                    onChange={handleInputChange}
                    onBlur={handleEmptyField}
                  />
                </div>
                <p className="error-handle embolden hidden">Field required.</p>
                <div>
                  <button type="submit" onClick={handleFormSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="dash-flex-child">
        <div style={{ border: '1px solid orange' }} className="flex-container">
          {loading ? (
            <div> loading </div>
          ) : (
            merch.map((item) => (
              <div key={item._id} className="flex-child merch-container">
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
