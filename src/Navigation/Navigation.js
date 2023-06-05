import React from 'react';
import './Navigation.css';
 import Links from '../share/Link/Link';
import logo from '../logo192.png';

// import {Link} from 'react-router-dom'

class Navigation extends React.Component{

    render(){
        const isLOgin=sessionStorage.getItem('authtoken')!==null

        let data;
        isLOgin?  data=['home','Event','Profile','AllEvents','Logout']:
         data=['home','Register',"Login",'AllEvents'];

        const newList=(data)=>{
                   return data.map((el,ind)=>{let url=`/${el}`
                   return <Links url={url} key={ind+1} className="listItem">{el}</Links>})}
                return(
                    <nav className="Navigation">
                        <ul >
                           <li className="listItem">
                            <img src={logo} alt="my logo"/>
                            </li>
                           {newList(data)}
                        </ul>

                    </nav>
                )
    }
}
// function Navigation (data) {
//    const newList=(data)=>{
//        return data.map(el=>{
//         return <Link el={el}></Link>})}
//     return(
//         <nav className="Navigation">
//             <ul>
//                {newList(data)}
//             </ul>

//         </nav>
//     )
// }
export default Navigation;