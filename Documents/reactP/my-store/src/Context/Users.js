import { Children, createContext ,usuState} from "react";

export const User=createContext({
users:[],
addUser:(user)=>{},
getUsers:()=>[],
})

export const usersPrivider=({Children})=>{
    const[users,setUser]=usuState([]);//arr of all the users
    const addUser=(userData)=>{
        setUser((prevUsers)=>[...prevUsers,userData]);
    }
    const getUsers=()=>{
        return users;
    }

    return(
        <users.Provider value={{

            users,
            addUser,
            getUsers,
        }}>
            {Children}
        </users.Provider>
    )
}