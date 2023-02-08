import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to='/login' />} />
      <Route path="/login" element={ <Login />} />
    </Routes>
  );
}
