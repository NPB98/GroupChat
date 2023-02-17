var email=document.getElementById('email');
  var password=document.getElementById('password');
  document.addEventListener("submit",login);

  function login(e){
    e.preventDefault();
      const loginDetails = {
          email:email.value,
          password:password.value
      }
      axios.post("http://localhost:4000/user/login",loginDetails)
      .then((response)=>{
        if(response.status===200){
          //console.log(response.data);
          alert(response.data.message);
          }
      })
      .catch((err)=>{
        alert('Something Went Wrong');
        document.body.innerHTML+=`<div class='container'style='color:red'>${err}</div>`;
    })
  }