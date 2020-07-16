import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { UPDATE_PROFILE } from '../../redux/actions/authActions';
import { UserPost} from '../../redux/actions/postActions';

class Profile extends Component {
    state={
        mypost:null
    }

    handleClick=(e)=> {
        this.refs.fileUploader.click();
    }

    uploadImage=(e)=>{
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        M.toast({html:'profile pic is getting updated...',classes:"green"});
     axios.post('http://192.168.43.13:8080/api/post/image-upload',formData,{headers:{'content-type': 'multipart/form-data','auth-token':localStorage.getItem("jwt")}})
        .then(res=>{
           
            this.props.UpdateProfile(res.data.imageUrl);
            M.toast({html:'profile pic updated!',classes:"green"});
            
            
    })
    .catch(error=>{
        console.log(error);
       
    });
    }


componentDidMount= async ()=>{
    this.props.UserPost(this.props.match.params.username);
}

    render() {
       
     const {auth}=this.props;
     if(!auth.token) return <Redirect to="/login"/>
        return (
            <div style={{maxWidth:"500px",margin:"0px auto"}}>
            <div style={{
               margin:"18px 0px",
                
            }}>
 
          
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                marginBottom:"30px",
               width:"100%"
            }}>
                <div style={{marginTop:"20px",textAlign:"-webkit-center",width:"115px"}}>
                    <div className="row">
                        
                        <img className="image-profile"
                    src={this.props.auth.user.profile} alt="harish"
                    />
                   
                        
                        <div className="row" style={{marginTop:"5px"}}>
                        <button className="profile_button" onClick ={this.handleClick} name="action">change photo</button>
                        <input type="file" accept="image/*" id="file" onChange={this.uploadImage} ref="fileUploader" style={{display: "none"}}/>
                        </div>
                    </div>
                </div>
                <div style={{textAlign:"center",margin: "auto"}}>
                <span style={{fontSize:"25px"}}>{this.props.auth.user.username}</span>
                    <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginTop: "15px"}}>
                        <span className="fontsize">40 posts &nbsp;| &nbsp;</span>
                        <span className="fontsize">40 followers&nbsp;| &nbsp;</span>
                        <span className="fontsize">40 following</span>
                    </div>
 
                </div>
            </div>
             </div>    
             <div className="border-line">
             </div>  
                
            {this.props.mypost.mypost?<Products mypost={this.props.mypost.mypost}/>:<p>loading...</p>}
            
          
        </div>
        );
    }
}

const Products = ({mypost}) => {
    const rows = [...Array( Math.ceil(mypost.length / 3) )];
    const productRows = rows.map( (row, idx) => mypost.slice(idx * 3, idx * 3 + 3) );
    const content = productRows.map((row, idx) => (
        <div className="row" key={idx}>    
          { row.map( product => <div className="column"><img className="image-style" src={product.photo} /> </div>  )}
        </div> )
    );
    return (
        <div>
          {content}
        </div>
    );
}
  

const mapStatetoProps=(state)=>{
    return{
      auth:state.auth,
      post:state.post,
      user:state.user
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        UpdateProfile:(imageUrl)=>{dispatch(UPDATE_PROFILE(imageUrl))},
        UserPost:(username)=>{dispatch(UserPost(username))}
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Profile);
