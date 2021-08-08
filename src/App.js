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

  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState();
  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      // console.log(data);
      setMeanings(data.data);
    } catch (err) {}
  };
  console.log(meanings);
  useEffect(() => {
    dictionaryApi();
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
          <DarkThemeChange
            checked={lightMode}
            onChange={() => {
              setLightMode(!lightMode);
            }}
          />
        </div>
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          lightMode={lightMode}
        />
        {meanings && (
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
