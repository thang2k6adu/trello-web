export const API_BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE === 'remote'
    ? import.meta.env.VITE_BACKEND_SERVER
    : 'http://localhost:3000/v1/'

export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL
