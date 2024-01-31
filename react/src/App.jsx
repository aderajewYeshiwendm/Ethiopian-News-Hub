import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Layout from './component/Layout'
import Home from './home'

import World from './world'
import Sport from './sportNews'
import EthiopianNews from './ethiopianNews'
import EntertainmentNews from './entertainmentNews'
import BusinessNews from './businessNews'
import About from './about'
import Contact from './contact'
import User from './user'
import CreatAccount from './creatAccount'
import FirstPage from './firstPage'
import FreeContact from './freeContact'
import FreeAbout from './freeAbout'
import Entry from './admin/entry'
import AdminLogin from './admin/login'
import CreatAdmin from './admin/creatadmin'


function App() {
 

  return (
    <>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/ethiopianNews" element={<EthiopianNews/>}/>
        <Route path="/world" element={<World/>}/>
        <Route path="/businessNews" element={<BusinessNews/>}/>
        <Route path="/entertainmentNews" element={<EntertainmentNews/>}/>
        <Route path="/sport" element={<Sport/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        </Route>
        
        <Route path="/firstPage" >
          <Route index element={<FirstPage/>}/>
          <Route path="user">
          <Route index element={<User/>}/>
          <Route path="creatAcount"  element={<CreatAccount/>} />
          </Route>
          <Route path="contact" element={<FreeContact/>}/>
          <Route path="about" element={<FreeAbout/>}/>
        </Route>
        <Route path="/adminLog" >
          <Route index  element={<AdminLogin/>}/>
          <Route path="creat" element={<CreatAdmin/>}/>
          <Route path="admin" element={<Entry/>}/>
        </Route>

        
      </Routes>
      

    </BrowserRouter>
    
   
    </>
  )
}

export default App
