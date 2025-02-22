import React, { useState } from "react";

function SelectGender({ onGenderSelect }) {
  const [selectedGender, setSelectedGender] = useState("");

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    localStorage.setItem("selectedGender", gender);
    onGenderSelect(gender);
  };

  return (
    <div className="select-gender">
      <h2>Select Gender</h2>
      <button onClick={() => handleSelect("boy")}>Boy</button>
      <button onClick={() => handleSelect("girl")}>Girl</button>
    </div>
  );
}

export default SelectGender;
