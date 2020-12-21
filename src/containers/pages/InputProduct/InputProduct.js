import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DropzoneDialog } from 'material-ui-dropzone';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { InputLabel, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';


function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {'Copyright © '}
         <Link color="inherit" href="https://material-ui.com/">
            Natty Website
      </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   input: {
      display: 'none',
      // background:"none",
      // border:"none"
   },
}));

export default function InputProduct() {
   const classes = useStyles();
   const [selectedFiles, setSelectedFiles] = useState({ open: false, files: [] });
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [productType, setProductType] = useState("");
   const [allProductType, setAllProductType] = useState([]);

   const nameHandle = (event) => {
      setName(event.target.value);
   };

   const priceHandle = (event) => {
      setPrice(event.target.value);
   };

   const descriptionHandle = (event) => {
      setDescription(event.target.value);
   };

   const productTypeHandle = (event) => {
      setProductType(event.target.value);
   };



   const handleClose = () => {
      setSelectedFiles({ open: false });
   }

   const handleSave = (files) => {
      //Saving files to state for further use and closing Modal.
      console.log(files);
      setSelectedFiles({ files, open: false });
   }

   const handleOpen = () => {
      console.log('open');
      setSelectedFiles({ open: true });
   }

   // const onUpload = e => {
   //    console.log(e.target.files[0])
   //    setImg(e.target.files[0].name);
   // }


   const onFinish = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('productType_id', productType);
      formData.append('image', selectedFiles.files[0]);
      
      axios.post("/products", formData) 
         .then(async (res) => {
            alert("Inputproduct successfully.")
         })
         .catch(err => {
            console.log(err);
            alert("Something went wrong.")
         });
   };

   const fetchProductTypes = async () => {
      const res = await axios.get("/products/allProductType");
      setAllProductType(res.data.productTypes);
   };
   
   useEffect(() => {
      fetchProductTypes();
   }, []);

   // console.log(allProductType);

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Typography component="h1" variant="h5">
               Input Products
            </Typography>
            <form onSubmit={onFinish} className={classes.form} noValidate>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        label="Product Name"
                        autoFocus
                        onChange={nameHandle}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Description"
                        autoFocus
                        onChange={descriptionHandle}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Price"
                        onChange={priceHandle}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <FormControl fullWidth variant="outlined" >
                        <InputLabel id="demo-simple-select-outlined-label">Product type</InputLabel>
                        <Select
                           labelId="demo-simple-select-outlined-label"
                           id="demo-simple-select-outlined"
                           value={productType}
                           onChange={productTypeHandle}
                           label="Product type"
                        >
                          {allProductType.map((p, idx) =>( <MenuItem id={idx+1} value={idx+1}>{p.name}</MenuItem>)
                          )}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <Button variant="contained" color="primary" component="span" onClick={handleOpen}>
                  Upload
               </Button>

               <DropzoneDialog
                  open={selectedFiles.open}
                  onSave={handleSave}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleClose}
               />

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Add Product
               </Button>
            </form>
         </div>
         <Box mt={5}>
            <Copyright />
         </Box>
      </Container>
   );
}