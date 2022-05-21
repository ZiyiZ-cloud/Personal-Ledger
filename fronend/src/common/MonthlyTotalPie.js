import React, { Component,useEffect,useState } from 'react'
import LedgerApi from '../Api/api';
import LoadingSpinner from './LoadingSpinner';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';



function TotalPieChart({totalIncome, totalExpense}) {

    let data = {
        labels: ["Income", "Expense"],
        datasets: [{
            data: [totalIncome, totalExpense],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
          }]
      }

    let incomePercent = (totalIncome/(totalIncome+totalExpense)*100).toFixed(2)+"%";
    let expensePercent = (totalExpense/(totalIncome+totalExpense)*100).toFixed(2)+"%";

    return (
      <div className="container mt-5">
            <Pie 
                    data={data}
            />
            Income Percentage : {incomePercent}
            Expense Percentage : {expensePercent}

      </div>
    )
}

export default TotalPieChart;