
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import {Header, Footer, Error} from './components'

// Pages
import {Home, Contact, Login, Logout, Register, MyProfile, Reset, Ad, Ads, Products} from './pages'
import { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer/UseReducer';

// Context API
export const userContext = createContext() 

// const Routing = () => {
//   <BrowserRouter>
//       <Header/>
//         <Routes>
//           <Route path='/' element={<Home />}/>
//           <Route path='/contact' element={<Contact />}/>
//           <Route path='/login' element={<Login />}/>
//           <Route path='/logout' element={<Logout />}/>
//           <Route path='/register' element={<Register />}/>
//           <Route path='/reset' element={<Reset />}/>
//           <Route path='/myprofile' element={<MyProfile />}/>
//           <Route path='/ad' element={<Ad />}/>
//           <Route path='/ads' element={<Ads />}/>
//           <Route path='/er' element={<Error />}/>
//         </Routes>
//         <Footer />
//       </BrowserRouter>
// }

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <userContext.Provider value={{state, dispatch}}>
    
          {/* <Routing /> */}

       <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/logout' element={<Logout />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/reset' element={<Reset />}/>
            <Route path='/myprofile' element={<MyProfile />}/>
            <Route path='/ad' element={<Ad />}/>
            <Route path='/ads' element={<Ads />}/>
            <Route path='/er' element={<Error />}/>
            <Route path="/products" element={<Products/>}/>
          </Routes>
          {/* <Footer /> */}
      </BrowserRouter>

      </userContext.Provider>
    </>
  );
}

export default App;
