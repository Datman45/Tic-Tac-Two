export type userData = {
  gameMode: string
  winner: playerChar

  board: boardType
  gridPosition: gridPositionType
  currentPlayer: playerChar
  xCountPieces: number
  oCountPieces: number
  showGridMenu: boolean
  movePieceMode: boolean
  selectedPiece: boolean
}

export type playerChar = 'X' | 'O' | undefined
export type boardType = playerChar[][]
export type gridPositionType = { x: number; y: number }

export class TicTacTwoBrain {
  makeAMove(x: number, y: number, store: userData) {
    if (store.board[x][y] === undefined) {
      store.board[x][y] = store.currentPlayer
      this.countPieces(store)
      this.changePlayer(store)
    }
  }

  checkInsideGrid(x: number, y: number, store: userData): boolean {
    if (
      x < store.gridPosition.x ||
      x > store.gridPosition.x + 2 ||
      y < store.gridPosition.y ||
      y > store.gridPosition.y + 2
    ) {
      return false
    }
    return true
  }

  moveGrid(direction: string, store: userData) {
    const { x, y } = store.gridPosition

    let newX = x
    let newY = y

    switch (direction) {
      case 'up':
        newX = x - 1
        break
      case 'down':
        newX = x + 1
        break
      case 'left':
        newY = y - 1
        break
      case 'right':
        newY = y + 1
        break
      case 'up-left':
        newX = y - 1
        newY = x - 1
        break
      case 'up-right':
        newX = x - 1
        newY = y + 1
        break
      case 'down-left':
        newX = x + 1
        newY = y - 1
        break
      case 'down-right':
        newX = x + 1
        newY = y + 1
        break
    }

    // Make sure the grid stays within the 5x5 board
    if (newX >= 0 && newX <= 2 && newY >= 0 && newY <= 2) {
      store.gridPosition = { x: newX, y: newY }
      store.gridPosition = { x: newX, y: newY }
      store.currentPlayer = store.currentPlayer === 'X' ? 'O' : 'X'

      alert('Grid moved successfully! Now turn`s: ' + store.currentPlayer)

      if (store.gameMode === 'humanVsAi') {
        if (store.oCountPieces >= 4) {
          this.aiMovePiece(store)
        } else {
          this.aiMove(store)
        }
      }

      return true // Move successful
    }
    alert(`Invalid grid move. The grid cannot move to ${direction} because it is out of bounds.`)
    return false // Move out of bounds
  }

  checkWin(store: userData) {
    // Check rows
    for (let i = store.gridPosition.x; i <= store.gridPosition.x + 2; i++) {
      if (
        store.board[i] &&
        store.board[i][store.gridPosition.y] !== undefined &&
        store.board[i][store.gridPosition.y] === store.board[i][store.gridPosition.y + 1] &&
        store.board[i][store.gridPosition.y + 1] === store.board[i][store.gridPosition.y + 2]
      ) {
        return store.board[i][store.gridPosition.y + 1]
      }
    }

    // Check columns
    for (let j = store.gridPosition.y; j <= store.gridPosition.y + 2; j++) {
      if (
        store.board[store.gridPosition.x] &&
        store.board[store.gridPosition.x][j] !== undefined &&
        store.board[store.gridPosition.x][j] === store.board[store.gridPosition.x + 1][j] &&
        store.board[store.gridPosition.x + 1][j] === store.board[store.gridPosition.x + 2][j]
      ) {
        return store.board[store.gridPosition.x + 1][j]
      }
    }

    // Check diagonal (top-left to bottom-right)
    if (
      store.board[store.gridPosition.x] &&
      store.board[store.gridPosition.x][store.gridPosition.y] !== undefined &&
      store.board[store.gridPosition.x][store.gridPosition.y] ===
        store.board[store.gridPosition.x + 1][store.gridPosition.y + 1] &&
      store.board[store.gridPosition.x + 1][store.gridPosition.y + 1] ===
        store.board[store.gridPosition.x + 2][store.gridPosition.y + 2]
    ) {
      return store.board[store.gridPosition.x + 1][store.gridPosition.y + 1]
    }

    // Check diagonal (top-right to bottom-left)
    if (
      store.board[store.gridPosition.x] &&
      store.board[store.gridPosition.x][store.gridPosition.y + 2] !== undefined &&
      store.board[store.gridPosition.x][store.gridPosition.y + 2] ===
        store.board[store.gridPosition.x + 1][store.gridPosition.y + 1] &&
      store.board[store.gridPosition.x + 1][store.gridPosition.y + 1] ===
        store.board[store.gridPosition.x + 2][store.gridPosition.y]
    ) {
      return store.board[store.gridPosition.x + 1][store.gridPosition.y + 1]
    }
  }

  aiMove(store: userData) {
    const emptyCells = []

    // Get all empty cells within the grid
    for (let i = store.gridPosition.x; i <= store.gridPosition.x + 2; i++) {
      for (let j = store.gridPosition.y; j <= store.gridPosition.y + 2; j++) {
        if (store.board[i].length === 0) {
          store.board[i] = []
        }
        if (store.board[i][j] === undefined) {
          emptyCells.push([i, j])
        }
      }
    }

    // Check if AI can win in the next move
    for (const [x, y] of emptyCells) {
      store.board[x][y] = store.currentPlayer
      if (this.checkWin(store)) {
        store.board[x][y] = undefined
        this.makeAMove(x, y, store)
        return [x, y]
      }
      store.board[x][y] = undefined
    }

    // Check if opponent can win in the next move
    const opponent: playerChar = store.currentPlayer === 'X' ? 'O' : 'X'
    for (const [x, y] of emptyCells) {
      store.board[x][y] = opponent
      if (this.checkWin(store)) {
        store.board[x][y] = undefined
        this.makeAMove(x, y, store)
        return [x, y]
      }
      store.board[x][y] = undefined
    }

    // If no immediate win or block, make a random move
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      this.makeAMove(randomCell[0], randomCell[1], store)
      return randomCell
    }

    return null
  }

  aiMovePiece(store: userData) {
    // Find all AI pieces on the board
    const aiPieces = []
    for (let i = 0; i < 5; i++) {
      if (store.board[i]) {
        for (let j = 0; j < 5; j++) {
          if (store.board[i][j] === 'O') {
            aiPieces.push([i, j])
          }
        }
      }
    }

    // No pieces to move
    if (aiPieces.length === 0) {
      return null
    }

    // Find all empty cells within the grid
    const emptyCells = []
    for (let i = store.gridPosition.x; i <= store.gridPosition.x + 2; i++) {
      for (let j = store.gridPosition.y; j <= store.gridPosition.y + 2; j++) {
        if (store.board[i].length === 0) {
          store.board[i] = []
        }
        if (store.board[i][j] === undefined) {
          emptyCells.push([i, j])
        }
      }
    }

    // No empty cells to move to
    if (emptyCells.length === 0) {
      return null
    }

    // Check if moving any piece can create a win
    for (const [pieceX, pieceY] of aiPieces) {
      for (const [emptyX, emptyY] of emptyCells) {
        // Temporarily remove the piece
        const temp = store.board[pieceX][pieceY]
        store.board[pieceX][pieceY] = undefined

        // Temporarily place the piece at the new location
        store.board[emptyX][emptyY] = 'O'

        // Check if this creates a winning position
        if (this.checkWin(store)) {
          // Commit the move
          store.board[pieceX][pieceY] = undefined
          // Switch to other player after move
          store.currentPlayer = 'X'
          return {
            from: [pieceX, pieceY],
            to: [emptyX, emptyY],
          }
        }

        // Undo the temporary move
        store.board[emptyX][emptyY] = undefined
        store.board[pieceX][pieceY] = temp
      }
    }

    // Check if moving any piece can block opponent's win

    // If no strategic move found, move a random piece to a random empty cell
    const randomPiece = aiPieces[Math.floor(Math.random() * aiPieces.length)]
    const randomEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    // Make the move
    store.board[randomPiece[0]][randomPiece[1]] = undefined
    store.board[randomEmptyCell[0]][randomEmptyCell[1]] = 'O'

    // Switch to other player after move
    store.currentPlayer = 'X'

    return {
      from: randomPiece,
      to: randomEmptyCell,
    }
  }

  countPieces(store: userData) {
    if (store.currentPlayer == 'X') {
      store.xCountPieces++
    } else {
      store.oCountPieces++
    }
  }

  changePlayer(store: userData) {
    store.currentPlayer = store.currentPlayer === 'X' ? 'O' : 'X'
  }

  resetBoard(store: userData) {
    for (let i = 0; i < store.board.length; i++) {
      for (let j = 0; j < store.board[i].length; j++) {
        store.board[i][j] = undefined
      }
    }

    store.gridPosition = { x: 1, y: 1 }

    store.currentPlayer = 'X'

    store.xCountPieces = 0
    store.oCountPieces = 0

    store.showGridMenu = false
    store.movePieceMode = false
    store.selectedPiece = false

    store.winner = undefined
  }
}
