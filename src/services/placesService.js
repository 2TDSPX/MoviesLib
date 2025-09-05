import axios from "axios"

export const GOOGLE_API_KEY = "AIzaSyB_cMFQHUkeA3sE5QwoSV92gswCwJ-Wr_I"
export const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

/**
 * 
 * @param lat Latitude utilizada na pesquisa
 * @param lng Longitude utilizada na pesquisa
 * @param keyword Termo de busca (e.: "cinema", "restaurante")
 * @param radius Ratio de busca em metros (padrão: 2000m)
 * @returns Lista de pontos de interesse encontrados nas redondezas dessa localização
 */
export const searchPOIs = async (
    lat: number,
    lng: number,
    keyword: string,
    radius: number = 2000
) => {
    try {
        const response = await axios.get(GOOGLE_API_URL, {
            params: {
                location: `${lat},${lng}`,
                radius,
                keyword,
                key: GOOGLE_API_KEY,
            }
        })
        return response.data.results
    } catch (error) {
        console.log("Erro ao buscar POIs:", error)
        throw error
    }
}
