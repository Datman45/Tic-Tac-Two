<script setup lang="ts">
import type { boardType, userData } from '@/bll/gameBrain';
import { useUserDataStore } from '@/stores/userDataStore';

interface Props {
  board: boardType;
  checkInsideGrid: (x: number, y: number, store: userData) => boolean;
  gridPosition: { x: number, y: number };
}

const props = defineProps<Props>()

const store = useUserDataStore();

</script>

<template>
  <div>
    <table class="board" border="1">
      <tr v-for="(row, indexRow) in props.board" :key="indexRow">
        <td v-for="(cell, indexCol) in row" :key="indexCol" @click="$emit('cellClick', indexRow, indexCol)"
          :class="{ 'grid-cell': props.checkInsideGrid(indexRow, indexCol, store) }">
          {{ cell }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style></style>
