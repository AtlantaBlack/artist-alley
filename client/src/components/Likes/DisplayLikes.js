import React from 'react';

function DisplayLikes(props) {
  return (
    <button type="button" onClick={props.handleIncrement}>
      {props.counter} likes
    </button>
  );
}

export default DisplayLikes;
