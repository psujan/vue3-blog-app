import { api } from "@/services/api";
import { apiUrl } from "@/common/config";
//API path for blog feature crud
const apiPath = {
  index:'/categories',
  create:"/categories",
  update:'/categories/:id',
};


const CategoryService = {
  async index() {
    return await api.get(
      `${apiUrl}${apiPath.index}`
    );
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
};

export default CategoryService;
