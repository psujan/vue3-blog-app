import {getChunkedArray} from "@/common/helper";

export default function usePagination() {
  const chunkItems = (items:[] , pageSize = 3)=>{
    return getChunkedArray(items , pageSize);
  }

  return {
    chunkItems
  }
}