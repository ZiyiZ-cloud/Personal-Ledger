import React,{useContext} from 'react';
import ExpenseCard from './ExpenseCard';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
  } from '@mui/material';
  import UserContext from '../auth/UserContext';
  import LedgerApi from '../Api/api';


function ExpenseCardList({expenses}){
    const {currentUser, setCurrentUser} = useContext(UserContext);

    console.debug("expenses","expenses=",expenses);

    return (
        <div>
            {/* {expenses.map(expense =>(
                <div>
                <ExpenseCard 
                    key ={expense.id}
                    id={expense.id}
                    amount={expense.amount}
                    category={expense.category}
                    detail={expense.detail}
                    date={expense.date}
                /> */}

                <Card >
                    <CardHeader title="Expense History" />
                    <Button style={{float: 'right'}} href={`/expenses/add`}>Add New Expense</Button>
                    {/* <PerfectScrollbar> */}
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>
                                Category
                            </TableCell>
                            <TableCell>
                                Amount($)
                            </TableCell>
                            <TableCell >
                                Detail
                            </TableCell>
                            <TableCell>
                                Date
                            </TableCell>
                            <TableCell>
                                Edit
                            </TableCell>
                            <TableCell>
                                Delete
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense) => (
                            <TableRow
                                hover
                                key={expense.id}
                            >
                                <TableCell>
                                {expense.category.toUpperCase()}
                                </TableCell>
                                <TableCell>
                                {expense.amount}
                                </TableCell>
                                <TableCell>
                                {expense.detail}
                                </TableCell>
                                <TableCell>
                                {expense.date.substring(0,10)}
                                </TableCell>
                                <TableCell>
                                <Button href={`/expenses/${currentUser.user.username}/${expense.id}`}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                <Button onClick={async function deleteExpense(evt){
                                                evt.preventDefault();
                                                await LedgerApi.deleteExpense(currentUser.user.username,expense.id);
                                                window.location.reload();
                                            }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </Box>
                </Card>
                {/* </div>
            ))} */}

        </div>
    )

}

export default ExpenseCardList;