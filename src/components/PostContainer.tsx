import React, {FC, useEffect, useState} from 'react';
import {postAPI} from "../servises/PostService";
import PostItems from "./PostItems";
import {IPost} from "../models/IPost";


export const PostContainer: FC = () => {
    const [limit, setLimit] = useState(100);
    const {data, error, isLoading,refetch} = postAPI.useFetchAllPostsQuery(limit,{
        pollingInterval:50000// интервал отправки запроса
    })
    const [createPosts,{error:createError,isLoading:isCreateLoading}]=postAPI.useCreatePostMutation()//1 парам ф-ія,2-об"єкт.в use можна  указувати селектор,фільтрувати й тд й получати дані
    const [updatePost,{}]=postAPI.useUpdatePostMutation()
    const [deletePost,{}]=postAPI.useDeletePostMutation()


    useEffect(() => {
        setTimeout(() => {
            setLimit(5)
        },20000)
    }, []);

    const handleCreatePost = async () => {
        const title:string|null=prompt()
        await  createPosts({title,body:title} as IPost)
    };

    const handleRemove = (post:IPost) => {
            deletePost(post)
    };

    const handleUpdate = (post:IPost) => {
        updatePost(post)
    };

    return (
        <div>
          {  /*  <button onClick={()=>refetch()} >Refetch</button>  //подгрузка  данних*/}
            <button onClick={handleCreatePost}>Add new post</button>
            {error && <h1>error</h1>}
            {isLoading && <h1>{isLoading}</h1>}
            {data && data.map(el => <PostItems key={el.id} remove={handleRemove} update={handleUpdate} el={el}/>)}
        </div>
    )
};


