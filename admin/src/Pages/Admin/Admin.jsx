import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { AdminLogin } from '../../Components/AdminLogin/AdminLogin'
import Navbar from '../../Components/Navbar/Navbar'
import ProtectedRoute from '../../Components/ProtectedRoute/ProtectedRoute'
import ModifyProduct from '../../Components/ModifyProduct/ModifyProduct'
import UsersList from '../../Components/UsersList/UsersList'
import OrdersList from '../../Components/OrdersList/OrdersList'
import ModifyOrder from '../../Components/ModifyOrder/ModifyOrder'
const Admin = () => {
  return (
    <div className='admin'>
      <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/*' element={
          <ProtectedRoute>
            <Navbar />
            <Sidebar />
            <Routes>
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/listproduct' element={<ListProduct />} />
              <Route path='/modifyproduct' element={<ModifyProduct/>}/>
              <Route path='/modifyproduct/:id' element={<ModifyProduct/>}/>
              <Route path='/' element={<Dashboard />} />
              <Route path='/users' element={<UsersList/>} />
              <Route path='/orders' element={<OrdersList />} />
              <Route path='/modifyorder' element={<ModifyOrder/>} />
              <Route path='/modifyorder/:id' element={<ModifyOrder/>} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default Admin