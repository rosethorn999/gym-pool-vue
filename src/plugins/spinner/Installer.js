import Spinner from "./Spinner.vue";
import { events } from "./Events.js";

class Installer {
  constructor() {
    this.isInstalled = false;
  }
  install(Vue) {
    if (this.isInstalled) return;
    this.isInstalled = true;

    Vue.component("VueSpinnerPlugin", Spinner);

    Vue.prototype.$spinner = options => {
      events.$emit("spinner", options);
    };
  }
}

export default new Installer();
