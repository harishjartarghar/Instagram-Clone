const post=null;
const user=null
const postReducers=(state={post,user},actions)=>{
    switch(actions.type){  
        case 'POST':
            return{
                ...state,
                post:actions.payload.posts,
                user:actions.payload.user
            }
        default:
            return state;
    }
}

export default postReducers;