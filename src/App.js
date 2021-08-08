import { Container } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Definitions from "./components/definitions/Definitions";
function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
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
      style={{ height: "100vh", backgroundColor: "#282c34", color: "white" }}
    >
      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
        />
        {meanings && (<Definitions
          word={word}
          category={category}
          meanings={meanings}
        />)}
      </Container>
    </div>
  );
}

export default App;
