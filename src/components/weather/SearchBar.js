import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "../../css/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(city);
    }
  };

  return (
   
    <div className='search'>
    <Autocomplete
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ sx: { borderRadius: 30, height:50} }}
          label="Search City"
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleSearch}
          fullWidth
        />
      )}
    /></div>
  );
};

export default SearchBar;
