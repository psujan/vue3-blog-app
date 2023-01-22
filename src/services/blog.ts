import { api } from "@/services/api";
import { apiUrl } from "@/common/config";
//API path for blog feature crud
const apiPath = {
  index: "/posts",
  create: "/posts",
  show: "/posts/:id",
  update: "/posts/:id",
  delete: "/posts/:id",
};

const BlogService = {
  async index() {
    return await api.get(
      `${apiUrl}${apiPath.index}?_sort=updated_at&_order=desc`
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

  async show(id: string) {
    return await api.get(`${apiUrl}${apiPath.show.replace(":id", id)}`);
  },

  async delete(id: string) {
    return await api.delete(`${apiUrl}${apiPath.delete.replace(":id", id)}`);
  },

  // async getBlog(status = 'active'){
  //   const res = this.index();
  //   const rows = res.data ? res.data :[];
  //   if(rows){
  //     return rows.filter((item) = > item.status == 1);
  //   }
  // }
};

export default BlogService;
