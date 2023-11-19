const solveNQueens = (n: number): string[][][] => {
    const res: string[][][] = [];
    if (n === 1 || n >= 4) dfs(res, [], n, 0);
    return res;
  };
  
  const dfs = (res: string[][][], points: number[][], n: number, index: number) => {
    for (let i = index; i < n; i++) {
      if (points.length !== i) return;
      for (let j = 0; j < n; j++) {
        if (isValid(points, [i, j])) {
          points.push([i, j]);
          dfs(res, points, n, i + 1);
          if (points.length === n) res.push(buildBoard(points, n));
          points.pop();
        }
      }
    }
  };
  
  const buildBoard = (points: number[][], n: number): string[][] => {
    const board: string[][] = [];
    for (let i = 0; i < n; i++) {
      const row: string[] = [];
      for (let j = 0; j < n; j++) {
        row.push(points.some((p) => p[0] === i && p[1] === j) ? 'Q' : '.');
      }
      board.push(row);
    }
    return board;
  };
  
  const isValid = (oldPoints: number[][], newPoint: number[]): boolean => {
    const len = oldPoints.length;
    for (let i = 0; i < len; i++) {
      if (oldPoints[i][0] === newPoint[0] || oldPoints[i][1] === newPoint[1]) return false;
      if (Math.abs((oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])) === 1) return false;
    }
    return true;
  };

  export default solveNQueens;