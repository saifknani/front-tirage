import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// User login
export const loginUser = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}


export const logoutUser = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/logout`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}


