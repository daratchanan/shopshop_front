import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from "../../config/axios";

const useStyles = makeStyles((theme) => ({
   cardGrid: {
      paddingTop: theme.spacing(4),
   },
   bestSeller: {
      marginBottom: "20px",
      borderBottom: "5px solid red"
   }
}));


function TopProduct() {
   const classes = useStyles();
   const [topProducts, setTopProducts] = useState([]);

   const fetchTopProducts = async () => {
      const res = await axios.get("products/top?limit=4");
      setTopProducts(res.data.products);
      console.log(res.data.products)
   }
   useEffect(() => {
      fetchTopProducts();
   }, []);


   return (
      <Container className={classes.cardGrid} maxWidth="md">
         <Box component="div" className={classes.bestSeller}>
            <Typography variant="h4" >
               Best Seller
            </Typography>
         </Box>
         <Grid container spacing={2}>
            {topProducts.map((product) => (
               <Grid item xs={12} sm={6} md={3} >
                  <ProductCard
                     productId={product.id}
                     productName={product.name}
                     price={product.price}
                     description={product.description}
                     img={product.img}
                  />
               </Grid>
            ))}
         </Grid>
      </Container>
   );
};

export default TopProduct;
