import { Component } from "react";
import {data} from './Data';
export default class Favourites extends Component {
    constructor() {
        super();
        this.state= {
            genres:[],
            currGenre:'All Genres',
        }
    }

    render() {
        const movies = data.results;
        let genreids = {
            28: 'Action', 12: "Adventure", 26: "Wimation", 35: 'comedy', 88: 'Crime', 99: 'Documentary', 18: 'ora', 10751: 'Family', 14: 'Fantasy', 36: "History",
            27: 'Horror', 10402: "Music", 9648: 'Mystery', 10749: 'Romance', 876: 'Sci Fi', 10770: 'TV', 53: 'Thriller', 19752: "war", 37: "Western",16: 'Animation'
        }

        let temp = [];
        movies.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres");
        // this.setState({
        //     genres:[...temp]
        // })
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-3">
                                <ul className="list-group favourites-generes">
                                     {
                                        temp.map((genre) => (
                                            this.state.currGenre === genre ?
                                            <li className="list-group-item" style={{backgroundColor:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li>:
                                            <li className="list-group-item" style={{backgroundColor:'white',color:'#3f51b5',fontWeight:'bold'}}>{genre}</li>
                                        ))
                                     }
                                </ul>
                            </div>
                            <div className="col-9 favourites-table">
                                <div className="row">
                                    <input type="text" className="input-group-text col" />
                                    <input type="number" className="input-group-text col" />
                                </div>
                                <div className="row">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">Popularity</th>
                                                <th scope="col">Rating</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            movies.map((movieObj)=>(
                                                <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{height:'5rem',width:'5rem'}}/>{movieObj.title}</td>
                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button type="button" className="btn btn-danger">Delete</button></td>
                                            </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        {/* <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}