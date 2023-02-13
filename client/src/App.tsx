import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import CustomerProducts from './pages/CostumerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/customer/products' element={ <CustomerProducts />} />
    </Routes>
  );
}
