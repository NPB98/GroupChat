const groupNames = document.getElementById("groups");
const groupMessage = document.getElementById('groupMessage');
const groupName = document.getElementById('groupName');

const form=document.getElementById("addForm");
form.addEventListener('submit',addGroup);

async function addGroup(e){
    try{
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decodedToken=parseJwt(token);
    const obj={
        group:groupName.value
    }
    const groups=axios.post("http://localhost:4000/createGroup",obj,{headers: {"Authorization": token}});
    window.location.href='./chats.html';
}
catch(err){
    console.log(err);
}
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}