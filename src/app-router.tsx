import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { Header } from './components/header'

function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </>
  )
}

export default AppRouter
