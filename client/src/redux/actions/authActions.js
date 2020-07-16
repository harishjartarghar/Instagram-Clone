import axios from 'axios';
import M from 'materialize-css';


export const signUp=(NewUser,props)=>{
    return (dispatch,getState)=>{
        axios.post('http://192.168.43.13:8080/api/auth/signup',NewUser,{headers:{'Content-Type': 'application/json'}})
            .then(res=>{
                M.toast({html:res.data.message,classes:"green"});
                M.toast({html:'Login to see the images posted by your friends!',classes:"green"});
                props.history.push('/login');
                dispatch({type:'SIGNUP_SUCCESS',payload:res});
                
            })
            .catch(error=>{
                M.toast({html:error.response.data.message,classes:"red"});
                dispatch({type:'SIGNUP_ERROR',payload:error});
            });
    }
}


export const checkUsername=(username)=>{
   return (dispatch,getState)=>{
        axios.post('http://192.168.43.13:8080/api/auth/check',{username})
        .then((res=>{
            console.log(res);
            dispatch({type:'NO_USER_EXIST'});
        }))
        .catch(error=>{
        M.toast({html: error.response.data.message,classes:"red"})
        dispatch({type:'USER_EXIST'});
        });
   }
}

export const checkEmail=(email)=>{
   return (dispatch,getState)=>{
        axios.post('http://192.168.43.13:8080/api/auth/check',{email})
        .then((res=>{
            console.log(res);
            dispatch({type:'NO_USER_EXIST'});
        }))
        .catch(error=>{
        M.toast({html: error.response.data.message,classes:"red"});
        dispatch({type:'USER_EXIST'});
        });
   }
}

export const Login=(UserCredentials,props)=>{
    return (dispatch,getState)=>{
            axios.post('http://192.168.43.13:8080/api/auth/signin',UserCredentials,{headers:{'Content-Type': 'application/json'}})
            .then(res=>{
                
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
                M.toast({html: res.data.message,classes:"green"});
                props.history.push('/');
                dispatch({type:'LOGIN_SUCCESS',payload:res.data});
            })
            .catch(error=>{
                console.log(error);
                M.toast({html: error.response.data.message,classes:"red"});
                dispatch({type:'LOGIN_ERROR'});
            })
    }
}

export const LOGOUT=(props)=>{
    return (dispatch,getState)=>{
        localStorage.clear();
       window.location.href='/login'
        dispatch({type:'LOGGED_OUT'});

    }
}

export const UPDATE_PROFILE=(imageUrl)=>{
    return (dispatch,getState)=>{
        const user=JSON.parse(localStorage.getItem("user"));
        user.profile=imageUrl;
        localStorage.setItem("user",JSON.stringify(user)); 
    axios.post('http://192.168.43.13:8080/api/user/newprofile',{imageUrl},{headers:{'Content-Type': 'application/json','auth-token':localStorage.getItem("jwt")}})
        console.log("cjeck",user);
        dispatch({type:'PROFILE_UPDATE',payload:user});
    }
}

export const CHECK_AUTH=()=>{
    return (dispatch,getState)=>{
        if(localStorage.getItem("jwt"))
        {
            const data={token:localStorage.getItem("jwt"),user:JSON.parse(localStorage.getItem("user"))}
            dispatch({type:'LOGGED_IN',payload:data});
        }
        else{
            dispatch({type:'LOGGED_OUT'});
        }
    }
}


