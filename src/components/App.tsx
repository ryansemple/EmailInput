import MainContent from "./MainContent";
import Header from "./Header";
import React from "react";

/**
 * The top level component of the App.
 */
const App = () => (
  <>
    <Header title={"Email input challenge"} />
    <main className="Main flex horizontal_center_flex">
      <MainContent />
    </main>
  </>
)

export default App;