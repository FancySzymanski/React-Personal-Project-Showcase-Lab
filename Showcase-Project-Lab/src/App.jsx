import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Landing from './routes/Landing.jsx'
import ProductContainer from './routes/ProductContainer.jsx'
import LocationList from './components/LocationList.jsx'
import LocationCard from './components/LocationCard.jsx'
import ProductForm from './components/ProductForm.jsx'
import ProductCard from './components/ProductCard.jsx'
import AdminForm from './routes/AdminForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Landing />} />
                <Route path="/locations" element = {<LocationList />} >
                    <Route path=":id" element={<LocationCard />} >
                        <Route path="shop/new" element={<ProductForm />} />
                        <Route path="shop/:productId" element={<ProductCard />} />
                    </Route>
                </Route>
                <Route path="/shop" element= {<ProductContainer />} />
                <Route path="AdminLogin" element={<AdminForm />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
