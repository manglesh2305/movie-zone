import React from 'react';
import {data} from './Data.js';
export default class Banner extends React.Component {
  constructor() {
    super();
  }
  render() {
    const movie = data.results;
    return (
      <>
        {
           movie == "" ?
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :
            <div className="card banner-card" >
              <img src={`https://image.tmdb.org/t/p/original${movie[0].backdrop_path}`} className="card-img-top banner-image" alt={movie[0].title} />
                <h1 className="card-title banner-title">{movie[0].title}</h1>
                <p className="card-text banner-text">{movie[0].overview}</p>
              </div>
        }
      </>
    )
  }
}