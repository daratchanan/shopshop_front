import React from 'react';
import AllProduct from '../../../components/AllProduct/AllProduct';
import Navbar from "../../../components/Navbar/Navbar";
import TopProduct from '../../../components/TopProduct/TopProduct';


function Home() {
   return (
      <div>
         <Navbar />
         <TopProduct />
         <AllProduct />
      </div>
   )
};

export default Home;
