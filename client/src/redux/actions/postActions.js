import axios from 'axios';
import M from 'materialize-css';


export const NEWPOST=(newpost,props)=>{
    return (dispatch,getState)=>{
        axios.post('http://192.168.43.13:8080/api/post/create',newpost,{headers:{'Content-Type': 'application/json','auth-token':localStorage.getItem("jwt")}})
            .then(res=>{
                M.toast({html:res.data.message,classes:"green"});
                props.history.push('/');
                dispatch({type:'NEWPOST_SUCCESS'});
                
            })
            .catch(error=>{
                M.toast({html:error.response.data.message,classes:"red"});
                dispatch({type:'NEWPOST_ERROR'});
            });
    }
}


export const UserPost=(username)=>{
    return (dispatch,getState)=>{
        axios.get('http://192.168.43.13:8080/api/user/'+username,{headers:{'Content-Type': 'application/json','auth-token':localStorage.getItem("jwt")}})
            .then(res=>{
                dispatch({type:'POST',payload:res.data});
            
            })
            .catch(error=>{
               console.log(error);
            });
    }
}
