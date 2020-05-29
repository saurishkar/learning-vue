<script type="text/javascript">
import TabsIndex from "./components/tabs/Index";
import TodosIndex from "./components/todos/Index";
import RegistrationForm from "./components/form/Registration.vue";
import Home from "./components/Home";
import MonsterAttack from "@/components/monster-attack/Index.vue";
import NotFound from "./components/NotFound";
import ROUTES from "./constants/routes.json";

const routeMapping = {
  [ROUTES.home]: Home,
  [ROUTES.examples.tabs]: TabsIndex,
  [ROUTES.examples.todos]: TodosIndex,
  [ROUTES.examples.form]: RegistrationForm,
  [ROUTES.examples.monsterAttack]: MonsterAttack
};

export default {
  name: "Router",
  data: function() {
    return {
      currentRoute: window.location.pathname,
    };
  },
  computed: {
    ViewComponent: function() {
      return routeMapping[this.currentRoute] || NotFound;
    },
  },
  render: function(h) {
    return h(this.ViewComponent);
  },
};
</script>
