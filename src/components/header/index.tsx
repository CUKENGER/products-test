import { AppBar, Button, Paper, TextField, Toolbar } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useProductStore } from '../../store/product-store';
import { SearchResults } from '../search-results';
import { useShowResults } from './hooks/useShowResults';

export const Header = () => {
  const { products } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {setIsShowResults, resultsRef, isShowResults} = useShowResults()

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsShowResults(e.target.value !== '');
  };

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <AppBar position="static" color="default">
      <Toolbar className="flex items-center justify-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
        <div className="flex justify-center w-full">
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
        </div>
      </Toolbar>
      {isShowResults && searchResults.length > 0 && (
        <Paper
          ref={resultsRef}
          className="absolute w-full md:w-[50%] mt-2 left-1/2 transform -translate-x-1/2 top-12 md:top-14 z-10"
        >
          <SearchResults
            results={searchResults}
            onClose={() => setIsShowResults(false)}
          />
        </Paper>
      )}
    </AppBar>
  );
};
