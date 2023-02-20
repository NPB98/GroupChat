const msg=document.getElementById('message');
const msgs=document.getElementById('data');
const loggedUsers=document.getElementById('users');
getUserName();
function getUserName(){
    axios.get("http://localhost:4000/getUsers")
    .then((users)=>{
        for(let i=0;i<users.data.users.length;i++){
            const child=document.createElement('p');
            child.appendChild(document.createTextNode(`${users.data.users[i].name} logged in`));
            //child1.appendChild(document.createTextNode(`${name[0]}:${messages.data.messages[i].message}`));
            if(i%2 === 0){
                child.style.backgroundColor = '#ccc';
            }else{
                child.style.backgroundColor = '#f4f4f4';
            }
            loggedUsers.appendChild(child);
        }
    })
    .catch((err)=>{
        console.log(err);
        })
}

document.addEventListener("submit",addMessage);

function addMessage(e){
    e.preventDefault();
    const message={
        message:msg.value
    }
    const token=localStorage.getItem('token');
    axios.post("http://localhost:4000/addMessages",message,{headers:{'Authorization':token}})
    .then((res)=>{
        let chatAddedToLocalStorage=JSON.parse(localStorage.getItem('chat'));
       // console.log(chatAddedToLocalStorage);
        if(chatAddedToLocalStorage=== null){
            chatAddedToLocalStorage=[res.data.message];
        }
        else{
            chatAddedToLocalStorage.push(res.data.message);
        }
        localStorage.setItem('chat',JSON.stringify(chatAddedToLocalStorage));
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

// setInterval(async() =>{
//     try{
//         msgs.innerHTML = '';
//     const token=localStorage.getItem('token');
//     const decodedToken=parseJwt(token);
//     const messages=await axios.get("http://localhost:4000/getMessages",{headers:{'Authorization':token}})
//     //.then((messages)=>{
//         if(messages){
//         const name=decodedToken.name.split(' ');
//         for(let i=0;i<messages.data.messages.length;i++){
//             const child1=document.createElement('p');
//             child1.appendChild(document.createTextNode(`${name[0]}:${messages.data.messages[i].message}`));
//             if(i%2 === 0){
//                 child1.style.backgroundColor = '#ccc';
//             }else{
//                 child1.style.backgroundColor = '#f4f4f4';
//             }
//             msgs.appendChild(child1);
//         }
//     }
// }
//     catch(error){
//         console.log(error);
//     } 
// }, 10000);

window.addEventListener('DOMContentLoaded',async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decodedToken=parseJwt(token);
    const name=decodedToken.name.split(' ');
    let chatsFromDB = 0;
    const localMessages = JSON.parse(localStorage.getItem('chat'));
    //console.log(localMessages);
    if(localMessages === null){
     chatsFromDB=await axios.get(`http://localhost:4000/getMessages?getFrom=${0}`,{ headers: {"Authorization": token}})
     //console.log('Chatsfromdb',chatsFromDB.data.messages);
     localStorage.setItem('chat',JSON.stringify(chatsFromDB.data.messages)  );
    }
    else{
        while(localMessages.length>10){
            localMessages.shift();
        }
        localStorage.setItem('chat',JSON.stringify(localMessages));
        const getMessages = JSON.parse(localStorage.getItem('chat'));
        let id = 0;
        for(let i=0; i<getMessages.length; i++){
           if(getMessages[i].id > id){
            id = getMessages[i].id;
           }
        }
        console.log(id);
        id=id-1;
         chatsFromDB = await axios.get(`http://localhost:4000/getMessages?getFrom=${id}`,{ headers: {"Authorization": token}});
    }
    if(localMessages !== null){
        console.log('Length',localMessages.length)
        for(let i=0; i<=localMessages.length-1  ; i++){
            const child1 = document.createElement('p');
            console.log(localMessages[i].message);
            child1.appendChild(document.createTextNode(`${name[0]}:${localMessages[i].message}`));
            if(i%2 === 0){
                child1.style.backgroundColor = '#f4f4f4';
            }else{
                
                child1.style.backgroundColor = '#ccc';
            }
            msgs.appendChild(child1);
        }
    }
    console.log('chatsfromdb',chatsFromDB);
    for(let i=0; i<chatsFromDB.data.messages.length; i++){
        const child1 = document.createElement('p');
        child1.appendChild(document.createTextNode(`${name[0]}:${chatsFromDB.data.messages[i].message}`));
        if(i%2 === 0){
            child1.style.backgroundColor = '#f4f4f4';
        }else{
            child1.style.backgroundColor = '#ccc';
        }
        msgs.appendChild(child1);
    }
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}



 
    