import React from 'react'
import Home from '../components/Home/Home'
import { Route, Routes } from "react-router-dom";
import AddPaletas from '../components/AddPaletas';



const DashBoardRouter = () => {
  return (
    <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/add' element={<AddPaletas/>}/>
    </Routes>
  )
}

export default DashBoardRouter