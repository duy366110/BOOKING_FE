import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { authReload } from './store/store-auth';
import './App.css';

function App() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(authReload());
  }, [])

  return (
    <div className="App">
        <Outlet />
    </div>
  );
}

export default App;
