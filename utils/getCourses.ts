// utils/getCourses.ts

import axios from 'axios';

export const getCourses = async () => {
    try {
        const response = await axios.get(`https://www.sstacademia.com/api/cursos`);
        return response.data.curso; // Asegúrate de que este campo coincide con lo que devuelve tu API
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        return []; // Retorna un array vacío en caso de error
    }
};
