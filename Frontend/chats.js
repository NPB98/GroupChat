const msg=document.getElementById('message');

document.addEventListener("submit",addMessage);

function addMessage(e){
    e.preventDefault();
    const message={
        message:msg.value
    }
    const token=localStorage.getItem('token');
    console.log(token);
    axios.post("http://localhost:4000/messages",message,{headers:{'Authorization':token}})
    .then((res)=>{
        console.log(res);
        if(res.status===201){
            alert(res.data.message);
        }
    })
    .catch((err)=>{
        console.log(err);
        document.body.innerHTML+=`<div class='container'style='color:red'>${err}</div>`;
    })
}





 
    