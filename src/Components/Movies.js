import React from 'react';
import axios from 'axios';
//import {data} from './Data.js';

export default class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      hover:'',
      parr:[1],
      currPage:1,
      movies:[],
    }
  }

  async componentDidMount() {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=hindi&api_key=177af293785f4af7c31525c40e6aeb86&page=${this.state.currPage}`);
    let data = res.data;
    this.setState({
      movies: [...data.results]
    })
  }
  
  changeMovies = async() => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=hindi&api_key=177af293785f4af7c31525c40e6aeb86&page=${this.state.currPage}`);
    let data = res.data;
    this.setState({
      movies:[...data.results]
    })
  }

  handleRight = () => {
    let tempArr = [];
    for(let i=1;i<=this.state.parr.length+1;i++){
      tempArr.push(i);
    }
    this.setState({
      parr:[...tempArr],
      currPage: this.state.currPage+1
    },this.changeMovies)
  }

  handleLeft = () => {
    if(this.state.currPage != 1){
      this.setState({
        currPage:this.state.currPage-1,
      },this.changeMovies)
    }
  }

  handleClick = (value) => {
    if(value != this.state.currPage){
      this.setState({
        currPage:value
      },this.changeMovies)
    }
    
  }

  render() {
    // const movie = data.results;
    return (
      <>
        {
           this.state.movies.length === 0 ?
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :
            <div>
            <h1 className='text-center'><strong>Trending</strong></h1>
            <div className='movies-list'>
             {
              this.state.movies.map((movieObj) => (
                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
              <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-image" alt={movieObj.title} />
                <h5 className="card-title movies-title">{movieObj.title}</h5>
                <div className='button-wrapper' style={{display:'flex',width:'100%',justifyContent:'center'}}>
                {
                  movieObj.id === this.state.hover && <a href='#' className='btn btn-primary movies-button'>Add to Favourites</a>
                }
                </div>
              </div>
              ))
             }
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                  {
                    this.state.parr.map((value) => (
                      <li className="page-item"><a className="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                    ))
                  }
                  <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
              </nav>
            </div>
            </div>
           
        }
      </>
    )
  }
}