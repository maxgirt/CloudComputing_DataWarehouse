import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function DiabetesComponent() {
    const { Diabetes_Data } = useContext(ApiContext);

    // Initialize counters for categories
    let ageCategories = {}; // Age vs Outcome
    let bmiCategories = {}; // BMI vs Outcome
    let bpCategories = {}; // Blood Pressure vs Outcome
    let glucoseCategories = {}; // Glucose vs Outcome

    // Helper functions to categorize data
    const categorizeByRange = (value, rangeSize, maxLimit) => {
        let category = Math.floor(value / rangeSize) * rangeSize;
        category = category < maxLimit ? category : maxLimit;
        return category.toString();
    };

    // Process Diabetes Data
    Diabetes_Data.forEach(item => {
        const age = categorizeByRange(item[7], 10, 80);
        const bmi = categorizeByRange(item[5], 5, 50);
        const bloodPressure = categorizeByRange(item[2], 10, 140);
        const glucose = categorizeByRange(item[1], 10, 200);
        const outcome = item[8] === 1 ? 'Yes' : 'No';

        // Update the categorization logic here
        if (!ageCategories[age]) ageCategories[age] = { 'Yes': 0, 'No': 0 };
        ageCategories[age][outcome]++;

        if (!bmiCategories[bmi]) bmiCategories[bmi] = { 'Yes': 0, 'No': 0 };
        bmiCategories[bmi][outcome]++;

        if (!bpCategories[bloodPressure]) bpCategories[bloodPressure] = { 'Yes': 0, 'No': 0 };
        bpCategories[bloodPressure][outcome]++;

        if (!glucoseCategories[glucose]) glucoseCategories[glucose] = { 'Yes': 0, 'No': 0 };
        glucoseCategories[glucose][outcome]++;
    });
    // Function to generate chart data
    const generateChartData = (categories) => {
        const sortedLabels = Object.keys(categories).map(Number).sort((a, b) => a - b);
        return {
            labels: sortedLabels.map(String),
            datasets: [
                {
                    label: 'Diabetes Yes',
                    data: sortedLabels.map(label => categories[label]['Yes']),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                },
                {
                    label: 'Diabetes No',
                    data: sortedLabels.map(label => categories[label]['No']),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                }
            ]
        };
    };
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
            {/* Age vs Outcome Chart */}
            <div className="Chart">
                <h2>Age vs Diabetes Outcome</h2>
                <Bar data={generateChartData(ageCategories)} options={chartOptions} />
            </div>

            {/* BMI vs Outcome Chart */}
            <div className="Chart">
                <h2>BMI vs Diabetes Outcome</h2>
                <Bar data={generateChartData(bmiCategories)} options={chartOptions} />
            </div>

            {/* Blood Pressure vs Outcome Chart */}
            <div className="Chart">
                <h2>Blood Pressure vs Diabetes Outcome</h2>
                <Bar data={generateChartData(bpCategories)} options={chartOptions} />
            </div>

            {/* Glucose vs Outcome Chart */}
            <div className="Chart">
                <h2>Glucose vs Diabetes Outcome</h2>
                <Bar data={generateChartData(glucoseCategories)} options={chartOptions} />
            </div>
        </div>
    );
}

export default DiabetesComponent;
