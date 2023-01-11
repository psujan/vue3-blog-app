import CategoryService from "@/services/category";
import type { CategoryFormFields } from "@/types";
import { ref } from "vue";
import useSpinner from "./useSpinner";

const { isLoading } = useSpinner();

export default function useCategory() {
  const categoryRows = ref([]);

  const getCategories = async () => {
    isLoading(true);
    const res = await CategoryService.index();
    categoryRows.value = res.data;
    isLoading(false);
  };

  const createCategory = async (payload: CategoryFormFields) => {
    isLoading(true);
    try {
      return await CategoryService.create<CategoryFormFields>({
        ...payload,
      });
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading(false);
    }
  };

  const updateCategory = async (payload: CategoryFormFields, id: string) => {
    isLoading(true);
    try {
      return await CategoryService.update<CategoryFormFields>(
        {
          ...payload,
        },
        id
      );
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading(false);
    }
  };

  return {
    categoryRows,
    getCategories,
    createCategory,
    updateCategory
  };
}
