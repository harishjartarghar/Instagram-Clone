const initialState=null;
const authReducers=(state={initialState},actions)=>{
    switch(actions.type){
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return{
                ...state,
                user:actions.payload.user,
                token:actions.payload.token
            }
        case 'LOGGED_IN':
            return{
                ...state,
                user:actions.payload.user,
                token:actions.payload.token
            }

        case 'SIGNOUT':
            console.log('signout succesfull');
            return state;
        case 'LOGGED_OUT':
            return{
                ...state,
                user:null,
                token:null
            }   
        case "PROFILE_UPDATE":
            
            return {
                ...state,
                user:actions.payload
            }
        default:
            return state;
    }
}

export default authReducers;