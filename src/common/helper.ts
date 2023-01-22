import moment from "moment";
export const getChunkedArray = (items: [], size: number = 10) => {
  let chunkedArray = [];
  for (let i = 0; i < items.length; i += size) {
    let tempArray = [];
    tempArray = items.slice(i, i + size);
    chunkedArray.push(tempArray);
  }
  return chunkedArray;
};

export const getPartialText = (text: string, limit = 100): string => {
  if (text.length <= limit) {
    return text;
  }

  return text.substring(0, (text + " ").lastIndexOf(" ", limit)) + " ...";
};

export const getReadableTimeFormat = (date: string) => {
  return moment(date).fromNow();
};
