import React from 'react'
import Home from '../components/Home/Home'
import { Route, Routes } from "react-router-dom";
import AddPaletas from '../components/AddPaletas';
//import EditPaleta from '../components/EditPaleta';



const DashBoardRouter = () => {
  
  return (
    <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/add' element={<AddPaletas/>}/>
        <Route path='/edit/:id' element={<AddPaletas/>} />
    </Routes>
  )
}

export default DashBoardRouter