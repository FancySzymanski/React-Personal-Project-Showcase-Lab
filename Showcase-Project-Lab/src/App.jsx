import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Landing from './routes/Landing.jsx'
import LocationContainer from './routes/LocationContainer.jsx'
import LocationList from './components/LocationList.jsx'
import ProductContainer from './routes/ProductContainer.jsx'
import ProductList from './components/ProductList.jsx'
import { AdminProvider } from './components/AdminContext.jsx'
import AdminForm from './routes/AdminForm.jsx'
import AdminProductContainer from './routes/AdminProductContainer.jsx'
import AdminProductList from './components/AdminProductList.jsx'
import AdminProductForm from './components/AdminProductForm.jsx'


function App() {

  return (
    <AdminProvider>
    <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Landing />} />
                <Route path="/locations" element = {<LocationContainer />} >
                    <Route index element={<LocationList />} />
                    <Route path=":id" element={<ProductContainer />}>
                      <Route index element={<ProductList />} />
                    </Route>
                </Route>
                <Route path="/shop" element= {<ProductContainer />}>
                  <Route index element={<ProductList />} />
                </Route>
                <Route path="/admin/login" element={<AdminForm />} />
                <Route path="/admin/products" element={<AdminProductContainer />}>
                  <Route index element={<AdminProductList />} />
                  <Route path="new" element={<AdminProductForm />} />
                  <Route path=":id/edit" element={<AdminProductForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AdminProvider>
  )
}

export default App
