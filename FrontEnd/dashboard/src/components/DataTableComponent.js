import React from 'react';

const DataTable = ({ data, dataType }) => {

    const mappings = {
        Heart: [
          'Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol',
          'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina',
          'Oldpeak', 'ST_Slope', 'HeartDisease'
        ],
        Stroke: [
          'id', 'gender', 'age', 'hypertension', 'heart_disease',
          'ever_married', 'work_type', 'Residence_type', 'avg_glucose_level',
          'bmi', 'smoking_status', 'stroke'
        ],
        Diabetes: [
          'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
          'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Outcome'
        ]
      };
  // Function to get the right header name based on dataType
  const getHeaderName = (index) => {
    const mapping = mappings[dataType];
    return mapping ? mapping[index] : index;
  };

  return (
    <div className="DataTable">
      <table>
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map((key, index) => (
              <th key={key}>{getHeaderName(index)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;