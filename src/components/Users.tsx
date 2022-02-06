import React, {FC} from 'react';
import {IUser, useAddUserMutation, useDeleteUserMutation, useFetchUsersQuery} from "../servises/PostService";




export const Users: FC = () => {
   const {data:users,isLoading,isError,error}=useFetchUsersQuery()
    const [addUser]=useAddUserMutation()
    const [deleteUser]=useDeleteUserMutation()

   const handleAdd = async () => {
       const user=prompt() as string|null
       await addUser({name:user} as IUser)
    };

    console.log('User page')

    const handleDelete = async (user:IUser) => {
        await deleteUser(user)
    };

    return (
        <div style={{textAlign: 'center',margin:10}}>
            {isLoading && <h1>...Loading</h1>}
            {isError && <h1>{error}</h1>}
            <button onClick={handleAdd}>Add</button>
            {users?.map((user) =>
                <div  key={user.id} className="app">
                    {<p>id: {user.id}</p>}
                    {<h1>name: {user.name}</h1>}

                    <button onClick={()=>handleDelete(user)}>Delete</button>
                </div>)
            }

        </div>
    )
}

