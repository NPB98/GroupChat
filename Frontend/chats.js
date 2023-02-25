//const jwt = require("jsonwebtoken");

const loggedUsers=document.getElementById('users');
const msgs=document.getElementById('data');
const groupMessages=document.getElementById('data1');
const groupNames=document.getElementById('groups');
const msg=document.getElementById('message');
//console.log(form);

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

const form=document.getElementById("submit");
form.onclick=function(e){
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

// window.addEventListener('DOMContentLoaded',async(e)=>{
//     e.preventDefault();
//     msgs.innerHTML = '';
//     const token = localStorage.getItem('token');
//     const decodedToken=parseJwt(token);
//     const name=decodedToken.name.split(' ');
//     let chatsFromDB = 0;
//     const localMessages = JSON.parse(localStorage.getItem('chat')) //console.log(localMessages);
//     if(localMessages === null){
//      chatsFromDB=await axios.get(`http://localhost:4000/getMessages?getFrom=${0}`,{ headers: {"Authorization": token}})
//      //console.log('Chatsfromdb',chatsFromDB.data.messages);
//      localStorage.setItem('chat',JSON.stringify(chatsFromDB.data.messages)  );
//     }
//     else{
//         while(localMessages.length>10){
//             localMessages.shift();
//         }
//         localStorage.setItem('chat',JSON.stringify(localMessages));
//         const getMessages = JSON.parse(localStorage.getItem('chat'));
//         let id = 0;
//         for(let i=0; i<getMessages.length; i++){
//            if(getMessages[i].id > id){
//             id = getMessages[i].id;
//            }
//         }
//         console.log(id);
//         id=id-1;
//          chatsFromDB = await axios.get(`http://localhost:4000/getMessages?getFrom=${id}`,{ headers: {"Authorization": token}});
//     }
//     if(localMessages !== null){
//         console.log('Length',localMessages.length)
//         for(let i=0; i<=localMessages.length-1  ; i++){
//            const child1 = document.createElement('p');
//             console.log(localMessages[i].message);
//             child1.appendChild(document.createTextNode(`${name[0]}:${localMessages[i].message}`));
//             if(i%2 === 0){
//                 child1.style.backgroundColor = '#f4f4f4';
//             }else{            
//                 child1.style.backgroundColor = '#ccc';
//             }
//             msgs.appendChild(child1);
//         }
//     }
//     console.log('chatsfromdb',chatsFromDB);
//     for(let i=0; i<chatsFromDB.data.messages.length; i++){
//         const child1 = document.createElement('p');
//         child1.appendChild(document.createTextNode(`${name[0]}:${chatsFromDB.data.messages[i].message}`));
//         if(i%2 === 0){
//             child1.style.backgroundColor = '#f4f4f4';
//         }else{
//             child1.style.backgroundColor = '#ccc';
//         }
//         msgs.appendChild(child1);
//     }
// })

window.addEventListener('DOMContentLoaded',async () => {
    try{
    msgs.innerHTML = '';
    const token=localStorage.getItem('token');
    const decodedToken=parseJwt(token);
    //const groupId='null'
    const messages=await axios.get(`http://localhost:4000/getMessages`,{headers:{'Authorization':token}})
    const files = await axios.get("http://localhost:4000/getFiles",{ headers: {"Authorization": token}});
    console.log('FILES',files);
    //.then((messages)=>{
        if(messages){
        const name=decodedToken.name.split(' ');
        //console.log(messages);
        let count=0;
        for(let i=0;i<messages.data.messages.length;i++){
            console.log(messages.data.messages[i].groupId);
            if(messages.data.messages[i].groupId===null){
                count++;
                const child1=document.createElement('p');
            child1.appendChild(document.createTextNode(`${name[0]}:${messages.data.messages[i].message}`));
            if(count%2 === 0){
                child1.style.backgroundColor = '#f4f4f4';
            }else{
                child1.style.backgroundColor = '#ccc';
            }
            msgs.appendChild(child1);
            }
            // const child1=document.createElement('p');
            // child1.appendChild(document.createTextNode(`${name[0]}:${messages.data.messages[i].message}`));
            // if(i%2 === 0){
            //     child1.style.backgroundColor = '#ccc';
            // }else{
            //     child1.style.backgroundColor = '#f4f4f4';
            // }
            // msgs.appendChild(child1);
        }
    }
    // for(let i=0;i<files.data.length;i++){
    //     console.log(files.data[i].groupId);
    //     if(messages.data.messages[i].groupId===null){
    //         count++;
    //         const child1=document.createElement('p');
    //     child1.appendChild(document.createTextNode(`${name[0]}:${messages.data.messages[i].message}`));
    //     if(count%2 === 0){
    //         child1.style.backgroundColor = '#f4f4f4';
    //     }else{
    //         child1.style.backgroundColor = '#ccc';
    //     }
    //     msgs.appendChild(child1);
    //     }
    console.log('Length',files.data.length);
    for(let i=0; i<files.data.length; i++){
        console.log('FILES',files.data[i].fileId);
        let fileNames=await axios.get(`http://localhost:4000/getFileNames?fileId=${files.data[i].fileId}`,{ headers: {"Authorization": token}});
        
        // for(let j=0;j<fileNames.data.length;j++){
        const anchor = document.createElement('A');
        const t = document.createTextNode(`${fileNames.data[0].files}`);
        anchor.setAttribute("href",fileNames.data[0].files);
        anchor.appendChild(t);
        anchor.style.backgroundColor = '#f4f4f4';
        msgs.appendChild(anchor);
        //}
    }
}
    catch(error){
        console.log(error);
    } 
})

window.addEventListener('DOMContentLoaded',async () => {
    try{
        const token = localStorage.getItem('token');
        const decodedToken=parseJwt(token);
        const groupName = await axios.get("http://localhost:4000/getGroups",{headers: {"Authorization": token}});
       console.log('Group names',groupName);
        for(let i=0; i<groupName.data.length; i++){        
            console.log(groupName.data[i].groupName,groupName.data[i].id);
            const button = document.createElement("button");           
            button.innerHTML = groupName.data[i].groupName;
            button.id = groupName.data[i].id;    
            button.addEventListener('click',()=>getAllMessages(groupName.data[i].id));          
            groupNames.appendChild(button);
            // const space=document.createElement('p');
            // groupNames.appendChild(space);
           }
    }
        catch(error){
            console.log(error);
        }
});

async function getAllMessages(groupId){
    //console.log(groupId);
    try{
        // while(groupMessages.hasChildNodes()){
        //     groupMessages.removeChild(groupMessages.firstChild);
        //   }        
    groupMessages.innerHTML ='';
    const token = localStorage.getItem('token');
    const decodedToken=parseJwt(token); 
    console.log(decodedToken);
    //decodedToken.name.split(' ');  
    const chats = await axios.get(`http://localhost:4000/getAllMessages?groupId=${groupId}`,{headers: {"Authorization": token}});
    const groupAllFiles = await axios.get(`http://localhost:4000/getAllFiles?groupId=${groupId}`,{headers: {"Authorization": token}});
    console.log('Chats',groupAllFiles);
       for(let i=0; i<chats.data.length; i++){       
        const child1 = document.createElement('p');
        const user=await axios.get(`http://localhost:4000/getUser?userId=${chats.data[i].userId}`);
        //console.log('ASDDSSSSSSSSSSS',user)
        const name=user.data.name;
        child1.appendChild(document.createTextNode(`${name}:${chats.data[i].message}`));
        if(i%2 === 0){
            child1.style.backgroundColor = '#ccc';
        }else{
            child1.style.backgroundColor = '#f4f4f4';
        }
        groupMessages.appendChild(child1);
    }
    for(let i=0; i<groupAllFiles.data.length; i++){
        const anchor = document.createElement('A');
        const t = document.createTextNode(`${groupAllFiles.data[i].files}`);
        anchor.setAttribute("href",groupAllFiles.data[i].files);
        anchor.appendChild(t);
        anchor.style.backgroundColor = '#f4f4f4';
        groupMessages.appendChild(anchor);
    }
    const user=await axios.get(`http://localhost:4000/checkIfUserExists?userId=${decodedToken.userId}`);
    console.log('USERS',user);
    for(let i=0;i<user.data.length;i++){
    if(user.data[i].groupId===groupId){
        //console.log('EXISTS');
    const inputMessage = document.getElementById("groupMessage");
    inputMessage.type="text";
    const button = document.getElementById("button");
    button.style.visibility  = "visible";
    const input1 = document.getElementById("groupFile");
    input1.type = "file";
    const button12 = document.getElementById("button12");
    button12.style.visibility = "visible";
    //console.log(inputMessage);
    const form = document.getElementById('addMessageToGroup');
    form.addEventListener('submit',async(e)=>{
            e.preventDefault();         
            const obj = {
                message:inputMessage.value
            }
          const response = await axios.post(`http://localhost:4000/addGroupChat?id=${groupId}`,obj, {headers: {"Authorization": token}})
          console.log(response);
        });
        const form3=document.getElementById('downloadFacilityGroup');
        const groupFile=document.getElementById('groupFile')
        form3.addEventListener("submit",async(e)=>{
            e.preventDefault();
            const groupfile = groupFile.value;
            const obj1 = {
                groupfile:groupfile
            }
        const response = await axios.post(`http://localhost:4000/uploadGroupFile?id=${groupId}`,obj1,{headers: {"Authorization": token}})
        });
    }
    // else{
    //      //const inputMessage = document.getElementById("groupMessage");
    //        // inputMessage.type="hidden";
    //     //const button = document.getElementById("button");
    //         button.style.visibility  = "hidden";
    //  }
}
}
 catch(error){
    console.log(error);
 }
};

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

document.getElementById('createGroup').onclick = function(){
    window.location.href = './groupCreation.html'
}

document.getElementById('joinGroup').onclick = function(){
    window.location.href = './groupJoining.html';
}

window.addEventListener("DOMContentLoaded",async()=>{  
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:4000/isAdmin",{headers: {"Authorization": token}});
        //console.log('response',response);
        const groups =[];
        for(let i=0; i<response.data.length; i++){
            groups.push(response.data[i].groupId);
        }
        localStorage.setItem('group',JSON.stringify(groups));
        if(response.data[0].isAdmin === 'true'){
            const button = document.getElementById("adminButton");
            button.style.visibility  = "visible";
            const form = document.getElementById('adminControl');
            form.addEventListener("submit",async(e)=>{
                e.preventDefault();               
                window.location.href = './admin.html';
            });
        }
    }
    catch(error){
        console.log(error);
    }
});

const form1 = document.getElementById('downloadFacilityPersonal');
const myfile=document.getElementById('myfile')
form1.addEventListener('submit',async(e)=>{
    const token = localStorage.getItem('token');
    e.preventDefault();
    //const file = document.getElementById('myfile').FILES[0].NAME;
    //console.log(file);
    const obj = {
        file:myfile.value
    }
    await axios.post("http://localhost:4000/uploadFile",obj,{headers: {"Authorization": token}});
});





 
    