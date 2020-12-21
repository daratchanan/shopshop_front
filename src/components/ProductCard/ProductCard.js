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
      maxWidth: 500,
   },
   media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
   },
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   btnAdd: {
      marginLeft: 'auto',
   },
   expandOpen: {
      transform: 'rotate(180deg)',
   },
   avatar: {
      backgroundColor: red[500],
   },
}));



export default function ProductCard({ price, description, productName, img, productId }) {
   const classes = useStyles();
   const  { user }  = useContext(UserContext);

   const addCart = async ()=>{
      const item = { quantity:1, product_id:productId, user_id:user.id }
      await axios.post("/cartItems", item);
      alert('add to cart');
   };

   // const history = useHistory();

   // const handleCart = () => {
   //    history.push("/cart");
   // }

   return (
      <Grid item xs={12} sm={6} md={3} >
         <Card className={classes.root}>
            <CardMedia
               className={classes.media}
               image={img}
               // height="500"
               // style={{width: "100%"}}
            />
            <CardContent>
               <Typography variant="subtitle1" gutterBottom>
                  {productName}
               </Typography>
               <Typography variant="body2" 
               color="textSecondary" 
               component="p" 
               style={{height:'120px'}}>
                  {description}
               </Typography>
            </CardContent>
            <CardActions disableSpacing>
               <Typography variant="h5" gutterBottom>
                  {price}
               </Typography>
               <Button onClick={addCart} className={classes.btnAdd} variant="contained" color="primary">
                  Add to Cart
               </Button>
            </CardActions>
         </Card>
      </Grid>
   );
}
