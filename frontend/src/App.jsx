import "./App.css";
import Navbar from "./components/Nav";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Outlet></Outlet>
      <Navbar></Navbar>
    </div>
  );
}

export default App;
