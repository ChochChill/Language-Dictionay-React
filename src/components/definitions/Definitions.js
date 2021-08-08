import React from "react";
import "./Definitions.css";
function Definitions({ word, category, meanings, lightMode }) {
  return (
    <div className="meanings">
      {/* renders audio element only if meanings[0] is available, and inside which word and category is english(api has english audio only) is available */}
      {meanings[0] && word && category === "en" && (
        <audio
          style={{ backgroundColor: "#fff", borderRadius: 10, margin:"10px"}}
          // checking if meaning[0] has phonetics, then checks for audio so as to avoid undefined err
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          controls
        >
          Your browser does not support the audio element.
        </audio>
      )}
      {/* if word is not typed it will display the message and word is typed the elements are rendered */}
      {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        // mapping through meanings props from App.js -->mean(array of different words meanings) -->item(array of definitions for a word) --->def(particular definition,example,synonyms etc)
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
                style={{ backgroundColor: lightMode ? "#3b5360": "white", color: lightMode ? "white" : "black" }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {/* renders example only if there is example available in def */}
                {def.example && (
                  <span>
                    <b>Example : </b>
                    {def.example}
                  </span>
                )}
                {/* renders synonyms only if there is synonyms available in def */}
                {def.synonyms && (
                  <span>
                    <b>Synonyms : </b>
                    {def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
}

export default Definitions;
