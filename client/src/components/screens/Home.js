import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class Home extends Component {
    
    render() {
        
     const {auth}=this.props;
     if(!auth.token) return <Redirect to="/login"/>
        return (
            <div className="home">
                <div className="card home-card">
                    <h5>harish</h5>
                    <div className="card-image">
                        <img src="https://avatars2.githubusercontent.com/u/51698550?s=460&u=b2a9911e8c6e6dc7f76328e3a3495a60a043b869&v=4"/>

                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        <i className="material-icons">favorite_border</i>
                        <h6>title</h6>
                        <p>this is amazing post</p>
                        <input type="text" placeholder="add a comment"/>
                    </div>
                </div>
                <div className="card home-card">
                    <h5>harish</h5>
                    <div className="card-image">
                        <img src="https://avatars2.githubusercontent.com/u/51698550?s=460&u=b2a9911e8c6e6dc7f76328e3a3495a60a043b869&v=4"/>

                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        <i className="material-icons">favorite_border</i>
                        <h6>title</h6>
                        <p>this is amazing post</p>
                        <input type="text" placeholder="add a comment"/>
                    </div>
                </div>
                <div className="card home-card">
                    <h5>harish</h5>
                    <div className="card-image">
                        <img src="https://avatars2.githubusercontent.com/u/51698550?s=460&u=b2a9911e8c6e6dc7f76328e3a3495a60a043b869&v=4"/>

                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        <i className="material-icons">favorite_border</i>
                        <h6>title</h6>
                        <p>this is amazing post</p>
                        <input type="text" placeholder="add a comment"/>
                    </div>
                </div>
                <div className="card home-card">
                    <h5>harish</h5>
                    <div className="card-image">
                        <img src="https://instagramclone-harish.s3.ap-south-1.amazonaws.com/1594020605643"/>

                    </div>
                    <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <i className="material-icons">favorite_border</i>
                        <h6>title</h6>
                        <p>this is amazing post</p>
                        <input type="text" placeholder="add a comment"/>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}


export default connect(mapStatetoProps)(Home);
