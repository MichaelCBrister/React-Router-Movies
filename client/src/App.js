import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList.js'
import Movie from './Movies/Movie.js'

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  return (
    <div>
        <SavedList list={saved}></SavedList>
        <Switch>
            <Route path='/movies/:id'>
                <Movie saved={saved} setSaved={setSaved}></Movie>
            </Route>
            <Route path='/'>
                <MovieList movies={movieList}></MovieList>
            </Route>
        </Switch>  
    </div>
  );
};

export default App;