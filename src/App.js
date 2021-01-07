import './App.css';
import LocalStorageService from "./services/localStorage"
import { useState } from 'react';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';
import UserContext from './context/UserContext';
import DataContext from './context/DataContext';


function App() {
   const [role, setRole] = useState(LocalStorageService.getRole());
   const [products, setProducts] = useState([]);

   const user = LocalStorageService.getUser();

   return (
      <>
         <UserContext.Provider value={{ role, setRole, user }}>
            <DataContext.Provider value={{ products, setProducts}}>
               <PrivateRoutes role={role} setRole={setRole} />
            </DataContext.Provider>
         </UserContext.Provider>
      </>
   );
}

export default App;
