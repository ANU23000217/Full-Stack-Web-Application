import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/delete.css';

function Delete() {

  const [msg, setMsg] = useState('');
  const [statusTag, setStatusTag] = useState(false);
  
  function performDeleteOperation(event) {

    event.preventDefault();
    const idValue = document.querySelector('.id').value;
    axios.delete(`http://localhost:3500/api/deleteData/${idValue}`)
    .then(response => {
      if(response.data.message) {
        setStatusTag(true);
        setMsg(response.data.message);
        document.querySelector('.id').value = '';
      } else {
        alert(`Unexcepted status code : ${response.status}`);
      }
    })
    .catch(error => {
      if(error.response) {
        alert(`${error.response.data.message}`)
      } else if (error.message) {
        console.error('Error: No response received from server', error.request);
        alert('Error: No response received from server');
      } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    })

  }

  return (
    <React.Fragment>
      <form onSubmit={performDeleteOperation}>
        <h2>DELETE</h2>
          ID <input type="number" className='id' /> <br />
          <button type='submit'>Delete</button>
        </form>
        {(statusTag) ? <h2 className='response'>{msg}</h2> : <p></p>}
    </React.Fragment>
  );
}

export default Delete;
