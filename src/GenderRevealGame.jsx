// src/GenderRevealGame.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useTrail, a } from "@react-spring/web";
import "./GenderRevealGame.css";
import SelectGender from "./SelectGender";
import boyBoard from "./predefined/boy";
import girlBoard from "./predefined/girl";

const messageMap = {
  "🎀": "糖果、蝴蝶结和童话故事，我们的小公主来了！👸",
  "🍼": "蓝色统治世界！准备迎接一个小王子！👑",
};

const GenderRevealGame = ({ onNext }) => {
  const [predefinedBoard, setPredefinedBoard] = useState(null); // All cards closed initially
  const [board, setBoard] = useState(Array(9).fill(null)); // All cards closed initially
  const [message, setMessage] = useState("");
  const [genderSelected, setGenderSelected] = useState(false);

  useEffect(() => {
    const storedGender = localStorage.getItem("selectedGender");
    if (storedGender) {
      setGenderSelected(true);
      setPredefinedBoard(storedGender === "girl" ? girlBoard : boyBoard);
    }
  }, []);

  const handleGenderSelect = (gender) => {
    setGenderSelected(true);
    setPredefinedBoard(gender === "girl" ? girlBoard : boyBoard);
  };

  const handleClick = (index) => {
    if (board[index]) return; // If already revealed, do nothing

    const newBoard = board.slice();
    newBoard[index] = predefinedBoard[index]; // Reveal the content
    setBoard(newBoard);

    // Check if all cards are revealed
    if (newBoard.every((card) => card !== null)) {
      const result =
        newBoard.filter((card) => card === "🎀").length >
        newBoard.filter((card) => card === "🍼").length
          ? "🎀"
          : "🍼";
      setMessage(messageMap[result]);

      // Wait for 5 seconds and then replace the page with the image
      setTimeout(() => {
        onNext(result);
        // const imageUrl = result === "🎀" ? "./girl.png" : "./boy.png";
        // document.body.innerHTML = `
        //   <img src="${imageUrl}" alt="Result Image" style="width:100vw; height:100vh; object-fit:cover;">
        // `;
      }, 2000);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("selectedGender");
    setGenderSelected(false);
    setPredefinedBoard(null);
    setBoard(Array(9).fill(null));
    setMessage("");
  };

  const renderSquare = (index) => (
    <button
      className={`square ${board[index] ? "reveal" : ""}`}
      onClick={() => handleClick(index)}
    >
      <div className="content front"></div>
      <div className="content back">{board[index]}</div>
    </button>
  );

  if (!genderSelected) {
    return <SelectGender onGenderSelect={handleGenderSelect} />;
  }

  return (
    <div className="game">
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {message && <div className="message">{message}</div>}
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

GenderRevealGame.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default GenderRevealGame;
