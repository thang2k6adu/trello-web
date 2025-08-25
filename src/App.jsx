import { Routes, Route } from 'react-router-dom'
import { routes } from '~/routes'

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default App
