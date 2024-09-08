const boardElement = document.getElementById('board');
        const messageElement = document.getElementById('message');
        const turnMessageElement = document.getElementById('turnMessage');
        const resetButton = document.getElementById('resetButton');
        const darkModeToggle = document.getElementById('darkModeToggle');
        const modeText = document.getElementById('modeText');
        const winnerOverlay = document.getElementById('winnerOverlay');
        const winnerMessage = document.getElementById('winnerMessage');
        const nextButton = document.getElementById('nextButton');
        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let gameActive = true;
        let darkMode = false;

        function createBoard() {
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.index = index;
                cellElement.addEventListener('click', handleCellClick);
                boardElement.appendChild(cellElement);
            });
            updateTurnMessage();
        }

        function handleCellClick(event) {
            const index = event.target.dataset.index;
            if (board[index] !== '' || !gameActive) return;

            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add(currentPlayer.toLowerCase());

            if (checkWinner()) {
                messageElement.textContent = `Player ${currentPlayer} wins!`;
                messageElement.classList.add('winning-message');
                highlightWinningCells();
                gameActive = false;
                showWinnerOverlay(currentPlayer);
                return;
            }

            if (board.every(cell => cell !== '')) {
                messageElement.textContent = "It's a tie!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnMessage();
        }

        function checkWinner() {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            return winConditions.some(condition => {
                const [a, b, c] = condition;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    highlightWinningCells(condition);
                    return true;
                }
                return false;
            });
        }

        function highlightWinningCells(condition) {
            condition.forEach(index => {
                document.querySelector(`.cell[data-index='${index}']`).classList.add('winning-cell');
            });
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            messageElement.textContent = '';
            messageElement.classList.remove('winning-message');
            createBoard();
        }

        function updateTurnMessage() {
            turnMessageElement.textContent = `It's ${currentPlayer}'s turn to play.`;
        }

        function toggleDarkMode() {
            darkMode = !darkMode;
            document.body.classList.toggle('dark-mode', darkMode);
            messageElement.classList.toggle('text-white', darkMode);
            turnMessageElement.classList.toggle('text-white', darkMode);
            document.body.classList.toggle('bg-black', darkMode);
            document.body.classList.toggle('bg-[rgb(200,133,200)]', !darkMode);
            document.querySelector('.title').classList.toggle('text-white', darkMode);
            modeText.textContent = darkMode ? 'Dark Mode' : 'Light Mode';
            modeText.classList.toggle('text-white', darkMode);
        }

        function showWinnerOverlay(winner) {
            winnerMessage.textContent = `Player ${winner} Wins!`;
            winnerOverlay.classList.remove('hidden');
        }

        nextButton.addEventListener('click', () => {
            winnerOverlay.classList.add('hidden');
            resetGame();
        });

        resetButton.addEventListener('click', resetGame);
        darkModeToggle.addEventListener('change', toggleDarkMode);

        createBoard();