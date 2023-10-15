import React from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div style={{display:'flex',backgroundColor:'#3f51b5',padding:'0.5'}}>
                <h1 style={{marginTop:'1rem',marginLeft:'1rem',marginRight:'50vw',color:'white'}}>Movie Zone</h1>
                <Link to='/' style={{textDecoration:'none'}}><h3 style={{marginTop:'1.5rem',marginLeft:'1rem',right:'2rem',color:'white'}}>Home</h3></Link>
                <Link to='/favourites' style={{textDecoration:'none'}}> <h3 style={{marginLeft:'2rem',marginTop:'1.5rem',color:'white'}}>Favourites</h3></Link>
            </div>
        )
    }
}
