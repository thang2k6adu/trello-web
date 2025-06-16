let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:3000/v1'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://condemned-jeanie-thang2k6adu-87c8a0dd.koyeb.app/v1'
}
export const API_ROOT = apiRoot
