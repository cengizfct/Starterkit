import { REQUEST_TO_GET_COMPONENTS } from "../services/Requests/Components";
import componentListFromEnum from "@/enums/componentList.json";
export default {
  data() {
    return {
      isLoading: false,
     
      componentAllList: componentListFromEnum,
    };
  },

  methods: {
 
    async GET_COMPONENTS_BY_TYPE(type) {
      const options = {
        query: {
          type,
          page: 1,
          limit: 12,
        },
      };
      const response = await REQUEST_TO_GET_COMPONENTS(options);
      if (response.message === "OK") {
        return response.data;
      } else return { items: [], count: 0 };
    },
  
  },
 
};
