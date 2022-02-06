import React, {FC} from 'react';
import {IPost} from "../models/IPost";


interface PostTypes {
    el:IPost;
    remove:(post:IPost)=>void;
    update:(post:IPost)=>void;
}

const PostItems: FC<PostTypes> = ({el,remove,update}) => {

    const handleRemove = (e:React.MouseEvent) => {
        e.stopPropagation()
        remove(el)

    };
    console.log('PostItem page')

    const handleUpdate = () => {
        const title=prompt()||''
        update({...el,title})
    };

    return (
      <div onClick={handleUpdate} className="post">
          <p>{el.id }. {el.title}</p>
          <button onClick={handleRemove}>Delete</button>
      </div>
  )

}

export default PostItems;
