import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiContext } from './ApiContext.js';

function Store({ children }) {
    const [Heart_Data, setData] = useState([]);
    const [Stroke_Data, setStrokeData] = useState([]);
    const [Diabetes_Data, setDiabetesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/heart');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/stroke');
                setStrokeData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }
    , []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/diabetes');
                setDiabetesData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }
    , []);

    // The value provided to the context provider should be an object if you plan to pass more than just data
    return (
        <ApiContext.Provider value={{ Heart_Data, Stroke_Data, Diabetes_Data }}>
            {children}
        </ApiContext.Provider>
    );
}

export default Store;
