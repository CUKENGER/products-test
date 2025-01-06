import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Product } from "../../types/product"

interface SearchResultsProps {
  results: Product[];
  onClose: () => void;
}

export const SearchResults = ({results, onClose}: SearchResultsProps) => {

  const navigate = useNavigate()

  const handleClick = (productId: number | string) => {
    navigate(`products/${productId}`)
    onClose()
  }

  return (
    <List className="overflow-hidden overflow-y-scroll max-h-72">
      {results.map((product: Product) => (
        <ListItem key={product.id} onClick={() => handleClick(product.id)} className="cursor-pointer hover:bg-gray-100">
          <ListItemAvatar>
            <Avatar src={product.images[0]} alt={product.title}/>
          </ListItemAvatar>
          <ListItemText primary={product.title}/>
        </ListItem>
      ))}
    </List>
  )
}