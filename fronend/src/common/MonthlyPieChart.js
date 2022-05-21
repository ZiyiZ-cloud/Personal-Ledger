import React, { Component,useEffect,useState } from 'react'
import LedgerApi from '../Api/api';
import LoadingSpinner from './LoadingSpinner';
import { Pie ,Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';



function PieChart({username,year,month,chartTitle}) {

  const [categoryIncome,setCategoryIncome] = useState(null);
  const [categoryExpense,setCategoryExpense] = useState(null);

  async function getCategoryData(username,year,month){
    setCategoryIncome(await LedgerApi.getMonthlyCategoryIncome(username,year,month));
    setCategoryExpense( await LedgerApi.getMonthlyCategoryExpense(username,year,month));
  }

    useEffect(function getcategoryData(){
      getCategoryData(username,year,month);
      console.log(categoryExpense,categoryIncome);
    },[])

    if(!categoryExpense) return <LoadingSpinner />;
    if(!categoryIncome) return <LoadingSpinner />;

    let expensedata = {
      labels: categoryExpense.categoryExpense.map(x=>x[0]),
      datasets: [
        {
          id: 1,
          label: 'Expnese',
          data: categoryExpense.categoryExpense.map(x=>x[1]),
          borderColor: '',
          backgroundColor: 'orange',
        },
        {
            id: 2,
            label: 'Income',
            data: categoryIncome.categoryIncome.map(x=>x[1]),
            borderColor: "",
            backgroundColor:'#8a2be2',
            //  ["#0000ff", "#0000e5",
            //     "#0000cc",
            //     "#0000b2",
            //     "#000099",
            //     "#00007f",
            //     "#000066",
            //     "#00004c",
            //     "#000033",
            //     "#000019",
            //     "#1919ff",
            //     "#3232ff",
            //     "#4c4cff",
            //     "#6666ff",
            //     "#7f7fff",
            //     "#9999ff",
            //     "#b2b2ff",
            //     "#ccccff",
            //     "#e5e5ff",
            //     ],
          },
      ],
    }

    let incomedata = {
        labels: categoryIncome.categoryIncome.map(x=>x[0]),
        datasets: [
          {
            id: 1,
            label: 'Expnese',
            data: categoryIncome.categoryIncome.map(x=>x[1]),
            borderColor: "",
            backgroundColor: 
            ["#0000ff", "#0000e5",
                "#0000cc",
                "#0000b2",
                "#000099",
                "#00007f",
                "#000066",
                "#00004c",
                "#000033",
                "#000019",
                "#1919ff",
                "#3232ff",
                "#4c4cff",
                "#6666ff",
                "#7f7fff",
                "#9999ff",
                "#b2b2ff",
                "#ccccff",
                "#e5e5ff",
                ],
          },
        ],
      }

      let expenseTitle = `${year} - ${month} Expense`;
      let incomeTitle = `${year} - ${month} Income`;

    return (
      <div className="container mt-5">
      {/* <Grid container rowSpacing={1}>
      <Grid item xs={6}>
        <h2 >{expenseTitle}</h2>
        <div style={{height:"500px", width:"500px"}}>
        <Bar
            style={{
                canvasHeight:"500px",
                canvasWidth:"500px",
            }}
          datasetIdKey='id'
          data={expensedata} 
          options={ {
            plugins: {
                responsive: true,
                legend: {
                    color: 'black',                
                    position: 'left',
                    labels: {
                            generateLabels: (chart) => {
                                const datasets = chart.data.datasets;
                                return datasets[0].data.map((data, i) => ({
                                text: `${chart.data.labels[i]} ${data}`,
                                fillStyle: datasets[0].backgroundColor[i],
                                }))
                    },
                } ,
            }
        }}}/>
        </div></Grid>
        <Grid item xs={6}>
        <h2>{incomeTitle}</h2>
        <div style={{height:"500px", width:"500px"}}>
        <Bar
          datasetIdKey='id'
          data={incomedata }
          options={ {
            plugins: {
                responsive: true,
                legend: {
                    color: 'black',                
                    position: 'right',
                    labels: {
                            generateLabels: (chart) => {
                                const datasets = chart.data.datasets;
                                return datasets[0].data.map((data, i) => ({
                                text: `${chart.data.labels[i]} ${data}`,
                                fillStyle: datasets[0].backgroundColor[i],
                                }))
                    },
                } ,
            }
        }}}
        /></div></Grid></Grid> */}
        {chartTitle}
        <Bar
            style={{
                canvasHeight:"500px",
                canvasWidth:"500px",
            }}
          datasetIdKey='id'
          data={expensedata} 
          options={ {
            plugins: {
            //     responsive: true,
            //     legend: {
            //         color: 'black',                
            //         position: 'left',
            //         labels: {
            //                 generateLabels: (chart) => {
            //                     const datasets = chart.data.datasets;
            //                     return datasets[0].data.map((data, i) => ({
            //                     text: `${chart.data.labels[i]} ${data}`,
            //                     fillStyle: datasets[0].backgroundColor[i],
            //                     }))
            //         },
            //     } ,
            // }
        }}}/>
                {/* <Bar
          datasetIdKey='id'
          data={incomedata }
          options={ {
            plugins: {
                responsive: true,
                legend: {
                    color: 'black',                
                    position: 'right',
                    labels: {
                            generateLabels: (chart) => {
                                const datasets = chart.data.datasets;
                                return datasets[0].data.map((data, i) => ({
                                text: `${chart.data.labels[i]} ${data}`,
                                fillStyle: datasets[0].backgroundColor[i],
                                }))
                    },
                } ,
            }
        }}}
        /> */}
      </div>
    )
}

export default PieChart;