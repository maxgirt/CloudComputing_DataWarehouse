import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext.js';
import { Bar, Pie, Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

function ChartComponent() {
    const { Heart_Data } = useContext(ApiContext);

    // Initialize counters for various categories
    let sexCategories = { 'M': { withDisease: 0, withoutDisease: 0 }, 'F': { withDisease: 0, withoutDisease: 0 } };
    let ageGroups = { '<30': 0, '30-40': 0, '41-50': 0, '51-60': 0, '61-70': 0, '>70': 0 };
    let chestPainTypes = { 'TA': { withDisease: 0, withoutDisease: 0 }, 'ATA': { withDisease: 0, withoutDisease: 0 }, 'NAP': { withDisease: 0, withoutDisease: 0 }, 'ASY': { withDisease: 0, withoutDisease: 0 } };


    
    // Helper function to categorize age
    const categorizeAge = (age) => {
        if (age < 30) return '<30';
        if (age <= 40) return '30-40';
        if (age <= 50) return '41-50';
        if (age <= 60) return '51-60';
        if (age <= 70) return '61-70';
        return '>70';
    };

    let maxHRCategories = {
        '<100': { withDisease: 0, withoutDisease: 0 },
        '100-120': { withDisease: 0, withoutDisease: 0 },
        '121-140': { withDisease: 0, withoutDisease: 0 },
        '141-160': { withDisease: 0, withoutDisease: 0 },
        '161-180': { withDisease: 0, withoutDisease: 0 },
        '181-200': { withDisease: 0, withoutDisease: 0 },
        '>200': { withDisease: 0, withoutDisease: 0 }
    };

    // Helper function to categorize MaxHR
    const categorizeMaxHR = (maxHR) => {
        if (maxHR < 100) return '<100';
        if (maxHR <= 120) return '100-120';
        if (maxHR <= 140) return '121-140';
        if (maxHR <= 160) return '141-160';
        if (maxHR <= 180) return '161-180';
        if (maxHR <= 200) return '181-200';
        return '>200';
    };


    Heart_Data.forEach(item => {
        const ageGroup = categorizeAge(item[0]);
        const sex = item[1];
        const chestPainType = item[2];
        const heartDisease = item[11];
        const maxHRCategory = categorizeMaxHR(item[7]);

        // Count sex categories
        if (heartDisease === 1) {
            sexCategories[sex].withDisease++;
        } else {
            sexCategories[sex].withoutDisease++;
        }

        // Count age groups
        ageGroups[ageGroup]++;

        // Count chest pain types
        if (heartDisease === 1) {
            chestPainTypes[chestPainType].withDisease++;
        } else {
            chestPainTypes[chestPainType].withoutDisease++;
        }

        // Count MaxHR categories
        if (heartDisease === 1) {
            maxHRCategories[maxHRCategory].withDisease++;
        } else {
            maxHRCategories[maxHRCategory].withoutDisease++;
        }
    });

    // Preparing data for the bar chart
    const barChartData = {
        labels: ['Males', 'Females'],
        datasets: [
            {
                label: 'With Heart Disease',
                data: [sexCategories['M'].withDisease, sexCategories['F'].withDisease],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Without Heart Disease',
                data: [sexCategories['M'].withoutDisease, sexCategories['F'].withoutDisease],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    };

    // Preparing data for the pie chart
    const pieChartData = {
        labels: Object.keys(ageGroups),
        datasets: [{
            data: Object.values(ageGroups),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#C9CBD4',
                '#FF9F40'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#ACACAC',
                '#FF9F40'
            ]
        }]
    };


    const chestPainChartData = {
        labels: Object.keys(chestPainTypes),
        datasets: [
            {
                label: 'With Heart Disease',
                data: Object.values(chestPainTypes).map(type => type.withDisease),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Without Heart Disease',
                data: Object.values(chestPainTypes).map(type => type.withoutDisease),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    };

    const maxHRChartData = {
        labels: Object.keys(maxHRCategories),
        datasets: [
            {
                label: 'With Heart Disease',
                data: Object.values(maxHRCategories).map(category => category.withDisease),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Without Heart Disease',
                data: Object.values(maxHRCategories).map(category => category.withoutDisease),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    };

    const commonOptions = {
        scales: {
            x: { stacked: false },
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { position: 'top' }
        }
    };



    return (
        <div className="Charts-container">
            <div className="Chart Chart_Sex">
                <h2>Heart Disease Prevalence by Sex</h2>
                <Bar data={barChartData} options={commonOptions} />
            </div>
            <div className="Chart Chart_Age">
                <h2>Age Distribution</h2>
                <Pie data={pieChartData} />
            </div>
            <div className="Chart Chart_ChestPain">
                <h2>Chest Pain Type and Heart Disease Correlation</h2>
                <Bar data={chestPainChartData} options={commonOptions} />
            </div>
            <div className="Chart Chart_MaxHR">
                <h2>Max Heart Rate and Heart Disease Correlation</h2>
                <Bar data={maxHRChartData} options={{ 
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true, beginAtZero: true }
                    },
                    plugins: {
                        legend: { position: 'top' }
                    }
                }} />
            </div>
        </div>
    );
    }

export default ChartComponent;
