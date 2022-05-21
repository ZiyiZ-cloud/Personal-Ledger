import React, { useState, useContext } from "react";
import LedgerApi from "../Api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel,Select,MenuItem} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker,MonthPicker,YearPicker,CalendarPicker,LocalizationProvider} from '@mui/lab';


const theme = createTheme();

function ExpenseForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const history = useNavigate();

    const [formData, setFormData] = useState({
      amount: "",
      category: "",
      detail: "",
      date: "",
      username:currentUser.user.username,
    });
    const [formErrors, setFormErrors] = useState([]);
  
    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  
    console.debug(
        "ExpenseForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );
  
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */
  
    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let expenseData = {
        amount: parseFloat(formData.amount).toFixed(2),
        category: formData.category,
        detail: formData.detail,
        date: formData.date,
        username: formData.username
      };
  
      let username = formData.username;
      let newExpense
      if(formData.amount === null||formData.amount === ""){
        setFormErrors([`Amount can not be null`]);
        return;
      }
      if(expenseData.category === ""||expenseData.category ===''){
        setFormErrors([`You must specify a category`]);
        return;
      }
      if(expenseData.date === ""){
        setFormErrors([`You must provide a date`]);
        return;
      }

      try {
        newExpense = await LedgerApi.addExpense(username, expenseData);
      } catch (errors) {
        
      }
  
      history(`/expenses`);
  
    }
  
    /** Handle form data changing */
    function handleChange(evt) {
      const { name, value } = evt.target;
      // if(name === "category" && value ===""){
      //   setFormErrors(['Category is required']);
      // }
      setFormData(f => ({
        ...f,
        [name]: value,
      }));
      setFormErrors([]);
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          {/* <h3>Add New Expense</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group">
                <p>Enter a positive number for Income or a negative number for Expense</p>
                  <label>Amount</label>
                  <input
                      type="number"
                      name="amount"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      requiredTxt ='Amount can not be empty.'
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>        
                  <select name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}>
                    <option>Choose a Category</option> 
                    <option value="housing">Housing</option>
                    <option value="food">Food</option>
                    <option value="fun">Fun</option>
                    <option value="child-expenses">Child Expenses</option>
                    <option value="insurance">Insurance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="utilities">Utilities</option>
                    <option value="personal-care">Personal Care</option>
                    <option value="taxes">Taxes</option>
                    <option value="transportation">Transportation</option>
                    <option value="gifts">Gifts</option>
                    <option value="income">Income</option>
                    <option value="givings">Givings</option>
                    <option value="house-supplies">House Supplies</option>
                    <option value="consumer-debt">Consumer Debt</option>
                    <option value="clothing">Clothing</option>
                    <option value="savings">Savings</option>
                    <option value="pets">Pets</option>
                    <option value="services-membership">Services Membership</option>
                    <option value="others">Others</option>                    
                  </select>
       
                </div>
                <div className="form-group">
                  <label>Detail</label>
                  <input
                      name="detail"
                      className="form-control"
                      value={formData.detail}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                  />
                </div>
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                  Add Transaction
                </button>
              </form>
            </div>
          </div> */}
          <ThemeProvider theme={theme}>
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderColor: 'white',
          }}
        >
          <Typography component="h1" variant="h5">
            Add New Expense
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <p>Enter a positive number for Income or a negative number for Expense</p>
                <TextField
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  id="amount"
                  autoComplete="new-username"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="categorylabel">Category</InputLabel>
                <Select
                  label="category"
                  id="category"
                  fullWidth
                  value={formData.category}
                  label="Category"
                  required
                  name = 'category'

                  onChange={handleChange}
                >
                  <MenuItem value="housing">Housing</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="fun">Fun</MenuItem>
                  <MenuItem value="child-expenses">Child Expenses</MenuItem>
                  <MenuItem value="insurance">Insurance</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="utilities">Utilities</MenuItem>
                  <MenuItem value="personal-care">Personal Care</MenuItem>
                  <MenuItem value="taxes">Taxes</MenuItem>
                  <MenuItem value="transportation">Transportation</MenuItem>
                  <MenuItem value="gifts">Gifts</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="givings">Givings</MenuItem>
                  <MenuItem value="house-supplies">House Supplies</MenuItem>
                  <MenuItem value="consumer-debt">Consumer Debt</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                  <MenuItem value="pets">Pets</MenuItem>
                  <MenuItem value="services-membership">Services Membership</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="detail"
                  label="Detail"
                  name="detail"
                  autoComplete="detail"
                  value={formData.detail}
                      onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                      fullWidth
                      id='date'
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
              {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add New Expense
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </div>
    );
  }
  
  export default ExpenseForm;
  