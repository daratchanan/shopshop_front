import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { ButtonGroup } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import UserContext from '../../context/UserContext';
import LocalStorageService from "../../services/localStorage"
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
   grow: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'block',
      },
   },
   topMenu: {
      background: 'secondary'
   },
   bottomMenu: {
      background: '#f5f5f5'
   }
}));

export default function NavBar() {
   const classes = useStyles();
   const history = useHistory();
   const { role , setRole} = useContext(UserContext);

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   
   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
    };
   const handleProfile = () => {
      setAnchorEl(null);
     alert('profile click')
   };
   const handleLogout = () => {
      setAnchorEl(null);
      // console.log('logout');
      LocalStorageService.clearToken();
      setRole(LocalStorageService.getRole());
      history.push("/");
   };

   const handleLogin = () => {
      setAnchorEl(null);
      history.push("/login");
   };

   const gotoCart = () => {
      history.push("/cart");
   }


   const menus = [
      { name: "Televesions" },
      { name: "Refrigerators" },
      { name: "Air Conditioners" },
      { name: "Fans" },
      { name: "Washing Machines" },
      { name: "Irons" },
      { name: "Computers/Laptops" },
      { name: "Smartphones" },
   ]
console.log(`role:${role}`);
   return (
      <div className={classes.root} >
         <AppBar position="static">
            <Toolbar className={classes.topMenu}>
               <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
               >
                  <MenuIcon />
               </IconButton>
               <Typography className={classes.title} variant="h6" noWrap>
                  ShopShop
                    </Typography>
               <div className={classes.grow} />
               <IconButton
                  color="inherit"
               >
                  <HomeIcon />
               </IconButton>

               <IconButton aria-label="show 4 new mails" color="inherit" onClick={gotoCart}>
                  <Badge badgeContent={4} color="secondary">
                     <ShoppingCartIcon />
                  </Badge>
               </IconButton>
               {/* <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
               >
                  <ShoppingCartIcon />
               </IconButton> */}

               <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
               >
                  <AccountCircle />
               </IconButton>
               <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
               >
                  <MenuItem onClick={handleProfile}>My profile</MenuItem>
                {role === 'USER'?
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                :
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                }
               </Menu>
            </Toolbar>
            <Toolbar className={classes.bottomMenu}>
               <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                  {menus.map((menu) => (
                     <Button>{menu.name}</Button>
                  ))}
               </ButtonGroup>
            </Toolbar>
         </AppBar>
      </div>
   );
}