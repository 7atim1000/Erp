import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Home, Auth, Orders, Tables, Menu, Dashboard, Invoices, Customers, Services, Units, Category, Transactions  } from './pages'
import Header from './components/shared/Headers'
import { useSelector } from 'react-redux';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';
import { ToastContainer } from 'react-toastify';

function Layout() {

  const location = useLocation();
  //useLoadData();  // to not logout during refresh page
  const isLoading = useLoadData();
  
  // hide Header
  const hideHeaderRoutes = ['/auth', '/menu', '/categories', '/units', '/services', 
    '/customers', '/invoices', '/dashboard', '/tables', '/orders', '/transactions'
  ];

  const { isAuth } = useSelector(state => state.user);
  if(isLoading) return <FullScreenLoader />
 
  return (
    <>
      {/* <Router> */}
      {/* <Header/> */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <ToastContainer />
      
      <Routes>

        <Route path='/' element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
          }/>

        <Route path ='/auth' element={isAuth ? <Navigate to='/'/> : <Auth />}/>

        <Route path ='/orders' element={
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
          }
        />

        <Route path ='/tables' element={
          <ProtectedRoutes>
            <Tables />   
          </ProtectedRoutes>  
          }
        />

        <Route path ='/menu' element={
          <ProtectedRoutes>
            <Menu />
          </ProtectedRoutes>
          }
        />
        
        <Route path ='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
          }
        />

        <Route path ='/invoices' element={
          <ProtectedRoutes>
            <Invoices />
          </ProtectedRoutes>
          }
        />

        <Route path ='/customers' element={
          <ProtectedRoutes>
            <Customers />
          </ProtectedRoutes>
        }
        />

        <Route path ='/services' element={
          <ProtectedRoutes>
            <Services />
          </ProtectedRoutes>
        }
        />

        <Route path ='/units' element={
          <ProtectedRoutes>
            <Units />
          </ProtectedRoutes>
        }
        />

        <Route path ='/categories' element={
          <ProtectedRoutes>
            <Category />
          </ProtectedRoutes>
        }
        />

        <Route path ='/transactions' element={
          <ProtectedRoutes>
            <Transactions />
          </ProtectedRoutes>
        }
        />

        <Route path='/*' element={<div>Not Found</div>}/>
     
      </Routes>
     {/* </Router> */}
    </>
  )
}


function ProtectedRoutes({children}) {
  const { isAuth } = useSelector(state => state.user);
  if (!isAuth) {
    return <Navigate to ='/auth' />
  }

  return children;
}

function App() {
 
    return (
      <Router>
        <Layout />
      </Router>
    )
}

export default App
