import BlogService from "@/services/blog";
import { ref } from "vue";
import useSpinner from "./useSpinner";
import type { BlogFormFields } from "@/types";
const { isLoading } = useSpinner();

export default function useBlog() {
  const blogRows = ref([]);
  const getBlogs = async () => {
    isLoading(true);
    try {
      let res = await BlogService.index();
      blogRows.value = res.data;
    } catch (error) {
      console.error(error);
      blogRows.value = [];
    } finally {
      isLoading(false);
    }
  };

  const createBlog = async (payload: BlogFormFields) => {
    isLoading(true);
    try {
      return await BlogService.create<BlogFormFields>({
        ...payload,
        status: payload.status == "active" ? 1 : 0,
      });
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading(false);
    }
  };

  const updateBlog = async (payload: BlogFormFields, id: string) => {
    isLoading(true);
    try {
      return await BlogService.update<BlogFormFields>(
        {
          ...payload,
          status: payload.status == "active" ? 1 : 0,
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

  const deleteBlog = async (id: string) => {
    isLoading(true);
    try {
      return await BlogService.delete(id);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading(false);
    }
  };

  const getBlogById = async(id: string)=>{
    isLoading(true);
    try {
      return await BlogService.show(id);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading(false);
    }
  }

  return {
    blogRows,
    createBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
    getBlogById
  };
}
