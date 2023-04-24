import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './Components/Login';
import PrincipalMenu from './Components/PrincipalMenu';
import { AuthContextProvider } from './Contexts/authContext';
import { PRIVATE, R_ROUTE, R_PRINCIPAL_MENU } from './router/routes';
import PublicRoute from './router/PublicRoute';
import PrivateRoute from './router/PrivateRoute';
import Receipts from './Components/Receipts';
import Tenants from './Components/Tenants';
import EditReceipts from './Components/EditReceipts';
import CreateReceipts from './Components/CreateReceipts';


function App() {


  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoute />}>
              <Route index element={<Login />} />
            </Route>
            <Route path={PRIVATE} element={<PrivateRoute />} >
              <Route index element={<PrincipalMenu />}/>
              <Route path='/private/receipts' element={<Receipts/>}/>
              <Route path='/private/tenants' element={<Tenants/>}/>
              <Route path='/private/editarRecibo/:id' element={<EditReceipts/>}/>
              <Route path='/private/crearRecibo' element={<CreateReceipts/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
