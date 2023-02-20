var email=document.getElementById('email');
  var password=document.getElementById('password');
  document.addEventListener("submit",login);

 async function login(e){
    e.preventDefault();
      const loginDetails = {
          email:email.value,
          password:password.value
      }
      const response=await axios.post("http://localhost:4000/user/login",loginDetails)
      //.then((response)=>{
        //console.log(response);
        if(response.status===200){
          //console.log('Response',response);
          localStorage.setItem('token',response.data.token);
          alert(response.data.message);
          window.location.href="file:///E:/Little/GroupChat/Frontend/chats.html";
          }
      //.catch((err)=>{
        // else{
        //     alert(response.data.message);
        // document.body.innerHTML+=`<div class='container'style='color:red'>${response}</div>`;
        // }
  }