import React, {FC} from 'react';
import './App.css';
import {Users} from "./components/Users";
import {PostContainer} from "./components/PostContainer";


const App:FC = () => {
    return(
    <div className="main">
        <PostContainer/>
        <Users/>

    </div>
    )
}

export default App;
