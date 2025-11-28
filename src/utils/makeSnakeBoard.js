// makeSnakeBoard.js

export function makeSnakeBoard() {
  const rows = [];

  for (let row = 0; row < 10; row++) {
    const start = 100 - row * 10;
    const end = start - 9;

    let currentRow = [];

    // create 10 numbers for this row
    for (let num = start; num >= end; num--) {
      currentRow.push(num);
    }

    // reverse every odd row (0-based)
    if (row % 2 === 1) {
      currentRow.reverse();
    }

    rows.push(...currentRow);
  }

  return rows;
}