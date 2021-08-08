import { Container, Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Definitions from "./components/definitions/Definitions";
import { grey } from "@material-ui/core/colors";
function App() {
  //material ui switch component used for dark theme switching
  const DarkThemeChange = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  //States used in the app
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState();

  //Api call using axios and storing the returned data
  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      // console.log(data);
      setMeanings(data.data);
    } catch (err) {}
  };
  // console.log(meanings);
  //the code inside the useEffect will run when dependencies i.e category and word in line 48 value changes
  useEffect(() => {
    dictionaryApi();
    //below comment is for not getting error in build time for not important warnings from eslint
     // eslint-disable-next-line
  }, [category, word]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.7s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          {/* dark theme switch component */}
          <DarkThemeChange
            checked={lightMode}
            onChange={() => {
              setLightMode(!lightMode);
            }}
          />
        </div>
        {/* component containing Title and text fields search and language select  */}
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          lightMode={lightMode}
        />
        {/* if meanings has value then the Definitions component is rendered */}
        {meanings && (
          // Component which displays the data returned by the Api phonetics,definitions,examples,synonyms
          <Definitions
            word={word}
            category={category}
            meanings={meanings}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
