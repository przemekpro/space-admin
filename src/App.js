import './app.scss'
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { getUsers } from './redux/usersSlice';
import { getProducts } from './redux/productsSlice';
import { getOrders } from './redux/ordersSlice';

import Home from './pages/home/Home'
import Users from './pages/users/users'
import Login from './pages/login/login';
import Register from './pages/register/register';
import EditUser from './pages/users/editUser';
import NewUser from './pages/users/newUser';
import RequireAuth from './utlis/RequireAuth';
import Products from './pages/products/products';
import EditProduct from './pages/products/editProduct';
import NewProduct from './pages/products/newProduct';
import Orders from './pages/orders/orders';
import Profile from './pages/profile/profile';

function App() {  

  const {currentUser} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  
  // Users 
  useEffect(() => {
      async function fetchData() {
          let list = []
          try {
              const res = await getDocs(collection(db, "users"));
              res.forEach(doc => list.push({id: doc.id, ...doc.data(), timeStamp: doc.data().timeStamp.seconds}))
              dispatch(getUsers(list))
          } catch(e) {
              console.log(e)
          }
      }
      fetchData()
  }, [dispatch])


  // Products
  useEffect(() => {
      async function fetchData() {
          let list = []
          try {
              const res = await getDocs(collection(db, "products"));
              res.forEach(doc => list.push({id: doc.id, ...doc.data(), timeStamp: doc.data().timeStamp.seconds}))
              dispatch(getProducts(list))
          } catch(e) {
              console.log(e)
          }
      }
      fetchData()
  }, [dispatch])


  // Orders
  useEffect(() => {
      async function fetchData() {
          let list = []
          try {
              const res = await getDocs(collection(db, "orders"));
              res.forEach(doc => {
                  const newDate = new Date(doc.data().date.seconds*1000)
                  list.push({
                      ...doc.data(), 
                      id: doc.id, 
                      date: `${newDate.getDate()}-${newDate.getMonth()+1}-${newDate.getFullYear()}`,
                      timeStamp: doc.data().timeStamp.seconds
              })})
              
              dispatch(getOrders(list))
          } catch(e) {
              console.log(e)
          }
      }
      fetchData()
  }, [dispatch])



  return (
    <div className="app">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<RequireAuth />} >
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/new-user' element={<NewUser />} />
              <Route path='/edit-user' element={<EditUser />} />
              <Route path='/products' element={<Products />} />
              <Route path='/new-product' element={<NewProduct />} />
              <Route path='/edit-product' element={<EditProduct />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
