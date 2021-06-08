/**
 * Provide the Backend Server URL here
 */

let url = ''
if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV=== 'test') {
    url = 'http://localhost:8000/api'
  
  }
  
  if(process.env.NODE_ENV === 'production') {
    url = 'http://localhost:8000/api'
  }

export default url