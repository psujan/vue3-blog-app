import CategoryService from "@/services/category";
import { ref } from "vue";
export default function useCategory() {
  const categoryRows = ref([]);

  const getCategories = async () => {
    const res = await CategoryService.index();
    categoryRows.value = res.data;
  };

  return {
    categoryRows,
    getCategories,
  };
}
