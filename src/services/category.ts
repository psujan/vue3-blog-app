import { api } from "@/services/api";
import { apiUrl } from "@/common/config";
//API path for blog feature crud
const apiPath = {
  index:'/categories'
};


const CategoryService = {
  async index() {
    return await api.get(
      `${apiUrl}${apiPath.index}`
    );
  },
};

export default CategoryService;
