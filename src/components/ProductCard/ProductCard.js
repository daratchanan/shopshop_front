import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from '../../config/axios';

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 345,
      height: '400px'
   },
   productName: {
      height: "50px",
      overflow: "hidden",
      // border: "2px solid red"
   },
   productDes: {
      height: "60px",
      overflow: "hidden",
   },
   action: {
      marginBottom: "10px",
      padding: "0 10px",
      textAlign: "center"
   },
   btnAdd: {
      padding: "10px"
   },
}));

export default function ProductCard({ price, description, productName, img, productId }) {
   const classes = useStyles();
   const { user } = useContext(UserContext);

   const addCart = async () => {
      const item = { quantity: 1, product_id: productId, user_id: user.id }
      await axios.post("/cartItems", item);
      alert('add to cart');
   };


   return (

      <Card className={classes.root}>

         <CardMedia
            component="img"
            alt="electrical appliance picture"
            image={img}
         />
         <CardContent>
            <Typography
               variant="subtitle1"
               gutterBottom
               className={classes.productName}
            >
               {productName}
            </Typography>
            <Typography variant="body2"
               color="textSecondary"
               component="p"
               className={classes.productDes}
            >
               {description}
            </Typography>
         </CardContent>

         <div className={classes.action}>
            <Typography variant="h5" component="p">
               {new Intl.NumberFormat().format(price) + " Baht"}
            </Typography>

            <Button onClick={addCart} className={classes.btnAdd} variant="contained" color="primary" fullWidth >
               Add to Cart
                  </Button>
         </div>
      </Card>
   );
}
