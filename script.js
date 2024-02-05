document.addEventListener("DOMContentLoaded", function () {
  let boxes = document.querySelectorAll(".box");
  let resetBtn = document.querySelector("#reset-btn");
  let newGameBtn = document.querySelector("#new-btn");
  let msgContainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");
  let playWithComputerOption = document.getElementById("playWithComputer");
  let playWithFriendOption = document.getElementById("playWithFriend");
  let turnO = true;
  let count = 0;
  let gameMode = "computer";

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBoard();
  };

  const toggleGameMode = () => {
    gameMode = playWithComputerOption.checked ? "computer" : "friend";
    resetGame();
  };

  const resetBoard = () => {
    for (let box of boxes) {
      box.innerText = "";
    }
  };

  playWithComputerOption.addEventListener("change", toggleGameMode);
  playWithFriendOption.addEventListener("change", toggleGameMode);

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (gameMode === "friend") {
        playWithFriend(box);
      } else {
        playWithComputer(box);
      }
    });
  });

  const playWithFriend = (box) => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  };

  const playWithComputer = (box) => {
    if (turnO) {
      box.innerText = "X";
      turnO = false;
      box.disabled = true;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      } else {
        setTimeout(() => {
          makeComputerMove();
        }, 500);
      }
    }
  };

  const makeComputerMove = () => {
    let emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
    if (emptyBoxes.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      let aiBox = emptyBoxes[randomIndex];
      aiBox.innerText = "O";
      aiBox.disabled = true;
      turnO = true;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  };

  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    showMsgContainer();
    disableBoxes();
  };

  const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

  const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    showMsgContainer();
    disableBoxes();
  };

  const showMsgContainer = () => {
    msgContainer.classList.remove("hide");
    msgContainer.scrollIntoView({ behavior: "smooth" });
  };

  const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
    return false;
  };

  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);
});


 