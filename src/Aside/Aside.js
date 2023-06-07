import React from "react";
import "./Aside.css";
import Links from "../share/Link/Link";

function Aside() {
  const data = ["Home", "Event", 'WishList'];
  const newList = (data) => {
    return data.map((el, ind) => {
      let url = `/${el.toLowerCase()}`;
      return (
        <Links url={url} key={ind + 11}>
          {el}
        </Links>
      );
    });
  };
  return (
    <aside className="Aside">
      <ul>{newList(data)}</ul>
    </aside>
  );
}

// class Aside extends React.Component{

//     render(){
//         const data=['home','Post','Register',"Login",'Profile','AllPosts'];
//         const newList=(data)=>{
//                    return data.map((el,ind)=>{let url=`/${el}`
//                    return <Links url={url} key={ind+11}>{el}</Links>})}
//                 return(
//                     <aside className="Aside">
//                         <ul>
//                            {newList(data)}
//                         </ul>

//                     </aside>
//                 )
//     }
// }
export default Aside;
