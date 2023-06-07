import React from 'react';
import './Footer.css'
import Link from '../share/Link/Link'
import logo from '../logo192.png'

function Footer() {


        const data=['Home','Event','WishList'];
        const newList=(data)=>{
                   return data.map((el,ind)=>{let url=`/${el.toLowerCase()}`
                   return <Link url={url} key={ind+'footer'}>{el}</Link>})}
                return(
                    <footer className="Footer">
                        <ul>
                            {/* <li className="listItem">
                            <img src={logo} alt="my logo"/>
                            </li> */}
                           {newList(data)}
                        </ul>

                    </footer>
                )

}
export default Footer;