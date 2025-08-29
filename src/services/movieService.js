import axios from "axios"

const API_URL = "https://movies-api.eric-brito.workers.dev/movies";
const TRAILER_URL = "https://movies-api.eric-brito.workers.dev/trailer";

export const getMovies = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

// Método para excluir um filme
export const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// Método para criar um novo filme
export const addMovie = async (movie) => {
  const response = await axios.post(API_URL, movie)
  return response.data
}

// Método para atualizar um filme
export const updateMovie = async (id, movie) => {
  const response = await axios.put(`${API_URL}/${id}`, movie)
  return response.data
}

// Método para recuperar o trailer de um filme
export const getTrailerUrl = async (title) => {
  const response = await axios.get(TRAILER_URL, {
    params: { title }
  })
  return response.data.trailerUrl
}
