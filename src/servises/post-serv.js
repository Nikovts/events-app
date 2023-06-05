const postServices ={
    load: function(id){
       return fetch(`https://app.ticketmaster.com/discovery/v2/events/?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&size=20&page=1&segmentName=Music`).then(res=>res.json())
    }
}
export default postServices;