import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {signUp,checkEmail,checkUsername} from '../../redux/actions/authActions';
import { connect } from 'react-redux';


class SignUp extends Component {
    state={
        username:'',
        email:'',
        fullName:'',
        password:'',
        uerrors:'',
        eerrors:'',
        perrors:'',
        passwordType:'password'
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value

        });
        if(e.target.id==='username') this.props.checkUsername(e.target.value);
        if(e.target.id==='email') this.props.checkEmail(e.target.value);
        
    }
    
    Validation=(e)=>{
        var userRegex=/^[a-zA-Z0-9]+$/;
        var emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
        if(e.target.id==='username' && (e.target.value.length<3 || !userRegex.test(e.target.value)))
            this.setState({uerrors:"username must have atleast 3 characters"});
        
        if(e.target.id==='username' && (e.target.value.length>=3 && userRegex.test(e.target.value)))
            this.setState({uerrors:""});
        if(e.target.id==='email' && !emailRegex.test(e.target.value))
            this.setState({eerrors:"username must have atleast 3 characters"});
        
        if(e.target.id==='email' && emailRegex.test(e.target.value))
            this.setState({eerrors:""});
 
        if(e.target.id==='password' && !passwordRegex.test(e.target.value))
            this.setState({perrors:"username must have atleast 3 characters"});
        
        if(e.target.id==='password' && passwordRegex.test(e.target.value))
            this.setState({perrors:""});
    }

    handleClick = () => {
        var type=this.state.passwordType==='password'?'text':'password';
        this.setState({
            passwordType:type
        });
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.SignUp(this.state,this.props);   
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
                    <div className="card-body">
                    <div>
                    <p>Sign up to see photos and videos <br/>from your friends.</p>
                    </div>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="input-field col s12 border margin" style={{display:'flex'}}>
                                <input  id="username" style={{marginLeft:'10px'}} type="text" className="validate input"  onChange={(e)=>{this.handleChange(e);this.Validation(e)}} />
                                <label htmlFor="username">username</label>
                                {this.state.uerrors!==''?<i style={{marginTop:"8px",color:"red"}} className="material-icons">highlight_off</i>:null}
                        </div>
                        <div className="input-field col s12 border margin" style={{display:'flex'}}>
                            <input id="email" type="text" style={{marginLeft:'10px'}} className="validate input" onChange={(e)=>{this.handleChange(e);this.Validation(e)}}/>
                            <label htmlFor="email">Email</label>
                            {this.state.eerrors!==''?<i style={{marginTop:"8px",color:"red"}} className="material-icons">highlight_off</i>:null}
                        </div>
                        
                        
                        <div className="input-field col s12 border margin" >
                            <input id="fullName" type="text" style={{marginLeft:'10px'}} className="validate input"  onChange={this.handleChange}/>
                            <label htmlFor="fullName">Full Name</label>
                        </div>
                        
                        <div className="input-field col s12 border margin " style={{display:'flex'}}>
                            <input id="password" type={this.state.passwordType} style={{marginLeft:'10px'}} className="validate input" onChange={(e)=>{this.handleChange(e);this.Validation(e)}}/>
                            <label htmlFor="password">Password</label>
                            {this.state.perrors!==''?<i style={{marginTop:"8px",color:"red"}} className="material-icons">highlight_off</i>:null}
                            {this.state.passwordType!=='password'?<i style={{marginTop:"8px",cursor: 'pointer'}} className="material-icons"   onClick={this.handleClick}>lock_open</i>:<i style={{marginTop:"8px",cursor: 'pointer'}}  onClick={this.handleClick} className="material-icons">lock_outline</i>}
                        </div>
                        <div className=" col s12">
                            <button className="button " type="submit" name="action">Sign Up
                            </button>
                        </div>
                    </form>
                        <br/>
                        <br/>
                        <hr/>
                        <br/>
                        <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                        
                    </div>
                </div>
            </div>
            <div className="mycard">
                <div className="card-panel white auth-card" >
                    <div className="card-body">Have an account? <Link to="/login" className="signup">Log In</Link></div>
                </div>
            </div>
            
       </div>
        )
    }
}



const mapDispatchToProps=(dispatch)=>{
return{
    SignUp:(NewUser,props)=>{dispatch(signUp(NewUser,props))},
    checkUsername:(username)=>{dispatch(checkUsername(username))},
    checkEmail:(email)=>{dispatch(checkEmail(email))},
}
}

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(SignUp);
