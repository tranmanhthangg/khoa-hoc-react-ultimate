import './components/todo/todo.css';
import Header from './layout/header';
import Footer from './layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './service/api.service';
import { useEffect, useContext } from 'react';
import { AuthContext } from './components/context/auth.context';

const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>

  )
}

export default App;
