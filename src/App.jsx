import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { authReload } from './store/store-auth';
import SectionPopupComponent from "./components/sections/Section-Popup-Component/Section-Popup-Component";
import './App.css';

function App() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(authReload());
  }, [])

  return (
    <div className="App">
        <Outlet />
        <SectionPopupComponent />
    </div>
  );
}

export default App;
