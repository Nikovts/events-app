import React from 'react';
import * as yup from 'yup'
import withForm from '../share/hoks/form';
import {post} from '../servises/requester';
import {saveAuthtoken} from '../servises/extraFunctions'
import './Login.css'

class Login extends React.Component {
    state={
        isLogin:false
    }
    usernameOnchangeHandler= this.props.changeHandlerFactory('username');
    passwordOnchangeHandler= this.props.changeHandlerFactory('password');
    submitLogin=(e)=>{
        this.props.runValidations()
        .then(formData=>{if(!formData){return;}
        const{username,password}=formData;        
        post('user','login',{username,password},'Basic')
        .then((userdata)=>{
                saveAuthtoken(userdata);
                this.setState({isLOgin:sessionStorage.getItem('authtoken')!==null})
                this.props.history.push('/')
                               
            })
        .catch((err)=>console.log(err))
        });

    }
    getFirstInputError=(name)=>{
        const errorState=this.props.getFormErrorState();
        return errorState&&errorState[name]&&errorState[name][0];
    }

   render(){
    const usernameError=this.getFirstInputError('username') ;
    const passwordError=this.getFirstInputError('password') ;
    return(
        <form className="Login">
            <h1>Login Page</h1>
           <div className="form-control">
               <label>UserName</label>
               <input type="text" onChange={this.usernameOnchangeHandler}/>
               {usernameError&&<div className="error">{usernameError}</div>}
           </div>
           <div className="form-control">
               <label>Password</label>
               <input type="password" onChange={this.passwordOnchangeHandler}/>
               {passwordError&&<div className="error">{passwordError}</div>}
           </div> 
           <div className="form-control">
               <button type="button" onClick={this.submitLogin} >Log in</button>
           </div>
        </form>
    )
   }
}
const initialState={
    username:'',
    password:''
}
const schema=yup.object({
    username:yup.string('Username should be a string')
    .required('Username is required')
    .min(4,'Username must be more than 4 chars'),

    password:yup.string('Password should be a string')
    .required('Password is required')
    .min(3,'Password must be more than 2 chars')
})

export default withForm(Login,initialState,schema)