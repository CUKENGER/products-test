import { AppBar, TextField, Toolbar } from "@mui/material"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { useSearchStore } from "../../store/search-store"

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { setQuery } = useSearchStore()
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    setQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery, setQuery])

  return (
    <AppBar position="static" color="default">
      <Toolbar className="flex items-center justify-center">
        <form onSubmit={handleSearch} className="flex w-[40%]">
          <TextField
            id="search"
            variant="standard"
            size="small"
            label="Search"
            type="search"
            className="flex-grow mr-2 text-white"
            value={searchQuery}
            onChange={handleInput}
          />
        </form>
      </Toolbar>
    </AppBar>
  )
}