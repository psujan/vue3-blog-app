import { api } from "@/services/api";
import { apiUrl } from "@/common/config";
//API path for blog feature crud
const apiPath = {
  index: "/posts",
  create: "/posts",
  update: "/posts/:id",
  delete: "/posts/:id",
};

const BlogService = {
  async index() {
    return await api.get(`${apiUrl}${apiPath.index}`);
  },

  async create<T>(payload: T) {
    return await api.post(`${apiUrl}${apiPath.create}`, payload);
  },

  async update<T>(payload: T, id: string) {
    return await api.put(
      `${apiUrl}${apiPath.update.replace(":id", id)}`,
      payload
    );
  },

  async delete(id: string) {
    return await api.delete(`${apiUrl}${apiPath.delete.replace(":id", id)}`);
  },
};

export default BlogService;
