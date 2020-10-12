import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Movie = (props) => {
    const { saved, setSaved } = props
  const [movie, setMovie] = useState();
  const { id } = useParams()
  useEffect(() => {
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  // eslint-disable-next-line
  },[]);
  
  // Uncomment this only when you have moved on to the stretch goals
    const saveMovie = evt => {
        if (!movie) return
        let newSaved = [...saved]
        newSaved.forEach((v,i) => {
            if (v.id === id){
                console.log(newSaved)
                newSaved.splice(i,1)
                console.log(newSaved)
                setSaved(newSaved)
                return
            }
        })
        newSaved.push(movie)
        setSaved(newSaved)
    }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <button className="save-button" onClick={saveMovie}>Save</button>
    </div>
  );
}

export default Movie;