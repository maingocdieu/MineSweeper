function findSymmetricElements(matrix) {
    const symmetricElements = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Kiểm tra nếu phần tử hiện tại là đối xứng qua đường chéo chính
        if (matrix[i][j] === matrix[j][i]) {
          symmetricElements.push([i, j]);
        }
      }
    }
  
    return symmetricElements;
  }
  
  // Ví dụ sử dụng hàm trên
  const matrix = [
    [1, 2, 3],
    [2, 4, 5],
    [3, 5, 6]
  ];
  
  const symmetricElements = findSymmetricElements(matrix);
  console.log("Các phần tử đối xứng qua đường chéo chính:");
  symmetricElements.forEach(([i, j]) => {
    console.log(`matrix[${i}][${j}] = ${matrix[i][j]}`);
  });
  