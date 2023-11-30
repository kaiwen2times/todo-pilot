import React, { useState } from 'react';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  const [todoList, setTodoList] = useState([]);
  const handleAdd = () => {
    console.log("add");
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
        </p>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default Newtab;
