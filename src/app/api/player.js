import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// User login
export const addplayer = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/player/registerPlayer`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}
export const gettListPlayers = async (data)  =>{

    try {
        const response = await axios.get(`${API_BASE_URL}/api/player/players`, {
          params: data,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return response.data
      } catch (error) {
        throw error
      }
  
    }

      export const getAllPlayers = async (data)  =>{

        try {
            const response = await axios.get(`${API_BASE_URL}/api/player/Allplayers`, {
              params: data,
              headers: {
                'Content-Type': 'application/json'
              }
            })
            return response.data
          } catch (error) {
            throw error
          }


        
      
} 

export const importExcel = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/player/importExcel`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getRandomPlayer = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/player/getRandomPlayer`,  {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}