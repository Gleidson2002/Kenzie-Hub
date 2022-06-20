import axios from "axios";



const Loginapi = (data,history,setalert) => {

  axios
    .post(" https://kenziehub.herokuapp.com/sessions", {
        email:data.email,
        password:data.senha
    })
    .then((res) =>{ 
      localStorage.setItem("userid",res.data.user.id)
      localStorage.setItem("token",res.data.token)

      if(res.status===200){history.push("/home")}
      
  })
  .catch((err)=>err.code==='ERR_BAD_REQUEST'?setalert("Verifique seus dados ou cadastre-se"):"")
    
}

const GetUsers = (userid,setdados,settechs)=>{
  axios.get(`https://kenziehub.herokuapp.com/users/${userid}`)
  .then((res)=> {
    setdados(res)
    settechs(res.data.techs)
  })
}
const Registerapi = (data,history) => {
  axios
    .post("https://kenziehub.herokuapp.com/users", {
      email: data.email,
      password: data.senha,
      name: data.nome,
      bio: data.bio,
      contact: data.contato,
      course_module: data.modulo,
    })
    .then((res)=> res.status===201?history.push("/"):'')
}
const criartech = (token,data)=>{
 console.log(data)
 console.log(token)
  axios.post("https://kenziehub.herokuapp.com/users/techs",data,
  {headers:{
    Authorization:`Bearer ${token}`
  }}).then((res)=>console.log(res)).catch((err)=>console.log(err))
}

const deletartech = (techid,token)=>{
  axios.delete(`https://kenziehub.herokuapp.com/users/techs/${techid}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }}).then((res)=>console.log(res)).catch((err)=>console.log(err))

}
const alterartech = (techid,token,data,setmodalvisible2)=>{
  axios.put(`https://kenziehub.herokuapp.com/users/techs/${techid}`,data,{
    headers:{
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      if(res.status===201){
        setmodalvisible2(false)

      }
    })
       .catch((err)=>console.log(err))

}

export { Loginapi, Registerapi,GetUsers ,criartech,deletartech, alterartech};
