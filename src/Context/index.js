import { useContext, createContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Gurugram');
    const [thisLocation, setLocation] = useState('');

    // Fetch API
    const fetchWeather = useCallback(async () => {
        const apiKey = 'DH829HVXPXA3CAG75EK6ZL4W8';  // Use your actual API key here
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${apiKey}`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            const thisData = response.data;
            setLocation(thisData.address);
            setValues(thisData.days);
            setWeather(thisData.currentConditions);
        } catch (e) {
            console.error(e);
            alert('This place does not exist or there was an issue with the API request');
        }
    }, [place]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
