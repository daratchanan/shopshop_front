import React, { useContext, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from "../../config/axios";
import DataContext from "../../context/DataContext";

const useStyles = makeStyles((theme) => ({
   cardGrid: {
      paddingTop: theme.spacing(4),
   },
   bestSeller: {
      marginBottom: "20px",
      borderBottom: "5px solid red"
   }
}));


function AllProduct() {
   const classes = useStyles();
   // const [products, setProducts] = useState([]);
   const { products, setProducts} = useContext(DataContext);

   // const fetchProductByType = async (id) => {
   //    const res = await axios.get(`products/allProductType_id/${id}`);
   //    setProducts(res.data.allProductType_id);
   // }

   const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data.products);
   }

   useEffect(() => {
      fetchProducts();
   }, []);


   return (
      <Container className={classes.cardGrid} maxWidth="md">
         <Box component="div" className={classes.bestSeller}>
            <Typography variant="h4" >
               Product
            </Typography>
         </Box>
         <Grid container spacing={2}>
            {products.map((product, idx) => (
               <Grid item xs={12} sm={6} md={3} key={idx}>
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

export default AllProduct;
