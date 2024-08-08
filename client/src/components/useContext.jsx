import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { createContext } from "react";
import App from "../App";
import MyFile from "./MyFile";
import Bank from './Bank'
export const ThemeContext = createContext('dark');

const MyTheme = (props) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h5>Hi this is from context theme</h5>
        <Button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
          variant="contained"
        >
          {theme}

        </Button>
       <MyFile/>
  
      </div>
    </ThemeContext.Provider>
  );
};



export default MyTheme;
