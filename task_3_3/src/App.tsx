import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Form />
        </div>
      </main>
    </>
  );
}

export default App;
