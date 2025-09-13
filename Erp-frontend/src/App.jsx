import React from 'react'

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Attendance, Auth, Buy, Categories, CompanyMap, Customers, Departments, Employees, Exchange, Expense, Home,
        Incomes,
        Inventory,
        InvManagement,
        Invoices, Jobs, MyAnnual, MySickleave, Products, Profile, Receipt, Representative, Salaries, SalaryMonthly, Sales, Services, Stores, 
        StoresCategories, StoresInventory, StoresInvoices, StoresItems, StoresUnits, Suppliers, Transactions, Units, Vacations ,
      } from './pages';

import Header from './components/shared/Header';

import { useSelector } from 'react-redux';
import useLoadData from './hooks/useLoadData';
import { ToastContainer } from 'react-toastify';

import FullScreenLoader from './components/shared/FullScreenLoader';

// Place this once in your app (e.g., in App.jsx or a setup file)
// called  Axios interceptor to fix :-
// means your backend requires authentication, but your request is missing the Authorization token.

// import axios from 'axios' 

// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// ...rest of your App.jsx code...
// Place this once in your app (e.g., in App.jsx or a setup file)

// export const backendUrl =  import.meta.env.VITE_BACKEND_URL

function Layout() {

  // useLoadData();

  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ['/auth', '/sale' , '/buy', '/exchange', '/receipt', '/attendance', 
    '/storesinvoices' , '/inventory', '/storesinventory', '/employees', '/salaries', '/montlysalary',
    '/profile' , '/myannualleave', '/mysickleave', '/vacations' , '/map', '/services', '/sales', 
    '/buy', '/customers', '/categories', '/units' ,'/suppliers', '/invoices', '/transactions',  '/stores',
    '/storescategories', '/storesunits', '/storesitems', '/departments', '/jobs', '/expenses' , '/incomes' 
  ];

  // to prevent browser with out login
  const { isAuth } = useSelector(state => state.user);
  
  if(isLoading) return <FullScreenLoader />
  
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) &&  <Header/>}

        <ToastContainer />

        <Routes>
          
        <Route path ='/auth' element = {isAuth ? <Navigate to ='/' /> :  <Auth />} />
            

        <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>

        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>}/>

          <Route path ='/transactions' element ={<ProtectedRoutes><Transactions/></ProtectedRoutes>}/>    
          <Route path ='/expenses' element ={<ProtectedRoutes><Expense /></ProtectedRoutes>}/>
           <Route path ='/incomes' element ={<ProtectedRoutes><Incomes /></ProtectedRoutes>}/>

          <Route path ='/categories' element ={<ProtectedRoutes><Categories /></ProtectedRoutes>}/>
          <Route path ='/services' element ={<ProtectedRoutes><Services /></ProtectedRoutes>}/>
          <Route path ='/units' element ={<ProtectedRoutes><Units /></ProtectedRoutes>}/>
                
          <Route path ='/customers' element ={<ProtectedRoutes><Customers/></ProtectedRoutes>}/>
          <Route path ='/representative' element ={<Representative/>} />
          <Route path ='/suppliers' element ={<ProtectedRoutes><Suppliers /></ProtectedRoutes>}/>

          <Route path ='/sales' element ={<ProtectedRoutes><Sales /></ProtectedRoutes>}/>
          <Route path ='/buy' element ={<ProtectedRoutes><Buy /></ProtectedRoutes>}/>
          <Route path ='/invoices' element ={<ProtectedRoutes><InvManagement /></ProtectedRoutes>}/>

        
        
        
        {/* HR */}

        <Route path='/attendance' element={<ProtectedRoutes><Attendance /></ProtectedRoutes>} />



        <Route path='/departments' element={<ProtectedRoutes><Departments /></ProtectedRoutes>} />


        <Route path='/jobs' element={<ProtectedRoutes><Jobs /></ProtectedRoutes>} />

        <Route path='/employees' element={<ProtectedRoutes><Employees /></ProtectedRoutes>} />

        <Route path='/salaries' element={<ProtectedRoutes><Salaries /></ProtectedRoutes>} />

        <Route path='/montlysalary' element={<ProtectedRoutes><SalaryMonthly /></ProtectedRoutes>} />

        
        <Route path='/myannualleave' element={
          <ProtectedRoutes>
            <MyAnnual />
          </ProtectedRoutes>

        } />

        <Route path='/mysickleave' element={
          <ProtectedRoutes>
            <MySickleave />
          </ProtectedRoutes>

        } />

        <Route path='/vacations' element={
          <ProtectedRoutes>
            <Vacations />
          </ProtectedRoutes>

        } />

        <Route path='/map' element={
          <ProtectedRoutes>
            <CompanyMap />
          </ProtectedRoutes>

        } />


        {/* Stores */}

        <Route path='/stores' element={
          <ProtectedRoutes>
            <Stores />
          </ProtectedRoutes>

        } />

        <Route path='/storescategories' element={
          <ProtectedRoutes>
            <StoresCategories />
          </ProtectedRoutes>

        } />

         <Route path='/storesitems' element={
          <ProtectedRoutes>
            <StoresItems />
          </ProtectedRoutes>

        } />

        <Route path='/storesunits' element={
          <ProtectedRoutes>
            <StoresUnits />
          </ProtectedRoutes>

        } />

        <Route path='/exchange' element={
          <ProtectedRoutes>
            <Exchange />
          </ProtectedRoutes>

        } />

        <Route path='/receipt' element={
          <ProtectedRoutes>
            <Receipt />
          </ProtectedRoutes>

        } />


        <Route path='/storesinvoices' element={
          <ProtectedRoutes>
            <StoresInvoices />
          </ProtectedRoutes>

        } />

        <Route path='/inven' element={
          <ProtectedRoutes>
            <Inventory />
          </ProtectedRoutes>

        } />

        <Route path='/inventory' element={
          <ProtectedRoutes>
            <StoresInventory />
          </ProtectedRoutes>

        } />




        </Routes>

    </>
  );
};



function ProtectedRoutes({children}) {

   const { isAuth } = useSelector(state => state.user);
   if (!isAuth) {
      return <Navigate to='/auth'/>
   }

   return children;
}



const App = () => {
  return (
   
      <Router>
          <Layout />      

      {/* <Header />
        
        <ToastContainer />

        <Routes>
          
          <Route path ='/auth' element ={<Auth />} />

          <Route path ='/' element ={<Home />}/>
          <Route path ='/transactions' element ={<Transactions/>}/>
          <Route path ='/expense' element ={<Expense />}/>
          <Route path ='/categories' element ={<Categories />}/>
          <Route path ='/services' element ={<Services />}/>
          <Route path ='/units' element ={<Units />}/>

          <Route path ='/customers' element ={<Customers/>}/>
          <Route path ='/representative' element ={<Representative/>} />
          <Route path ='/suppliers' element ={<Suppliers />}/>

          <Route path ='/sales' element ={<Sales />}/>
          <Route path ='/buy' element ={<Buy />}/>
          <Route path ='/invoices' element ={<Invoices />}/>

        </Routes> */}


      </Router>
  );
}


export default App;
