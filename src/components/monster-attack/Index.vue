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
    <div class="actions" v-if="!started" @click="start">
      <button class="start bg-primary">Start</button>
    </div>
    <div class="actions" v-if="started">
      <button class="bg-red" @click="attack">Attack</button>
      <button
        class="bg-yellow"
        @click="specialAttack"
        :disabled="specialAttackDisabled"
      >
        Special Attack
      </button>
      <button class="bg-blue" @click="heal">Heal</button>
      <button class="bg-grey" @click="reset">Give up</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import Health from "./Health";

export default {
  name: "Index",
  components: {
    Health,
  },
  data() {
    return {
      userHealth: 100,
      monsterHealth: 100,
      started: false,
      monsterAttackTimeout: null,
      getRandomFactor(max = 1) {
        return Math.floor(Math.random() * Math.floor(max)) / 100;
      },
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
  methods: {
    start() {
      this.started = true;
      this.monsterAttackTimeout = setTimeout(this.damageUserHealth, 500);
    },
    attack() {
      this.damageMonsterHealth(10);
    },
    specialAttack() {
      if (this.userHealth > 90) {
        this.damageMonsterHealth(20);
      }
    },
    heal() {
      const newVal = this.userHealth * 1.1;
      if (newVal > 100) {
        this.userHealth = 100;
      } else {
        this.userHealth = newVal;
      }
    },
    reset() {
      this.userHealth = 100;
      this.monsterHealth = 100;
      this.started = false;
      clearTimeout(this.monsterAttackTimeout);
    },
    damageUserHealth() {
      const newVal = this.userHealth * (1 - this.getRandomFactor(20));
      if (newVal < 0) {
        this.userHealth = 0;
        clearTimeout(this.monsterAttackTimeout);
      } else {
        this.userHealth = newVal;
        this.monsterAttackTimeout = setTimeout(this.damageUserHealth, 500);
      }
    },
    damageMonsterHealth(maxPercent = 10) {
      const newVal =
        this.monsterHealth * (1 - this.getRandomFactor(maxPercent));
      if (newVal < 0) {
        this.monsterHealth = 0;
      } else {
        this.monsterHealth = newVal;
      }
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
