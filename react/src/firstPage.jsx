import { NavLink } from "react-router-dom"
export default function FirstPage(){
    return (
        <>
        <div className="body">
       <div className="top_right">
        <button className="add_button"><NavLink className="add_link" to="user"><i className="fa-solid fa-user-plus"></i></NavLink></button>
        <div className="top_right_paragraph">
            <p className="top_right_contact"><NavLink className="contact_link" to="contact" >Contact</NavLink></p>
            <p className="top_right_about"><NavLink className="about_link"  to="about">About Us</NavLink></p>
        </div>
    </div>
    <div className="title">
        <p className="title_paragraph"><span className="title_main">ETHIOPIAN</span> <span className="title_main_mid">NEWS</span> <span className="title_main_final">HUB</span></p>
    </div>
    <div className="description">
        <p className="description"><span className="description_source">STORIES</span> <span className="description_source_mid">FROM THE RELIABLE</span> <span className="description_source_final">SOURCE</span></p>
    </div>
    <div className="middle_icon">
        <button className="drop_button"><a href="entryPage.html"><i id="drop_button" className="fa-solid fa-circle-chevron-down"></i></a></button>
    </div>
    <div className="bottom_left">
        <button className="facebook_icon"><i className="fa-brands fa-facebook"></i></button>
        <button className="instagram_icon"><i className="fa-brands fa-instagram"></i></button>
        <button className="x_icon"><i className="fa-brands fa-x-twitter"></i></button>
    </div>
    </div>
        
        </>
    )
}