import React from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div style={{display:'flex',backgroundColor:'#3f51b5',padding:'0.5'}}>
                <Link to='/' style={{textDecoration:'none'}}><h1 style={{marginTop:'1rem',marginLeft:'1rem',color:'white'}}>Movies App</h1></Link>
                <Link to='/favourites' style={{textDecoration:'none'}}> <h2 style={{marginLeft:'2rem',marginTop:'1.5rem',color:'white'}}>Favourites</h2></Link>
            </div>
        )
    }
}
