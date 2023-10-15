import { Component } from "react";
import { data } from './Data';
export default class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGenre: 'All Genres',
            movies: [],
            currText: '',
            limit: 5,
            currPage:1,
        }
    }

    componentDidMount() {
        let genreids = {
            28: 'Action', 12: "Adventure", 26: "Wimation", 35: 'comedy', 88: 'Crime', 99: 'Documentary', 18: 'ora', 10751: 'Family', 14: 'Fantasy', 36: "History",
            27: 'Horror', 10402: "Music", 9648: 'Mystery', 10749: 'Romance', 876: 'Sci Fi', 10770: 'TV', 53: 'Thriller', 19752: "war", 37: "Western", 16: 'Animation'
        }
        let data = JSON.parse(localStorage.getItem('movies') || "[]");
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres");
        this.setState({
            genres: [...temp],
            movies: [...data],
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGenre: genre,
        })
    }

    sortPopularityDesc = () =>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAsc = () =>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingDesc = () =>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc = () =>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }

    handlePageChange = (page)=>{
        this.setState({
            currPage:page,
        })
    }

    handleDelete = (id) =>{
        let newArr = [];
        newArr = this.state.movies.filter((movie)=>{
            return movie.id !== id;
        })
        this.setState({
            movies:[...newArr],
        })
        localStorage.setItem("movies",JSON.stringify(newArr));
    }

    render() {
        let genreids = {
            28: 'Action', 12: "Adventure", 26: "Wimation", 35: 'comedy', 88: 'Crime', 99: 'Documentary', 18: 'ora', 10751: 'Family', 14: 'Fantasy', 36: "History",
            27: 'Horror', 10402: "Music", 9648: 'Mystery', 10749: 'Romance', 876: 'Sci Fi', 10770: 'TV', 53: 'Thriller', 19752: "war", 37: "Western", 16: 'Animation'
        }
        let filteredArr = [];
        if (this.state.currText === '') {
            filteredArr = this.state.movies;
        }
        else {
            filteredArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }
        // if(this.state.currGenre === "All Genres"){
        //     filteredArr = this.state.movies;
        // }
        if (this.state.currGenre !== "All Genres") {
            filteredArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] === this.state.currGenre);
        }

        let pages = Math.ceil(filteredArr.length/this.state.limit);
        let pagesArr = [];
        for(let i=1;i<=pages;i++){
            pagesArr.push(i);
        }
        let startIndex = (this.state.currPage-1)*(this.state.limit)
        let endIndex = startIndex + this.state.limit;
        filteredArr = filteredArr.slice(startIndex,endIndex);
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                                <ul className="list-group favourites-generes">
                                    {
                                        this.state.genres.map((genre) => (
                                            this.state.currGenre === genre ?
                                                <li className="list-group-item" style={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>{genre}</li> :
                                                <li className="list-group-item" style={{ backgroundColor: 'white', color: '#3f51b5', fontWeight: 'bold' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type="text" placeholder="Search" className="input-group-text col" value={this.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                    <input type="number" placeholder="Row-count" className="input-group-text col" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                                </div>
                                <div className="row">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col"><span class="material-icons" onClick={this.sortPopularityDesc}>arrow_drop_up</span>Popularity<span class="material-icons" onClick={this.sortPopularityAsc}>arrow_drop_down</span></th>
                                                <th scope="col"><span class="material-icons" onClick={this.sortRatingDesc}>arrow_drop_up</span>Rating<span class="material-icons" onClick={this.sortRatingAsc}>arrow_drop_down</span></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredArr.map((movieObj) => (
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ height: '5rem', width: '5rem' }} />{movieObj.title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" className="btn btn-danger"  onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {
                                            pagesArr.map((page)=>(
                                                <li className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                        {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
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