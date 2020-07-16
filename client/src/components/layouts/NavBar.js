import React from 'react'
import { connect } from 'react-redux';
import SignedIn from './signedIn'
import { Link } from 'react-router-dom'
import { LOGGED_IN } from '../../redux/actions/authActions';

function NavBar(props) {
    return (
            <nav>
                <div className="nav-wrapper white container">
                    <Link to="/" className="brand-logo logo ">Instagram</Link>
                    {props.auth.token?<SignedIn onLoginClick={props.onLoginClick}/>:null}
                </div>
            </nav>
    )
}

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}



export default connect(mapStatetoProps)(NavBar);