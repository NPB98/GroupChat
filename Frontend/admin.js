const users=document.getElementById('users');

window.addEventListener("DOMContentLoaded",async()=>{   
    try{
        const token = localStorage.getItem('token');
        const decodedToken=parseJwt(token);
        const allUsers = await axios.get("http://localhost:4000/getUsers",{headers: {"Authorization": token}});
        //console.log(UserName);
        for(let i=0; i<allUsers.data.users.length; i++){
            const child1 = document.createElement('p');
            child1.appendChild(document.createTextNode(`Name:${allUsers.data.users[i].name} Id:${allUsers.data.users[i].id} Email:${allUsers.data.users[i].email}`));
            if(i%2 === 0){
                child1.style.backgroundColor = '#ccc';
            }else{
                child1.style.backgroundColor = '#f4f4f4';
            }    
            users.appendChild(child1);
        }
    }
    catch(error){
        console.log(error);
    }
});

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

btn1.onclick = async function(){ 
    const input = document.getElementById("join");
    input.type = "text";
    const btn1 = document.getElementById("button1");
    btn1.style.visibility = 'visible';
}
const form1=document.getElementById('joinUserByAdmin');
const join=document.getElementById('join');
form1.addEventListener('submit',async(e)=>{
    try{
        console.log(join.value);
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decodedToken=parseJwt(token); 
        console.log(decodedToken);
        const groups = JSON.parse(localStorage.getItem('group'));
        const obj = {
            groupId:groups[0],
            userId:join.value
        }
        await axios.post(`http://localhost:4000/addUser`,obj,{headers: {"Authorization": token}});
        window.location.href = "./chats.html";
    }
    catch(error){
        console.log(error);
    }
})

btn2.onclick = async function(){ 
    const input = document.getElementById("admin");
    input.type = "text";
    const btn2 = document.getElementById("button2");
    btn2.style.visibility = 'visible';
}
const form2=document.getElementById('makeAdminByAdmin');
form2.addEventListener('submit',async(e)=>{
    try{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const admin=document.getElementById('admin');
        const groups = JSON.parse(localStorage.getItem('group'));   
        const obj = {
            groupId:groups[0],
            userId:admin.value
        }       
        await axios.post(`http://localhost:4000/makeAdmin`,obj,{headers: {"Authorization": token}});    
    }
    catch(error){
        console.log(error);
    }
});

btn3.onclick = async function(){
    const input = document.getElementById("delete");
    input.type = "text";
    const btn3 = document.getElementById("button3");
    btn3.style.visibility = 'visible';
}
const form3=document.getElementById('deleteUserByAdmin');
form3.addEventListener('submit',async(e)=>{
    try{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const groups = JSON.parse(localStorage.getItem('group'));
        const deleteUser =document.getElementById('delete');
        const obj = {
            groupId:groups[0],
            userId:deleteUser.value
        }       
        await axios.post(`http://localhost:4000/deleteUser`,obj,{headers: {"Authorization": token}});
        window.location.href = 'chats.html';   
    }
    catch(error){
        console.log(error);
    }
});

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}