import { createApp } from "vue";
import "./styles/general.scss";
import * as bootstrap from "bootstrap";
import App from "./App.vue";
import { router } from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import {} from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faLocationDot,faStar } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faMagnifyingGlass,faLocationDot,faStar);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
