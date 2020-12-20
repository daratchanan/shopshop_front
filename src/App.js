import './App.css';
import LocalStorageService from "./services/localStorage"
import { useState } from 'react';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';
import UserContext from './context/UserContext';



function App() {
   const [role, setRole] = useState(LocalStorageService.getRole());
   const [userId, setUserId] = useState();

   return (
      <>
         <UserContext.Provider value={{ role, setRole }}>
            <PrivateRoutes role={role} setRole={setRole} />
         </UserContext.Provider>
      </>
   );
}

export default App;
