import { useState } from "react"
export default function CreatAdmin(){
    const [userInfo , setUserInfo] = useState({
        name:'',
        age:'',
        email:'',
        username:'',
        password:'',
      
    })
    const handleChange = (e) =>{
        setUserInfo(prev=>{
          return {
            ...prev,
            [e.target.name] : e.target.value
          }
        })
      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:3000/host", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          });
    
          if (!response.ok) {
            throw new Error("Failed to create account");
          }
    
          // Optionally, you can handle the successful response here
          const data = await response.json();
          console.log("Account created successfully:", data);
          window.location.href = "/adminLog/admin";
        } catch (error) {
          console.error("Error creating account:", error.message);
        }
      };
        console.log( userInfo);
      
    
    
      

    return(
        <>
        <section className="main_bod">
    <form className="create_form " onSubmit={handleSubmit}>
        <h2 className="main_create_header">Create an Account</h2>
        <label className="create_label" for="name">Name:</label>
        <input className="create_input" type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} required />
        <label className="create_label" for="genusernameder">UserName:</label>
        <input className="create_input" type="text" id="username" name="username" value={userInfo.username} onChange={handleChange} required />
        <label className="create_label" for="age">Age:</label>
        <input className="create_input" type="text" id="age" name="age" value={userInfo.age} onChange={handleChange} required />
        <label className="create_label" for="email">Email:</label>
        <input className="create_input" type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} required />
        <label className="create_label" for="password">Password:</label>
        <input className="create_input" type="password" id="password" name="password" value={userInfo.password} onChange={handleChange} required />
        <button className="create_btn" type="submit">Create Account</button>
    </form>
</section>
        </>
    )
}