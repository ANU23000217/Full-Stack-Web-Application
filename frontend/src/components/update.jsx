import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/update.css';

function Update() {

  const [msg, setMsg] = useState('');
  const [statusTag, setStatusTag] = useState(false);

  function performUpdateOperation(event) {
    event.preventDefault();
    const newData = {
      "id" : `${document.querySelector('.id').value}`,
      "title" : `${document.querySelector('.title').value}`,
      "priority" : `${document.querySelector('.priority').value}`,
      "status" : `${document.querySelector('.status').value}`,
    };
    axios.put(`http://localhost:3500/api/updateData/`, newData)
    .then(response => {
      console.log(response.data);
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
      <form onSubmit={performUpdateOperation}>
          <h2>UPDATE/EDIT</h2>
            Id <input type="number" className='id' /> <br />
            Title <input type="text" className='title' /> <br />
            Priority <input type="text" className='priority' /> <br />
            Status <input type="text" className='status' /> <br />
            <button type='submit'>Update</button>
        </form>
        {(statusTag) ? <h2 className='update-response'>{msg}</h2> : <p></p>}
      </React.Fragment>
  );
}

export default Update;
