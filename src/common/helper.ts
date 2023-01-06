export const getChunkedArray = (items: [], size: number = 10) => {
  let chunkedArray = [];
  for (let i = 0; i < items.length; i += size) {
    let tempArray = [];
    tempArray = items.slice(i, i + size);
    chunkedArray.push(tempArray);
  }
  return chunkedArray;
};
