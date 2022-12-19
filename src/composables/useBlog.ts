import BlogService from "@/services/blog";
import { ref } from "vue";
export default function useBlog() {
  const blogRows = ref([]);
  const blogErrorMessage = "Someting Went Wrong";

  const getBlogs = async () => {
    const res = await BlogService.index();
    blogRows.value = res.data;
  };

  const createBlog = async (payload: any) => {
    try {
      await BlogService.create({
        ...payload,
        status: payload.status == "active" ? 1 : 0,
      });
    } catch {
      return blogErrorMessage;
    }
  };

  return {
    blogRows,
    createBlog,
    getBlogs,
  };
}
