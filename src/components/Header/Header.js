import React from "react";
import "./Header.css";
import TextField from "@material-ui/core/TextField";
import {
  createTheme,
  MenuItem,
  ThemeProvider,
} from "@material-ui/core";
import categories from "../../data/category";
const Header = (props) => {
  const darkTheme = createTheme({
    palette: {
      type: props.lightMode ? "light" : "dark",
      primary: {
        main: props.lightMode ? "#000":"#fff",
      },
    },
  });
  const handleChange = (language) =>{
    props.setCategory(language);
    props.setWord("")
  }

  return (
    <div className="header">
      <span className="title">{props.word ? props.word : "Word Hunt"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField id="standard-basic" className="search" label="Standard" 
            onChange={(e) => props.setWord(e.target.value)}
            value={props.word} />
          <TextField
            select
            className="select"
            id="standard-basic"
            label="Language"
            value={props.category}
            onChange={(e) => handleChange(e.target.value)}
          >
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
