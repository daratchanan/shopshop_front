import React,{ useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Container, Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
   cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
   },
}));


function ProductItem() {
   const classes = useStyles();
   const [topProducts, setTopProducts] = useState([]);

   const fetchTopProducts = async () => {
      const res = await axios.get("/products/top?limit=4");
      setTopProducts(res.data.products);
      console.log(res.data.products)
   }
   
   useEffect(() => {
      fetchTopProducts();
   }, []);


   return (
      <Container className={classes.cardGrid} maxWidth="md">
         <Grid container spacing={2}>
            {topProducts.map((product) => (
            <ProductCard
               productId={product.id}
               productName={product.name}
               price={product.price}
               description={product.description}
               img={product.img}
            />))}
            
         </Grid>
      </Container>
   );
};

export default ProductItem;
