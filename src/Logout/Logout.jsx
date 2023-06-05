import React from 'react';
import {post} from '../servises/requester';


export default function Logout (props){
     post('user','_logout',{},'Kinvey')
        .then(()=>{
            sessionStorage.clear();
            setTimeout(()=>{
                props.history.push('/')},
                2000)
        })
        .catch((err)=>console.log(err))
        return null
}