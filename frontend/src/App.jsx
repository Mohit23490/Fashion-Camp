import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CollectionPages from "./pages/CollectionPages"
import ProductDetails from "./components/Products/ProductDetails"
import CheckOut from "./components/Cart/CheckOut"
import OrderComfirmationPage from "./pages/OrderComfirmationPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import MyOrdersPage from "./pages/MyOrdersPage"
import AdminLayout from "./components/Admin/AdminLayout"
import AdminHomePage from "./pages/AdminHomePage"
import UserMangment from "./components/Admin/UserMangment"
import ProductManagment from "./components/Admin/ProductManagment"
import EditProductPage from "./components/Admin/EditProductPage"
import OrderManagment from "./components/Admin/OrderManagment"

import { Provider } from "react-redux"
import store from "./redux/store"
import ProtectedRoute from "./components/Common/ProtectedRoute"
const App = () => {
  return (
   <Provider store={store}>
   <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<UserLayout />} > 
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPages />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order-confrimation" element={<OrderComfirmationPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Route>
        <Route path="/admin" element={
          <ProtectedRoute role="admin" >
          <AdminLayout />
        </ProtectedRoute>}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserMangment />} />
          <Route path="products" element={<ProductManagment />} />
          <Route path="products/:id/edit" element={<EditProductPage /> } />
          <Route path="orders" element={<OrderManagment />} />
        </Route>
      </Routes>

   </BrowserRouter>
  </Provider>
  )
}

export default App