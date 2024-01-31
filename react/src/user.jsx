import {useState} from "react"
import { NavLink } from "react-router-dom"
export default function User(){
    const [userInfo, setUserInfo] = useState({
      email: "",
      password: ""
    })

  const handleChange = (e) =>{
    setUserInfo(prev=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    
    console.log( userInfo);
  };


  console.log(userInfo)

    return (
        <>
        <main className="body">
      <div className="written">
        <div className="title">
          <p className="title_paragraph"><span className="title_main">ETHIOPIAN</span> <span className="title_main_mid">NEWS</span> <span className="title_main_final">HUB</span></p>
        </div>
        <div className="description">
          <p className="description"><span className="description_source">STORIES</span> <span className="description_source_mid">FROM THE RELIABLE</span> <span className="description_source_final">SOURCE</span></p>
        </div>
      </div>
      <div className="login_card">
        <p className="welcome_note">Welcome</p>
        <form className="inputs" onSubmit={handleSubmit}>
          <input className="input_placeholder" type="email" placeholder="Email" name="email" value={userInfo.email} onChange={handleChange} required/>
          <input className="input_placeholder_password" type="password" placeholder="Password" name="password" value={userInfo.password} onChange={handleChange} required/>
          <div className="forget_create">
            
            <p className="account"><NavLink className="create_account" to="creatAcount">Create Account</NavLink></p>
          </div>
          <button className="login_btn">LOGIN</button>
        </form>
        <p className="social_login">Social Login</p>
          <button className="signin_btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.25" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
              <a className="sign_link" href="#">Sign in with Google</a>
          </button>
        </div>  
    </main>
        
        
        </>
    )
}