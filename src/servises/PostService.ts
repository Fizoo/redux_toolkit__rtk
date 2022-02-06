import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IPost} from "../models/IPost";

export interface IUser {
    id:number,
    name:string
}

export  const postAPI=createApi({
    reducerPath:'postAPI',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes:['Post','User'],
    endpoints:(build)=>( {
        fetchAllPosts:build.query<IPost[],number>({
            query:(limit=5)=>({
                url:'/posts',
                params:{
                    _limit:limit
                }
            }),
            providesTags:(result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Post' as const, id })),
                        { type: 'Post', id: 'LIST' },
                    ]
                    : [{ type: 'Post', id: 'LIST' }],//ендпоїнт забезпечує доставку данних
        }),
        fetchUsers:build.query<IUser[],void>({
            query:()=>'/users',
            providesTags:(result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'User' as const, id })),
                        { type: 'User', id: 'LIST' },
                    ]
                    : [{ type: 'User', id: 'LIST' }],
            //transformResponse:(response:IUser[])=>response.filter(el=>el.id===5) //трансформация данних(селектор)
        }),
        addUser:build.mutation<IUser[],IUser>({
            query:(user)=>({
                url:'/users',
                method:'POST',
                body:user
            }),
            invalidatesTags:[{type: 'User',id:'LIST'}]
        }),
        deleteUser:build.mutation<IUser[],IUser>({
            query:(user)=>({
                url:`/users/${user.id}`,
                method:'DELETE',
            }),
            invalidatesTags:(result,error,{id})=>[{type: 'User',id}]
        })
        ,
        createPost:build.mutation<IPost,IPost>({
            query:(post)=>({
                url:'/posts',
                method: 'POST',
                body:post// дані, які будемо добавляти
            }),
            invalidatesTags:[{type: 'Post',id:'LIST'}]//при створенні нового поста,говоримо що дані не актуальні,й тому має обновити дані авто
        }),
        updatePost:build.mutation<IPost,IPost>({
            query:(post)=>({
                url:`/posts/${post.id}`,
                method: 'PUT',
                body:post// дані, які будемо update
            }),
            invalidatesTags:(result,error,{id})=>[{type:'Post',id}]//при створенні нового поста,говоримо що дані не актуальні,й тому має обновити дані авто
        }),
        deletePost:build.mutation<IPost,IPost>({
            query:(post)=>({
                url:`/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags:(result, error, { id }) => [{ type: 'Post', id }]//при створенні нового поста,говоримо що дані не актуальні,й тому має обновити дані авто
        })

    })
})

export const { useFetchAllPostsQuery,useFetchUsersQuery,useAddUserMutation,useDeleteUserMutation } = postAPI