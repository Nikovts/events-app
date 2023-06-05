import React from 'react';
import './Footer.css'
import Link from '../share/Link/Link'
import logo from '../logo192.png'
class Footer extends React.Component{

    render(){
        const data=['home','Event','Register',"Login",'Profile','AllEvents'];
        const newList=(data)=>{
                   return data.map((el,ind)=>{let url=`/${el}`
                   return <Link url={url} key={ind+'footer'}>{el}</Link>})}
                return(
                    <nav className="Footer">
                        <ul>
                            <li className="listItem">
                            <img src={logo} alt="my logo"/>
                            </li>
                           {newList(data)}
                        </ul>

                    </nav>
                )
    }
}
export default Footer;