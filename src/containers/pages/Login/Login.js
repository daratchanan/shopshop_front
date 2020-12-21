import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserContext from '../../../context/UserContext';
import LocalStorageService from "../../../services/localStorage"
import axios from '../../../config/axios';
import { useHistory } from 'react-router-dom';

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
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));


export default function Login() {
   const { role , setRole} = useContext(UserContext)
   const classes = useStyles();
   // const { register, handleSubmit } = useForm();

   // const { setChange } = useContext(UserContext)

   const history = useHistory();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const emailHandler = (even) => {
      setEmail(even.target.value);
   };

   const passwordHandler = (even) => {
      setPassword(even.target.value);
   };

   const handleRegister = () => {
      history.push("/register");
   };

   const onFinish = (event) => {
      event.preventDefault();

      axios.post("/users/login", { email, password })
         .then(res => {
            alert("Login success.")
            LocalStorageService.setToken(res.data.token);
            setRole(LocalStorageService.getRole());
            // setUser(jwtDecode(res.data.token));
            // setChange(true);
            history.push('/');
         })
         .catch(err => {
            alert("Login failed")
         });
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Login
        </Typography>
            <form className={classes.form} noValidate onSubmit={onFinish}>
               <TextField
                  variant="outlined"
                  margin="normal"              
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={emailHandler}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={passwordHandler}
               />
               <FormControlLabel
                  control={<Checkbox
                     name="remember"
                     color="primary"
                     defaultValue={false}
                  />}
                  label="Remember me"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Login
          </Button>
               <Grid container>
                  <Grid item xs>
                     <Link href="#" variant="body2">
                        Forgot password?
              </Link>
                  </Grid>
                  <Grid item>
                     <Link href="#" variant="body2" onClick={handleRegister}>
                        {"Don't have an account? Register"}
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
         <Box mt={8}>
            <Copyright />
         </Box>
      </Container>
   );
}