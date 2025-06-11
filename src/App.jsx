import { useState } from "react";

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [newOption, setNewOption] = useState("");

  function handleAddOption(event) {
    event.preventDefault();
    if (newOption.trim() === "") {
      return; // Prevent adding empty options
    }
    setOptions([...options, newOption]);

    setNewOption(""); // Clear the input field after adding
  }

  function handleChoose() {
    if (options.length === 0) {
      alert("Please add some options first!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * options.length);
    setSelectedOption(options[randomIndex]);
  }

  function handleDeleteOption(index) {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    if (selectedOption === options[index]) {
      setSelectedOption(""); // Clear selected option if it was deleted
    }
  }

  function handleEditOption(index) {
    const valueToBeEdited = options[index];
    setNewOption(valueToBeEdited);
    handleDeleteOption(index);
  }

  function handleClear() {
    setOptions([]);
    setSelectedOption("");
    setNewOption("");
  }

  return (
    <>
      <div className="appContainer">
        <form className="formContainer" onSubmit={handleAddOption}>
          <h1>Please add your options below</h1>
          <input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="New option"
            type="text"
          />
          <button type="submit">Add</button>
        </form>
        <div className="buttonContainer">
          <button className="chooseBtn" onClick={() => handleChoose()}>
            Choose
          </button>
          <button className="clearBtn" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
        {selectedOption && (
          <div className="selectedOptionContainer">
            <h2>Selected Option</h2>
            <h3>{selectedOption}</h3>
          </div>
        )}
        {options.length > 0 && (
          <div className="optionsContainer">
            <h2>Options</h2>
            <ul>
              {options.map((option, index) => (
                <li key={index} className="optionItem">
                  {option}
                  <div className="actionsContainer">
                    <button onClick={() => handleEditOption(index)}>
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onClick={() => handleDeleteOption(index)}>
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
