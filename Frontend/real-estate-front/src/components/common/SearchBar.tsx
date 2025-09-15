import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
  fullWidth?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search properties...",
  onSearch,
  initialValue = "",
  fullWidth = true,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 1.5, md: 2 },
        width: fullWidth ? "100%" : "auto",
        borderRadius: 2,
        overflow: "visible",
      }}
    >
      <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 } }}>
        <TextField
          fullWidth
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              py: { xs: 1.2, md: 1 },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  color="action"
                  sx={{ fontSize: { xs: 20, md: 24 } }}
                />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  sx={{
                    p: { xs: 0.5, md: 1 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: 18, md: 20 },
                    },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  );
};
