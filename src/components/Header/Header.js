import React from "react";
import "./Header.css";
import TextField from "@material-ui/core/TextField";
import { createTheme, MenuItem, ThemeProvider } from "@material-ui/core";
import categories from "../../data/category";
const Header = (props) => {
  // material ui theme def with lightmode(true/false) and accordingly change colors
  const darkTheme = createTheme({
    palette: {
      type: props.lightMode ? "light" : "dark",
      primary: {
        main: props.lightMode ? "#000" : "#fff",
      },
    },
  });

  //function to clear search text field and set language text field when a new language is selected
  const handleChange = (language) => {
    props.setCategory(language);
    props.setWord("");
  };

  return (
    <div className="header">
      <span className="title">{props.word ? props.word : "Dict-ionary"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          {/* text field for search bar for entering word */}
          <TextField
            className="search"
            label="Enter a Word"
            // changing state of word when search bar is used
            onChange={(e) => props.setWord(e.target.value)}
            value={props.word}
          />
          {/* selecting language textfield*/}
          <TextField
            select
            className="select"
            label="Language"
            value={props.category}
            // on selecting a new language the function is called
            onChange={(e) => handleChange(e.target.value)}
          >
            {/* mapping through the json categories from src/data/category.js and creating menu for selecting languages*/}
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
