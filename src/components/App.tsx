import MainContent from "./MainContent";
import Header from "./Header";
import React from "react";

const App = () => (
  <>
    <Header title={"📧 Email input challenge"} />
    <main className="flex horizontal_center">
      <MainContent />
    </main>
  </>
)

export default App;