//const jwt= require("jsonwebtoken");
const msg=document.getElementById('message');

document.addEventListener("submit",addMessage);

function addMessage(e){
    e.preventDefault();
    const message={
        message:msg.value
    }
    const token=localStorage.getItem('token');
    console.log(token);
    axios.post("http://localhost:4000/addMessages",message,{headers:{'Authorization':token}})
    .then((res)=>{
        if(res.status===201){
            alert(res.data.message);
            console.log(res.config.data);
            //showMessagesOnScreen()
        }
    })
    .catch((err)=>{
        console.log(err);
        document.body.innerHTML+=`<div class='container'style='color:red'>${err}</div>`;
    })
}

// window.addEventListener("DOMContentLoaded",(e)=>{
//     const token=localStorage.getItem('token');
//     const decodedToken=parseJwt(token);
//    // console.log(decodedToken);
//     axios.get("http://localhost:4000/getMessages",{headers:{'Authorization':token}})
//     .then((messages)=>{
//         const name=decodedToken.name.split(' ');
//         //console.log(name[0]);
//         for(let i=0;i<messages.data.messages.length;i++){
//             const parentNode=document.getElementById('data')
//             const childNode=`${name[0]}: ${messages.data.messages[i].message}<br>`;
//             parentNode.innerHTML+=childNode;
//            // console.log(messages.data.messages[i].message);
//         }
//     })
//     .catch((error)=>{
//         console.log(error);
//     })

// })

setInterval(async() =>{
    try{
    const token=localStorage.getItem('token');
    const decodedToken=parseJwt(token);
    const messages=await axios.get("http://localhost:4000/getMessages",{headers:{'Authorization':token}})
    //.then((messages)=>{
        if(messages){
        const name=decodedToken.name.split(' ');
        //console.log(name[0]);
        const parentNode=document.getElementById('data');
        for(let i=0;i<messages.data.messages.length;i++){
            const childNode=`${name[0]}: ${messages.data.messages[i].message}<br>`;
            parentNode.innerHTML+=childNode;
            console.log(messages.data.messages[i].message);
        }
        parentNode.innerHTML+='<br><br>';
    }
}
    catch(error){
        console.log(error);
    } 
}, 1000)

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}



 
    