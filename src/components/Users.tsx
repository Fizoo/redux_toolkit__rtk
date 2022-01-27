import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUsers} from "../store/reducers/ActionCreators";

interface OwnProps {}



export const Users: FC = () => {
    const dispatch = useAppDispatch()
    const {users, error, isLoading} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    return (
        <div>
            {isLoading && <h1>...Loading</h1>}
            {error && <h1>{error}</h1>}
            {users.map((user) =>
                <div key={user.id} className="app">
                    {<h1>{user.name}</h1>}
                    {<h3>{user.email}</h3>}
                    {<h5>{user.id}</h5>}

                </div>)
            }

        </div>
    )
}

