import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) setSearchResults(data.suggestions || []);
      else setSearchResults([]);
    } catch {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => fetchSuggestions(searchQuery), 250);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  return (
    <Box sx={{ flex: 1, maxWidth: 480 }}>
      <Autocomplete
        freeSolo
        options={searchResults}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
        inputValue={searchQuery}
        onInputChange={(event, value) => setSearchQuery(value)}
        onChange={(event, value) => {
          if (value && value.id) {
            navigate(`/product/${value.id}`);
            setSearchQuery('');
            setSearchResults([]);
          }
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', py: 1 }}>
            <Avatar
              src={option.image}
              alt={option.name}
              variant="rounded"
              sx={{ width: 44, height: 44, bgcolor: '#f1f5f9' }}
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {option.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                ${option.new_price} &bull; {option.category}
              </Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search products..."
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(15,23,42,0.04)',
                borderRadius: '50px',
                '& fieldset': { borderColor: 'rgba(15,23,42,0.1)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused': { bgcolor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
