import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Landing from './routes/Landing.jsx'
import LocationContainer from './routes/LocationContainer.jsx'
import LocationList from './components/LocationList.jsx'
import ProductContainer from './routes/ProductContainer.jsx'
import ProductList from './components/ProductList.jsx'
import ProductForm from './components/ProductForm.jsx'
import AdminForm from './routes/AdminForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
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
                <Route path="AdminLogin" element={<AdminForm />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
