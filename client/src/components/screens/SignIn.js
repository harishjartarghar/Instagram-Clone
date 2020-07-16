import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../../redux/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state={
        userfield:'',
        password:'',
        passwordType:'password'
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value

        });
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.Login(this.state,this.props);
        
    }

    handleClick = () => {
        var type=this.state.passwordType==='password'?'text':'password';
        this.setState({
            passwordType:type
        });
    }

    render() {
        
        const {auth}=this.props;
        if(auth.token) return <Redirect to="/"/>
        return (
       <div>
            <div className="mycard">
                <div className="card-panel white auth-card" >
                    <div className="card-title">
                        Instagram
                    </div>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="card-body">
                            <div className="input-field col s12 border">
                                <input id="userfield" type="text"  style={{marginLeft:'10px'}} className="validate input" onChange={this.handleChange}/>
                                <label htmlFor="userfield">username, or email</label>
                            </div>
                            <div className="input-field col s12 border margin" style={{display:'flex'}}>
                                <input id="password" style={{marginLeft:'10px'}} type={this.state.passwordType} className="validate input" onChange={this.handleChange}/>
                                <label htmlFor="password">Password</label>
                                {this.state.passwordType!=='password'?<i style={{marginTop:"8px",cursor: 'pointer'}} className="material-icons"   onClick={this.handleClick}>lock_open</i>:<i style={{marginTop:"8px",cursor: 'pointer'}} onClick={this.handleClick} className="material-icons">lock_outline</i>}
                            </div>
                            <div className=" col s12">
                                <button className="button " type="submit" name="action">Log In
                                </button>
                            </div>
                            <br/>
                            <br/>
                            <hr/>
                            <br/>
                            <p><Link to="/">Forgot Password?</Link></p>
                            
                        </div>
                    </form>
                </div>
            </div>
            <div className="mycard">
                <div className="card-panel white auth-card" >
                    <div className="card-body">Don't have an account? <Link to="/signup" className="signup">Sign up</Link></div>
                </div>
            </div>
       </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        Login:(UserCredential,props)=>{dispatch(Login(UserCredential,props))},
    }
}

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(SignIn);
