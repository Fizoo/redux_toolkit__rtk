import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IPost} from "../models/IPost";


export  const postAPI=createApi({
    reducerPath:'postAPI',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes:['Post'],
    endpoints:(build)=>( {
        fetchAllPosts:build.query<IPost[],number>({
            query:(limit=5)=>({
                url:'/posts',
                params:{
                    _limit:limit
                }
            }),
            providesTags:result => ['Post']//ендпоїнт забезпечує доставку данних
        }),
        createPost:build.mutation<IPost,IPost>({
            query:(post)=>({
                url:'/posts',
                method: 'POST',
                body:post// дані, які будемо добавляти
            }),
            invalidatesTags:['Post']//при створенні нового поста,говоримо що дані не актуальні,й тому має обновити дані авто
        }),
        updatePost:build.mutation<IPost,IPost>({
            query:(post)=>({
                url:`/posts/${post.id}`,
                method: 'PUT',
                body:post// дані, які будемо update
            }),
            invalidatesTags:['Post']//при створенні нового поста,говоримо що дані не актуальні,й тому має обновити дані авто
        }),
        deletePost:build.mutation<IPost,IPost>({
            query:(post)=>({
                url:`/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Post']//при створенні нового поста,говоримо що дані не актуальні,й тому має обновити дані авто
        })

    })
})

//export const { useFetchAllPostsQuery } = postAPI