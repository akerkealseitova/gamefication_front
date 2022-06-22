import { createStore } from "vuex";
import auth from "./auth.module";
import course from "./course.module";

const store = createStore({
    modules: {
        auth,
        course
    }
})

export default store