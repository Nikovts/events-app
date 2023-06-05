"use strict";
const userNameandPass = btoa("Nikolay:niko");
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events';
const appKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';
// const appSecret = 'ae9b67751678414b95c0b731fe8c5183';

// function createAuthorization(type) {
//     return type=== 'Basic'
//     ?  `Basic ${btoa(`${appKey}:${appSecret}`)}`
//     :  `Kinvey ${sessionStorage.getItem('authtoken')}`;
// }

function makeHeaders(httpMethod, data){
    const headers = {
        method: httpMethod,
        headers: {
            'Content-type' : 'application/json'
        }
    }
    if(httpMethod==='POST'||httpMethod==='PUT'){
        headers.body=JSON.stringify(data);
    }
    return headers
}

function handleError(e) {
    if (!e.ok) {
     throw new Error(e.statusText);
    }
    return e
}
// function logoutFromKinvey(x){
//     if (x.status===204) {
//       return x
//     }
//     return x.json();
// }

function baseFetch(query) {
    const url = `${baseUrl}/?apikey=${appKey}${query}`;

    return fetch(url)
    .then(handleError)
    .then((res)=>{
       if (res.status== 204){
           return res
       }
      return res.json()
    });

}
function serialize (obj){

    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[ k ])}`).join('&');
};

export function get(params) {
    // const headers=makeHeaders('GET');
    const query = params ? `&${serialize({
        ...params
      })}` : '';
    return baseFetch(query);
}

export function post(kinveyModule,endUrl,data,type) {
    const headers=makeHeaders(type,'POST',data);

    return baseFetch(kinveyModule,endUrl,headers);
}

export function put(kinveyModule,endUrl,data,type) {
    const headers=makeHeaders(type,'PUT', data);

    return baseFetch(kinveyModule,endUrl,headers);
}

export function del(kinveyModule,endUrl,type) {
    const headers=makeHeaders(type,'DELETE');

    return baseFetch(kinveyModule,endUrl,headers);
}