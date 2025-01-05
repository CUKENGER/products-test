import { Link } from "react-router-dom"


export const NotFound = () => {
  return (
    <div>
      Такой страницы не существует
      <Link
        to={'/'}
      >
        На главную
      </Link>
    </div>
  )
}