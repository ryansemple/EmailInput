import MainContent from "./MainContent";
import Header from "./Header";
import React from "react";

const App = () => (
  <>
    <Header title={"Email input challenge"} />
    <main className="Main flex horizontal_center_flex">
      <MainContent />
    </main>
  </>
)

export default App;