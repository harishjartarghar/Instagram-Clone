import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import {LOGOUT} from '../../redux/actions/authActions';

class SignedIn extends Component {

 render(){
   console.log(this.props);
  return (
    <React.Fragment>
       <ul className="right">
           <li><NavLink   to="/"><i className="material-icons">collections</i></NavLink></li>
           <li><NavLink to="/newpost"><i className="material-icons">add_a_photo</i></NavLink></li>
           <li><NavLink  to="/profile" ><img style={{width:"40px",height:"40px",borderRadius:"40px",verticalAlign:"middle"}} src={this.props.auth.user.profile}/></NavLink></li>
           <li><NavLink to="/login"><i  onClick={()=>this.props.LOGOUT(this.props)}   className="material-icons">power_settings_new</i></NavLink></li>  
       </ul> 
       
    </React.Fragment>   
   )
 }
}

const mapDispatchToProps=(dispatch)=>{
    return {
      LOGOUT:(props)=>{dispatch(LOGOUT(props))}
    }
  }

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(SignedIn);