import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/add.css'

function Add() {
  
  const [msg, setMsg] = useState('');
  const [statusTag, setStatusTag] = useState(false);

  function addnewData(event) {
    event.preventDefault();
    const newData = {
      "id" : `${document.querySelector('.id').value}`,
      "title" : `${[document.querySelector('.title').value]}`,
      "priority" : `${document.querySelector('.priority').value}`,
      "status" : `${document.querySelector('.status').value}`,
    };
    axios.post('http://localhost:3500/api/addNewData', newData)
    .then(response => {
      if(response.data.message) {
        setStatusTag(true);
        setMsg(response.data.message);
        document.querySelector('.id').value = '';
        document.querySelector('.title').value = '';
        document.querySelector('.priority').value = '';
        document.querySelector('.status').value = '';
      } else {
        alert(`Unexpected status code : ${response.status}`);
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
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={addnewData}>
        <h2>ADD</h2>
          Id <input type="number" className='id' /> <br />
          Title <input type="text" className='title' /> <br />
          Priority <input type="text" className='priority' /> <br />
          Status <input type="text" className='status' /> <br />
          <button type='submit'>Add</button>
        </form>
        {(statusTag) ? <h2 className='add-response'>{msg}</h2> : <p></p>}
    </React.Fragment>
  );
}

export default Add;
