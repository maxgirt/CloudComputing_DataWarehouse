import './App.css';
import { ApiContext } from './context/ApiContext.js';
import { useContext, useState } from 'react';
import ChartComponent from './components/ChartComponent.js';
import DropDownComponent from './components/DropDownComponenet.js';
import StrokeComponent from './components/StrokeComponenet.js';
import DiabetesComponent from './components/DiabetesComponenet.js';
import ButtonComponent from './components/ButtonComponent.js';
import DataTableComponeent from './components/DataTableComponent.js';


function App() {
  const [currentHealth, setCurrentHealth] = useState("Heart");
  const [title, setTitle] = useState("Heart Failure Prediction Dataset");
  const [description, setDescription] = useState("This dataset contains medical records of 918 patients");
  const [isTable, setIsTable] = useState(true);
  const [dataType, setDataType] = useState("Heart");

  const { Heart_Data, Stroke_Data, Diabetes_Data } = useContext(ApiContext);

  const handleHealthChange = (health) => {
    setCurrentHealth(health);

    if (health === 'Heart') {
      setTitle("Heart Failure Prediction Dataset");
      setDescription("This dataset contains medical records of 918 patients");
      setDataType("Heart");
    } else if (health === 'Stroke') {
      setTitle("Stroke Prediction Dataset");
      setDescription("This dataset contains medical records of 5110 patients");
      setDataType("Stroke");
    } else if (health === 'Diabetes') {
      setTitle("Diabetes Prediction Dataset");
      setDescription("This dataset contains medical records of 768 female patients");
      setDataType("Diabetes");
    }
  };  console.log(Heart_Data);

  return (
    <div className="App">
     <DropDownComponent onHealthChange={handleHealthChange} />
      <ButtonComponent isTable = {isTable} setIsTable = {setIsTable} />
      <header className="App-header">
        <p>
          Dash Board - By Maximilian Girt
          <br></br>
          {title}
          <br></br>
          {description}
        </p>
       
      </header>
      {isTable ? (
  currentHealth === "Heart" ? <ChartComponent /> : currentHealth === "Stroke" ? <StrokeComponent /> : <DiabetesComponent />
) : (
  currentHealth === "Heart" ? <DataTableComponeent data={Heart_Data} dataType = {dataType} /> : currentHealth === "Stroke" ? <DataTableComponeent data={Stroke_Data} dataType = {dataType} /> : <DataTableComponeent data={Diabetes_Data} dataType = {dataType} />
)}    </div>
  );
}

export default App;


