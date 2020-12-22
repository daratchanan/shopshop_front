import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Container from '@material-ui/core/Container';
import { Button, Divider, Grid, TextField } from '@material-ui/core';
import NavBar from '../../../components/Navbar/Navbar';
import axios from '../../../config/axios';
import { useHistory } from 'react-router-dom';


// function createData(name, detail, price, qty) {
//    return { name, detail, price, qty };
// }

// const rows = [
//    createData(0, 'WALL AIR CONDITIONER MITSUBISHI MSY-JS13VF 12283BTU INVERTER',
//       24600, 3),
//    createData(1, 'TATAMI FAN HATARI HT-S16R2 16" WHITE', 1290, 2),
//    createData(2, 'TATAMI FAN HATARI HT-S16R2 16" WHITE', 1290, 2)
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'img', numeric: false, disablePadding: false, label: '' },
  { id: 'detail', numeric: false, disablePadding: false, label: '' },
  { id: 'p', numeric: true, disablePadding: false, label: '' },
  { id: 'qty', numeric: true, disablePadding: false, label: '' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, deleteItem } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            Your cart
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={deleteItem} />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: "20px"
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  const shippingFee = 200;
  const totalCartPrice = cartItems.reduce((accu, item) => {
    return item.quantity * item.Product.price + accu;
  }, 0)


  const fetchCart = () => {
    axios.get("/cartItems")
      .then(async (res) => {
        setCartItems(res.data.cartItem)
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong.")
      });
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cartItems.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOrder = (e) => {

   

    axios.post("/orders", {total_price: totalCartPrice + shippingFee})
      .then(async (res) => {
        alert("Order created")
        history.push("/");
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong.")
      });

  };
  

  const updateQuantity = (e) => {
    // console.log (e.target.id)
    // console.log(e.target.value)
    axios.put(`/cartItems/${e.target.id}`, {
      quantity: Number(e.target.value)
    })
      .then(async (res) => {
        fetchCart()
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong.")
      });
    fetchCart();
  }

  const deleteItem = async () => {
    console.log('delete clicked')
    console.log(selected);

    await Promise.all(selected.map(async (id) =>
      await axios.delete(`/cartItems/${id}`)));
    fetchCart();
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, cartItems.length - page * rowsPerPage);

  return (
    <>
      <NavBar />
      <Container maxWidth="xl" className={classes.root}>
        <Grid container spacing={3} >
          <Grid item md={9} >
            <Paper className={classes.paper} >
              <EnhancedTableToolbar deleteItem={deleteItem} numSelected={selected.length} />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={cartItems.length}
                  />
                  <TableBody>
                    {stableSort(cartItems, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.Product.name}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(event) => handleClick(event, row.id)}
                              />
                            </TableCell>
                            <TableCell >
                              <img
                                src={row.Product.img}
                                width={"100px"}
                                height={"100px"}
                              />
                            </TableCell>
                            <TableCell align="left">{row.Product.name}</TableCell>
                            <TableCell align="left">{row.Product.price}</TableCell>

                            <TableCell align="left">
                              <TextField
                                id={row.id}
                                //label="Number"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                defaultValue={row.quantity}
                                onChange={updateQuantity}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                           <TableCell colSpan={6} />
                        </TableRow>
                     )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cartItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom style={{ marginBottom: "20px" }}>
                Cart summary
                  </Typography>
              <Grid container>
                <Grid item md={9}>
                  <Typography variant="body1" gutterBottom>
                    Temporary amount
                        </Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom>
                    {totalCartPrice}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={9}>
                  <Typography variant="body1" gutterBottom>
                    Shipping
                        </Typography>
                </Grid>
                <Grid item md={3}>
                  <Grid container justify="space-around" style={{ paddingBottom: "20px" }}>
                    <Typography variant="body1" gutterBottom>
                      {shippingFee}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Divider />
              <Grid container style={{ padding: "20px 0" }}>
                <Grid item md={9} >
                  <Typography variant="h6" gutterBottom >
                    The total amound of
                        </Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="h6" gutterBottom>
                    {totalCartPrice + shippingFee}
                  </Typography>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" fullWidth onClick={handleOrder}>
                ORDER 
                  </Button>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
