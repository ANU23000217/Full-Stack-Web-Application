import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/search.css';

function Search() {
  const [datas, setDatas] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3500/api/getAllData')
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => {
        console.error('Error fetching all data:', error);
        alert('Error fetching all data');
      });
  }, []);

  function getDataById(event) {
    event.preventDefault();
    const idValue = document.querySelector('.id').value;
    if(idValue)
    {
      axios.get(`http://localhost:3500/api/getDataByID/${idValue}`)
        .then(response => {
          setSearchResult(response.data);
        })
        .catch(error => {
          if (error.response) {
            alert(`${error.response.data.message}`);
          } else if (error.message) {
            console.error('Error: No response received from server', error.request);
            alert('Error: No response received from server');
          } else {
            console.error('Error:', error.message);
            alert(`Error: ${error.message}`);
          }
        });
      }
  }

  return (
    <React.Fragment>
      <form onSubmit={getDataById}>
        <h2 className='search-p'>SEARCH</h2>
        ID <input type="number" className='id' /> <br />
        <button type='submit'>Search</button>
      </form>
      <div className='datas'>
        {searchResult ? (
            <div className='data-details'>
              <h2>{searchResult.title}</h2>
              <p>ID: <span className='highlight'>{searchResult.id}</span></p>
              <p>Title: <span className='highlight'>{searchResult.title}</span></p>
              <p>Priority: <span className='highlight'>{searchResult.priority}</span></p>
              <p>Status: <span className='highlight'>{searchResult.status}</span></p>
              </div>
        ) : (
          datas.map((data, index) => (
            <div key={index} className='datas-card'>
              <div className='data-details'>
                <h2>{data.title}</h2>
                <p>ID : <span className='highlight'>{data.id}</span></p>
                <p>Title : <span className='highlight'>{data.title}</span></p>
                <p>Priority : <span className='highlight'>{data.priority}</span></p>
                <p>Status : <span className='highlight'>{data.status}</span></p>
              </div>
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
}

export default Search;
