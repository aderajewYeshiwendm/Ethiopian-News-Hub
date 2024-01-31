import { useState } from "react"
export default function AdminLogin(){
    const [adminInfo, setAdminInfo] = useState({
        email: "",
        password: ""
      })
  
    const handleChange = (e) =>{
        setAdminInfo(prev=>{
        return {
          ...prev,
          [e.target.name] : e.target.value
        }
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
  
      
      console.log( adminInfo);
    };
  
  
    console.log(adminInfo)
     return (
        
        <>
        <section className="main_bod admin_page">
        <div className="admin_login_container">
            <h2 className="login_title">Admin Login</h2>
            <form className="admin_login_form"onSubmit={handleSubmit} >
                <div className="admin_username_input">
                    <label className="username_input" for="email">Email:</label>
                    <input type="email" id="email" name="email" value={adminInfo.email} onChange={handleChange} required />
                </div>
                <div className="admin_password_input">
                    <label className="password_input" for="password">Password:</label>
                    <input type="password" id="password" name="password" value={adminInfo.password} onChange={handleChange} required />
                </div>
                <div className="login">
                    <button className="login_btn" type="submit"><a href="article_entry.html" className="login_link">Login</a></button>   
                </div>
            </form>
        </div>
    </section>
        
        </>
     )
}