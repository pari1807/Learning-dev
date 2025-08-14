const UserStatus =(props)=>{

   if(props.loggedIn){
       return <h1>Welcome back!</h1>
   }
   else{
       return <h1>Please log in.</h1>
   }
   
   if(props.isAdmin){
       return <h2>You have admin privileges.</h2>
    }    
};

export default UserStatus;    