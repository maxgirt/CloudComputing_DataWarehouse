import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function StrokeComponent() {
    const { Stroke_Data } = useContext(ApiContext);

    // Initialize counters
    let sexCategories = { 'Male': [0, 0], 'Female': [0, 0], 'Other': [0, 0] }; // [with stroke, without stroke]
    let ageGroups = { '<30': [0, 0], '30-50': [0, 0], '51-70': [0, 0], '>70': [0, 0] };
    let heartDiseaseCategories = { 'With Heart Disease': [0, 0], 'Without Heart Disease': [0, 0] };
    let smokingStatusCategories = { 'formerly smoked': [0, 0], 'never smoked': [0, 0], 'smokes': [0, 0], 'Unknown': [0, 0] };

    // Helper function to categorize age
    const categorizeAge = (age) => {
        if (age < 30) return '<30';
        if (age <= 50) return '30-50';
        if (age <= 70) return '51-70';
        return '>70';
    };

    // Process Stroke Data
    Stroke_Data.forEach(item => {
        const ageGroup = categorizeAge(item[2]);
        const sex = item[1];
        const heartDiseaseStatus = item[4] === 1 ? 'With Heart Disease' : 'Without Heart Disease';
        const smokingStatus = item[10];
        const hadStroke = item[11] === 1; 

        // Increment counts
        sexCategories[sex][hadStroke ? 0 : 1]++;
        ageGroups[ageGroup][hadStroke ? 0 : 1]++;
        heartDiseaseCategories[heartDiseaseStatus][hadStroke ? 0 : 1]++;
        smokingStatusCategories[smokingStatus][hadStroke ? 0 : 1]++;
    });

    // Function to generate chart data
    const generateChartData = (categories) => ({
        labels: Object.keys(categories),
        datasets: [
            {
                label: 'Had Stroke',
                data: Object.values(categories).map(counts => counts[0]),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'No Stroke',
                data: Object.values(categories).map(counts => counts[1]),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    });

    const chartOptions = {
        scales: {
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { position: 'top' }
        }
    };

    return (
        <div className="Charts-container">
            <div className="Chart">
                <h2>Sex vs Stroke</h2>
                <Bar data={generateChartData(sexCategories)} options={chartOptions} />
            </div>
            
            <div className="Chart">
                <h2>Age vs Stroke</h2>
                <Bar data={generateChartData(ageGroups)} options={chartOptions} />
            </div>

            <div className="Chart">
                <h2>Heart Disease vs Stroke</h2>
                <Bar data={generateChartData(heartDiseaseCategories)} options={chartOptions} />
            </div>

            <div className="Chart">
                <h2>Smoking Status vs Stroke</h2>
                <Bar data={generateChartData(smokingStatusCategories)} options={chartOptions} />
            </div>
        </div>
    );
}

export default StrokeComponent;
