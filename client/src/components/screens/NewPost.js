import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { NEWPOST } from '../../redux/actions/postActions';

class  NewPost extends Component {
    state={
        photo:'',
        location:'',
        caption:'',
    }

    onImageDrop=(files)=>{
        const formData = new FormData();
        formData.append('image',files[0]);
        M.toast({html:'Image is uploading',classes:"green"});
     axios.post('http://192.168.43.13:8080/api/post/image-upload',formData,{headers:{'content-type': 'multipart/form-data','auth-token':localStorage.getItem("jwt")}})
        .then(res=>{
        M.toast({html:'Image is uploaded',classes:"green"});
        this.setState({photo:res.data.imageUrl});
        
    })
    .catch(error=>{
        console.log(error.response);
        M.toast({html: error.response.data.message,classes:"red"});
    });
         
    
        
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value

        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.NewPost(this.state,this.props);
        
    }


    render(){
        const {auth}=this.props;
     if(!auth.token) return <Redirect to="/login"/>
    return (
        <div>
            <div className="mycard">
                <div className="card-panel white auth-card" >
                    <div className="card-title">
                        New Post
                    </div>
                    <div>
                        {this.state.photo === '' ? null :
                        <div>
                        <img src={this.state.photo} style={{maxWidth:"50%",maxHeight:"50%"}}/>
                        </div>}
                    </div>
                    <form  noValidate onSubmit={this.handleSubmit}>
                        <div className="card-body">
                        <div className="row">
                            <div className="column" style={{width:"30%",marginTop:"15px",fontSize:"18px"}}>
                                <span>Location:</span>
                            </div>
                            <div className="column" style={{width:"70%"}}>
                                <div className="input-field col s12 border">
                                    <input id="location" type="text"  placeholder="Enter Location... " style={{marginLeft:'10px'}} className="validate input" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column" style={{width:"30%",marginTop:"15px",fontSize:"18px"}}>
                                <span>Caption:</span>
                            </div>
                            <div className="column" style={{width:"70%"}}>
                                <div className="input-field col s12 border">
                                    <input id="caption"  type="text" placeholder="Enter Caption..."  style={{marginLeft:'10px'}} className="validate input" />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        {this.state.photo === '' ?
                        <Dropzone
                            onDrop={this.onImageDrop}
                            accept="image/*"
                            
                            multiple={false}>
                                {({getRootProps, getInputProps}) => {
                                return (
                                    <div style={{border:"1px dashed grey",width:"50%",height:"80px",margin:"auto"}}
                                    {...getRootProps()}
                                    >
                                    <input {...getInputProps()} />
                                    {
                                        <i  className="material-icons" style={{padding:"25px 0"}}>add_a_photo</i>
                                    }
                                    </div>
                                )
                            }}
                            </Dropzone>:null}
                            <br/>
                            <br/>
                            <br/>
                            
                            
                            <div className=" col s12">
                                <button className=" postButton"  type="submit" name="action">post
                                </button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
            
       </div>
    )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        NewPost:(newpost,props)=>{dispatch(NEWPOST(newpost,props))},
    }
}

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(NewPost);
