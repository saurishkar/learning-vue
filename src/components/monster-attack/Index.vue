<template>
  <div class="monster-attack">
    <h1>Monster Attack Example</h1>
    <div class="health-section">
      <div class="user">
        <h2>You</h2>
        <Health :health="userHealth" key="user" />
      </div>
      <div class="monster">
        <h2>Monster</h2>
        <Health :health="monsterHealth" key="monster" />
      </div>
    </div>
    <h2 class="result" v-if="!!result">{{ result }}</h2>
    <div class="actions" v-if="!started" @click="start">
      <button class="start bg-primary">Start</button>
    </div>
    <div class="actions" v-if="started">
      <button class="bg-red" @click="attackMonster">Attack</button>
      <button
        class="bg-yellow"
        @click="attackMonsterSpecial"
        :disabled="specialAttackDisabled"
      >
        Special Attack
      </button>
      <button class="bg-blue" @click="healPlayer">Heal</button>
      <button class="bg-grey" @click="reset">Give up</button>
    </div>
    <EventHistory :logs="eventHistory" />
  </div>
</template>

<script type="text/javascript">
import Health from "./Health";
import EventHistory from "./EventHistory";

const FACTOR_20 = 20;
const FACTOR_10 = 10;
const MONSTER = "Monster";
const PLAYER = "Player";
const MAX_HEALTH = 100;

export default {
  name: "Index",
  components: {
    Health,
    EventHistory,
  },
  data() {
    return {
      userHealth: MAX_HEALTH,
      monsterHealth: MAX_HEALTH,
      started: false,
      eventHistory: [],
      result: ""
    };
  },
  computed: {
    specialAttackDisabled() {
      if (this.userHealth < 90) {
        return true;
      }
      return false;
    },
  },
  watch: {
    userHealth() {
      if (this.userHealth <= 0) {
        this.endGame();
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0) {
        this.endGame();
      }
    },
  },
  methods: {
    start() {
      this.started = true;
      this.result = "";
      this.userHealth = MAX_HEALTH;
      this.monsterHealth = MAX_HEALTH;
      this.eventHistory = [];
      this.logEvent("Game Started");
    },
    attackMonster() {
      this.damage({ attacker: PLAYER });
    },
    attackMonsterSpecial() {
      this.damage({ attacker: PLAYER, special: true });
    },
    attackPlayer() {
      this.damage({ attacker: MONSTER });
    },
    healPlayer() {
      const healedValue = this.userHealth + FACTOR_10;
      this.userHealth = healedValue >= MAX_HEALTH ? MAX_HEALTH : healedValue;
      this.logEvent(`Player heals for ${FACTOR_10}`);
    },
    damagePlayerHealth(damageValue = 0) {
      const newHealth = this.userHealth - damageValue;
      this.logEvent(`Monster hits player for ${damageValue}`);
      this.userHealth = newHealth <= 0 ? 0 : newHealth;
    },
    damageMonsterHealth(damageValue = 0, hard = false) {
      const newHealth = this.monsterHealth - damageValue;
      this.logEvent(
        `Player hits monster ${hard ? "hard" : ""} for ${damageValue}`
      );
      this.monsterHealth = newHealth <= 0 ? 0 : newHealth;
      this.attackPlayer();
    },
    damage({ attacker = MONSTER, special = false }) {
      let damageValue = 0;
      switch (attacker) {
        case PLAYER:
          damageValue = this.getRandomFactor(special ? FACTOR_20 : FACTOR_10);
          this.damageMonsterHealth(damageValue, special);
          break;

        case MONSTER:
          damageValue = this.getRandomFactor(FACTOR_20);
          this.damagePlayerHealth(damageValue);
          break;
      }
    },
    endGame() {
      const { userHealth, monsterHealth } = this;
      if (userHealth > monsterHealth) {
        this.result = "Player wins";
      } else {
        this.result = "Monster wins";
      }
      this.reset();
    },
    getRandomFactor(max = 1) {
      return 1 + Math.floor(Math.random() * Math.floor(max));
    },
    logEvent(log = "") {
      this.eventHistory = [log, ...this.eventHistory];
    },
    reset() {
      this.started = false;
    },
  },
};
</script>

<style type="text/css" scoped>
.health-section {
  display: inline-flex;
  width: 100%;
}
.health-section .user,
.health-section .monster {
  width: 40%;
  justify-content: center;
  margin: auto;
  position: relative;
}
h2 {
  text-align: center;
}
.actions {
  display: inline-flex;
  margin-top: 3em;
}
button {
  padding: 0.5em 1em;
  border: none;
  margin: 0 1em;
  font-size: 1.3em;
  outline: none;
  /*transition: all 1s ease;*/
}
button:hover {
  cursor: pointer;
}
button:active {
  background-color: grey;
}
button:disabled {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: default;
}
.bg-red {
  background-color: red;
}
.bg-grey {
  background-color: grey;
}
.bg-blue {
  background-color: blue;
}
.bg-yellow {
  background-color: yellow;
}
.bg-primary {
  background-color: #3498db;
  color: white;
}
</style>
