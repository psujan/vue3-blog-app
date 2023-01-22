import { defineStore, acceptHMRUpdate } from "pinia";
import BlogService from "../services/blog";
import CategoryService from "../services/category";
import type { BlogObject } from "@/types";

export const useBlogStore = defineStore({
  id: "blogStore",
  state: () => ({
    blogs: [] as BlogObject[],
    statusByCategory: [],
    searchQuery: "" as string | undefined,
    filteredBlogs: [] as BlogObject[],
  }),
  getters: {
    getActiveBlogs: (state) => {
      return state.blogs.filter((blog) => blog.status === 1);
    },
    getInactiveBlogs: (state) => {
      return state.blogs.filter((blog) => blog.status === 0);
    },
    getCountByCategory: (state) => {
      return state.statusByCategory;
    },
  },
  actions: {
    async getAllBlogs() {
      const res = await BlogService.index();
      this.blogs = res && res.data ? res.data : [];
    },
    async getStatusByCategory() {
      const res = await CategoryService.index();
      let categories = res && res.data ? res.data : [];
      for (let i = 0; i < categories.length; i++) {
        categories[i] = { ...categories[i], active: 0, inactive: 0 };
      }
      for (let i = 0; i < categories.length; i++) {
        const blogs = this.blogs.filter(
          (blog) => blog.category == categories[i].name
        );
        const activeLength = blogs.filter((x) => x.status === 1).length;
        categories[i].active = activeLength;
        categories[i].inactive = blogs.length - activeLength;
      }
      this.statusByCategory = categories;
    },
    filterActiveByQuery(query: string) {
      let blogs = this.getActiveBlogs;
      let searchedResults = [] as BlogObject[];
      if (blogs.length) {
        searchedResults = blogs.filter(
          (item: BlogObject) =>
            item.content?.includes(query as string) ||
            item.title?.includes(query as string)
        );
      }
      this.filteredBlogs = searchedResults;
    },
    filterActiveByCategory(category: string) {
      category = category.replace("and", "&");
      let blogs = this.getActiveBlogs;
      let searchedResults = [] as BlogObject[];
      if (blogs && blogs.length) {
        searchedResults = blogs.filter((blog) => blog.category == category);
      }
      this.filteredBlogs = searchedResults;
    },
    setFilteredBlogs() {
      this.filteredBlogs = this.getActiveBlogs;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
