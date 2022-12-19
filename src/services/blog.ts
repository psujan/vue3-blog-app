import { api } from "@/services/api";
import { apiUrl } from "@/common/config";
//API path for blog feature crud
const apiPath = {
  index: "/posts",
  create: "/posts",
};

const BlogService = {
  async index() {
    return await api.get(`${apiUrl}${apiPath.index}`);
  },

  async create(payload: any) {
    return await api.post(`${apiUrl}${apiPath.create}`, payload);
  },

  update() {},

  delete() {},
};

export default BlogService;
