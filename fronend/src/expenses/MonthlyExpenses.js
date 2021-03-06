import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate,useParams } from "react-router-dom";
import LineChart from '../common/MonthlyLineChart';
import PieChart from '../common/MonthlyPieChart';
import Balance from '../common/Balance';
import TotalPieChart from '../common/MonthlyTotalPie';
import EarningCard from '../MUI/DashBoard/EarningCard';
import { Grid,Button,Box , Container} from '@mui/material';


function MonthlyExpenses(){

    const {currentUser, setCurrentUser} = useContext(UserContext);

    let {year, month} = useParams()

    const history = useNavigate();

    const [expenses, setExpenses] = useState(null);

    const [spending,setSpending] = useState(null);
    const [saving,setSaving] = useState(null);
    const [totalIncome,setTotalIncome] = useState(null);
    const [TotalExpense,setTotalExpense] = useState(null); 

    const CurrentUser = currentUser.user.username;

    useEffect(function getExpenses(){
        getUserExpenses(CurrentUser);
        getUserMonthlySaving(CurrentUser);
        getUserMonthlySpending(CurrentUser);
        getMonthlyTotalIncome(CurrentUser);
        getMonthlyTotalExpense(CurrentUser);
        console.log(spending,saving)
    },[]);

    async function getUserExpenses(username){
        let result = await LedgerApi.getByMonth(username,year,month);
        setExpenses(result)
    }
    async function getUserMonthlySpending(username){
        let result = await LedgerApi.getExpensesByDay(username,year,month);
        setSpending(result)
    }
    async function getUserMonthlySaving(username){
        let result = await LedgerApi.getIncomesByDay(username,year,month);
        setSaving(result)
    }
    async function getMonthlyTotalIncome(username){
        let result = await LedgerApi.getMonthlyTotalIncome(username,year,month);
        setTotalIncome(result)
    }
    async function getMonthlyTotalExpense(username){
        let result = await LedgerApi.getMonthlyTotalExpense(username,year,month);
        setTotalExpense(result)
    }


    function addExpense (evt){
        evt.preventDefault();
        history(`/expenses/add`);
    }

    function searchMonthly(evt){
        evt.preventDefault();
        
        history(`/expenses/searchmonthly`);
    }

    if(!expenses) return <LoadingSpinner />;
    if(!totalIncome) return <LoadingSpinner />;
    if(!TotalExpense) return <LoadingSpinner />;

    let title = `${year} - ${month} Expenses`;

    return (
        <div>
            <div>
                {expenses.expenses.length
                    ?   <div>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard cardName={"Total Income"} amount={title}/>
                            </Grid>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard cardName={"Total Income"} amount={totalIncome.monthlytotalIncome}/>
                            </Grid>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard cardName={"Total Expense"} amount={TotalExpense.monthlytotalExpense}/>
                            </Grid>
                        </Grid>
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 8
                            }}
                            >
                            <Container maxWidth={false}>
                                <Grid
                                container
                                spacing={3}
                                >
                                
                                <Grid
                                    item
                                    lg={8}
                                    md={12}
                                    xl={9}
                                    xs={12}
                                >
                                    <LineChart username={CurrentUser} year={year} month={month} chartTitle={title}/>

                                </Grid>
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >                                    
                                    <TotalPieChart totalIncome={totalIncome.monthlytotalIncome} totalExpense={TotalExpense.monthlytotalExpense} />
                                </Grid>
   
                                </Grid>
                            </Container>
                            </Box>
                            <PieChart username={CurrentUser} year={year} month={month} chartTitle={'Monthly Category Expenses'}/>
                        {/* <PieChart username={CurrentUser} year={year} month={month} chartTitle={title}/>
                        <LineChart username={CurrentUser} year={year} month={month} chartTitle={title}/>
                        <Balance totalIncome={totalIncome} totalExpense={TotalExpense}/> */}
                        <ExpenseCardList expenses={expenses.expenses}/>
                        </div>
                    :<p className="lead">Sorry, no results were found!</p>
                }
                {/* <button onClick={addExpense}>Add New Expense</button>
                <button onClick={searchMonthly}>Search By Month</button> */}
            </div>
            
        </div>
    )

}

export default MonthlyExpenses;