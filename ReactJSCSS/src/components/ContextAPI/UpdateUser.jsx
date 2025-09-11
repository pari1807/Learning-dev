import {useContext, useState} from "react";
import { UserContext } from "./UserContext";

const UpdateUser = () => {
    const {updateUserName} = useContext(UserContext);
    const [name, setName] = useState("");

    const handleSubmit = (e)=> {
        e.preventDefault();

        if(name.trim()){
            updateUserName(name); 
            setName("");
        }
    }
    return (
        <div>
            <h2>Update User Name</h2>
            <form onSubmit = {handleSubmit}>
               <input type ="text" value = {name} onChange = {(e)=> setName(e.target.value)} placeholder = "Enter new name" />
               <button type = "submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;