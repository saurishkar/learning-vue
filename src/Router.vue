<script type="text/javascript">
import TabsIndex from "./components/tabs/Index";
import TodosIndex from "./components/todos/Index";
import RegistrationForm from "./components/form/Registration.vue";
import Home from "./components/Home";
import MonsterAttack from "@/components/monster-attack/Index.vue";
import Ecommerce from "@/components/ecommerce/Index";
import EmailSlots from "@/components/email-slots/Index";
import ContactManager from "@/components/contact-manager/Index";
import ArithmeticQuiz from "@/components/arithmetic-quiz/Index";
import ArithmeticQuizCustom from "@/components/arithmetic-quiz-custom/Index";
import NotFound from "./components/NotFound";
import ROUTES from "./constants/routes.json";

const routeMapping = {
  [ROUTES.home]: Home,
  [ROUTES.examples.tabs]: TabsIndex,
  [ROUTES.examples.todos]: TodosIndex,
  [ROUTES.examples.form]: RegistrationForm,
  [ROUTES.examples.monsterAttack]: MonsterAttack,
  [ROUTES.examples.emailSlots]: EmailSlots,
  [ROUTES.examples.contactManager]: ContactManager,
  [ROUTES.examples.customEvents]: Ecommerce,
  [ROUTES.examples.arithmeticQuiz]: ArithmeticQuiz,
  [ROUTES.examples.arithmeticQuizCustom]: ArithmeticQuizCustom
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
