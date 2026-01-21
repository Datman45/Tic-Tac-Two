import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { playerChar, boardType, gridPositionType } from '@/bll/gameBrain'

export const useUserDataStore = defineStore('userData', () => {
  const userName = ref('')
  const password = ref('')
  const gameMode = ref('')
  const winner = ref<playerChar | undefined>(undefined)

  const board = ref<boardType>([
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
  ])

  const gridPosition = ref<gridPositionType>({ x: 1, y: 1 })
  const currentPlayer = ref<playerChar>('X')
  const xCountPieces = ref(0)
  const oCountPieces = ref(0)
  const showGridMenu = ref(false)
  const movePieceMode = ref(false)
  const selectedPiece = ref(false)
  const isTimerActive = ref(false)
  return {
    userName,
    password,
    gameMode,
    winner,
    board,
    gridPosition,
    currentPlayer,
    xCountPieces,
    oCountPieces,
    showGridMenu,
    movePieceMode,
    selectedPiece,
    isTimerActive,
  }
})
