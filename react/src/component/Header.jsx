// import React from "react"
// import { NavLink } from "react-router-dom"
// import Search from "./search"
// export default function Header(){
  
//           return (
//             <>
//             <nav className="navigation">
//         <img id="logo" src="src\image\News--HUB.png" alt="ethiopian news hub logo" />
//         <ul className="nav">
//           <li className="nav_items"><NavLink className={({isActive}) => isActive ? "my-link" : null }  to="/">Home</NavLink> </li>
//           <li className="nav_items"><NavLink className={({isActive}) => isActive ? "my-link" : null }   to="/ethiopianNews">Ethiopian News</NavLink></li>
//           <li className="nav_items"><NavLink className={({isActive}) => isActive ? "my-link" : null }   to="/world">World</NavLink></li>
//           <li className="nav_items"><NavLink className={({isActive}) => isActive ? "my-link" : null }   to="/entertainmentNews">Entertainment</NavLink></li>
//           <li className="nav_items"><NavLink className={({isActive}) => isActive ? "my-link" : null }   to="/sport">Sports</NavLink></li>
//           <li className="nav_items"><NavLink className={({isActive}) => isActive ? "my-link" : null }   to="/businessNews">Business</NavLink></li>

//         </ul>
//         <div className="search_user">
//           <div className="search" >
//           <i className="fas fa-search"></i>
//         </div>
//         <div  className="user">
//         <i className="fas fa-user"></i>

          
//         </div>
//         </div>
//       </nav>
//             </>
//           )
// } 

import { useState } from "react";
import { NavLink } from "react-router-dom";
import SpecificNews from "./specificNews";

export default function Header() {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  const [isSearchBarVisible, setSearchBarVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNewsData, setFilteredNewsData] = useState([]);

  const handleSubmit = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/${category}/${searchQuery}`);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setFilteredNewsData(data);
      console.log(data);
    } catch (error) {
      console.error("Error searching for news:", error.message);
    }
    return (
      <>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <SpecificNews name="Business News" filteredNewsData={filteredNewsData} />
        )}
      </>
    );
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
    
  };
  const closeSidebar = () => {
    setSidebarVisibility(false);
  };
  const toggleSearchBar = () => {
    setSearchBarVisibility(!isSearchBarVisible);
    
  };
  const closeSearchBar = () => {
    setSearchBarVisibility(false);
  };
  return (
    <>
      <nav className="navigation">
        <img id="logo" src="src\image\News--HUB.png" alt="ethiopian news hub logo" />
        <ul className="nav">
          <li className="nav_items">
            <NavLink to="/">Home</NavLink>{" "}
          </li>
          <li className="nav_items">
            <NavLink to="/ethiopianNews">Ethiopian News</NavLink>
          </li>
          <li className="nav_items">
            <NavLink to="/world">World</NavLink>
          </li>
          <li className="nav_items">
            <NavLink to="/entertainmentNews">Entertainment</NavLink>
          </li>
          <li className="nav_items">
            <NavLink to="/sport">Sports</NavLink>
          </li>
          <li className="nav_items">
            <NavLink to="/businessNews">Business</NavLink>
          </li>
        </ul>
        <div className="search_user" onClick={toggleSearchBar}>
          <div className="search">
            <i className="fas fa-search"></i>
          </div>
          <div className="user" onClick={toggleSidebar}>
            <i className="fas fa-user"></i>
          </div>
        </div>
      </nav>

      {isSidebarVisible && (
        <div className="sidebar">
          <button className="close-btn" onClick={closeSidebar}>
          <i className="fas fa-times"></i>
        </button>
          <div className="user-info">
            <img
              className="profile-photo"
              src="../images/profile.jpg"
              alt="Profile Photo"
            />
           
          </div>
          <footer>
            <div className="bottom">
              <p>&#169;Ethiopian News Hub 2024</p>
            </div>
          </footer>
        </div>
      )}

{isSearchBarVisible && (
        <div className="sidebar">
         
        <section className="search_section">
        <button className="close-btn" onClick={closeSearchBar}>
          <i className="fas fa-times"></i>
        </button>
    <div className="search-container">
        <form>
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search by title..."
              required
            />
            <button className="search-button" onSubmit={() => handleSubmit("news")}>
              <i className="fas fa-search"></i>
            </button>
        </form>
    </div>
</section>
          <footer>
            <div className="bottom">
              <p>&#169;Ethiopian News Hub 2024</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
  
}