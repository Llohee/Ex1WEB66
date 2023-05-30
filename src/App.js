import React from "react";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import "./style.css";
// import TodoList from "./Todolist";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <TodoListHeader />
        {/* <TodoList /> */}
        <Form />
      </div>
      <Footer />
    </div>
  );
};

export default App;