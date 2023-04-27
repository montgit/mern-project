
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import {Header, Footer, Error} from './components'

// Pages
import {Home, Contact, Login, Register, Reset, Ad, Admin, Ads} from './pages'

function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/reset' element={<Reset />}/>
          <Route path='/admin' element={<Admin />}/>
          {/* <Route path='/myprofile' element={<MyProfile />}/> */}
          <Route path='/ad' element={<Ad />}/>
          <Route path='/ads' element={<Ads />}/>
          <Route path='/er' element={<Error />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
