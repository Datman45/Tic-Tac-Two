<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { TicTacTwoBrain } from '../bll/gameBrain';
import GameBoard from './GameBoard.vue';
import { useRouter } from 'vue-router';
import { useUserDataStore } from '@/stores/userDataStore';

const router = useRouter()
const game = reactive(new TicTacTwoBrain());
const store = useUserDataStore();

const timerInterval = ref<number | null>(null);
const timeLeft = ref(30);


const directions = [
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Up-Left', value: 'up-left' },
  { label: 'Up-Right', value: 'up-right' },
  { label: 'Down-Left', value: 'down-left' },
  { label: 'Down-Right', value: 'down-right' },
];

function handleCellClick(x: number, y: number) {
  const currentPlayer = store.currentPlayer;

  if (store.selectedPiece == true) {
    if (!game.checkInsideGrid(x, y, store)) {
      alert('Please select a valid cell!')
      return
    }
    if (store.board[x][y] == undefined) {
      store.board[x][y] = store.currentPlayer
      winnerDisplay()
      restartTimerForNextPlayer()
      store.selectedPiece = false;
      store.movePieceMode = false;
      game.changePlayer(store)

      if (store.gameMode === 'humanVsAi') {
        if (store.oCountPieces >= 4) {
          game.aiMovePiece(store);
        } else {
          game.aiMove(store);
        }
        winnerDisplay()
      }
      return
    } else {
      alert("chose an empty cell to move your piece player " + currentPlayer)
      return
    }
  }

  if (store.movePieceMode == true) {
    if (store.board[x][y] == currentPlayer) {
      store.board[x][y] = undefined;
      store.selectedPiece = true;
    } else {
      alert("Chose your piece player " + currentPlayer)
    }
    return
  }

  if (
    (currentPlayer === 'X' && store.xCountPieces >= 4) ||
    (currentPlayer === 'O' && store.oCountPieces >= 4)
  ) {
    alert(currentPlayer + " you can`t place more than 4 pieces")
    return
  }

  if (!game.checkInsideGrid(x, y, store)) {
    alert('Please select a valid cell!')
    return
  }

  if (store.board[x][y] != undefined) {
    alert("Please select an empty cell!")
    return
  }

  if (store.gameMode == "humanVsHuman") {
    game.makeAMove(x, y, store);
    restartTimerForNextPlayer();
  } else if (store.gameMode == "humanVsAi" && game.makeAMove(x, y, store) == undefined) {
    if (store.oCountPieces >= 4) {
      game.aiMovePiece(store);
    } else {
      game.aiMove(store);
    }
  }

  winnerDisplay()
}

function gridMove(direction: string) {
  game.moveGrid(direction, store)
  store.showGridMenu = false;
  winnerDisplay()
  restartTimerForNextPlayer()
}

function moveGridMenu() {
  // Toggle the menu only if not in movePieceMode or selectedPiece mode
  if (!store.movePieceMode && !store.selectedPiece) {
    store.showGridMenu = !store.showGridMenu;
  } else if (store.selectedPiece) {
    alert("Please player " + store.currentPlayer + " select place to put your piece");
  } else if (store.movePieceMode) {
    alert("Please player " + store.currentPlayer + " chose your piece");
  }
}

function enableMovePieceMode() {
  alert("Player " + store.currentPlayer + " chose your piece to move")
  store.movePieceMode = true;
}

function winnerDisplay() {
  if (game.checkWin(store) === "X" || game.checkWin(store) === "O") {
    store.winner = game.checkWin(store) ?? undefined;
    alert("Player " + store.winner + " win");
  }
}

function startTimer() {
  if (store.gameMode === 'humanVsHuman') {
    stopTimer();

    timeLeft.value = 30;
    store.isTimerActive = true;

    timerInterval.value = setInterval(() => {
      timeLeft.value--;

      if (timeLeft.value <= 0) {
        alert(`Time's up for player ${store.currentPlayer}!`);
        game.changePlayer(store);
        startTimer();
      }
    }, 1000);
  }
}

function stopTimer() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
  store.isTimerActive = false;
}

function resetTimer() {
  stopTimer();
  timeLeft.value = 30;
}


function restartGame() {
  game.resetBoard(store);
  resetTimer();
  if (store.gameMode === 'humanVsHuman') {
    startTimer();
  }
}

function restartTimerForNextPlayer() {
  if (store.gameMode === 'humanVsHuman') {
    stopTimer();
    startTimer();
  }
}

onMounted(() => {
  if (store.gameMode === 'humanVsHuman') {
    startTimer();
  }
});

onUnmounted(() => {
  if (store.gameMode === 'humanVsHuman') {
    stopTimer();
  }
});

watch(() => store.winner, (newVal) => {
  if (newVal != null) {
    stopTimer();
    router.push('/GameOver');
  }
});
</script>

<template>
  <GameBoard :board="store.board" :checkInsideGrid="game.checkInsideGrid" :grid-position="store.gridPosition"
    @cellClick="handleCellClick" />

  <div v-if="store.gameMode === 'humanVsHuman' && store.isTimerActive" class="timer-display">
    <h3>Player {{ store.currentPlayer }}'s Turn</h3>
    <div class="timer" :class="{ 'timer-warning': timeLeft <= 5 }">
      {{ timeLeft }}s
    </div>
  </div>

  <div class="button-row">
    <button class="button restartGame" @click="restartGame()">Restart Game</button>
    <button class="button moveGrid" v-if="store.xCountPieces >= 2 && store.oCountPieces >= 2" @click="moveGridMenu()">
      Move Grid
    </button>
    <button class="button pieceMove" v-if="store.xCountPieces >= 2 && store.oCountPieces >= 2"
      @click="enableMovePieceMode()">
      Move Piece
    </button>
  </div>
  <div v-if="store.showGridMenu == true" class="gridMoveMenu">
    <button v-for="direction in directions" :key="direction.value" class="gridMoveMenuButton"
      @click="gridMove(direction.value)">
      {{ direction.label }}
    </button>
  </div>
</template>


<style></style>
