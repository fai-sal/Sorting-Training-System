<template>
  <div class="sorting-system">
    <Header @start-sorting="startSorting" />
    <Table
      v-if="currentPosition.length > 0"
      :people="people"
      :currentPosition="currentPosition"
      @setCurrentPosition="setCurrentPosition"
    />
    <div v-if="isFinished" class="score-wrapper">
      <div class="congrats">Congratulations</div>
      <div class="score">Your score is {{ score }}</div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import { isEqual, generateNameEmail } from "./utils";

export default {
  name: "App",
  components: {
    Header,
    Table,
  },
  data() {
    return {
      people: {},
      sortedPeople: [],
      currentPosition: [],
      startTime: null,
      isFinished: false,
      score: null,
    };
  },
  watch: {
    currentPosition(newPositions) {
      if (newPositions.length === 0) {
        return;
      }
      if (isEqual(newPositions, this.sortedPeople)) {
        let timeDiff = Date.now() - this.startTime;
        timeDiff = Math.floor(timeDiff / 1000);

        this.score = timeDiff;
        this.isFinished = true;
        this.people = {};
        this.sortedPeople = [];
        this.currentPosition = [];
        this.startTime = null;

        setTimeout(() => {
          this.isFinished = false;
          this.score = null;
        }, 4000);
      }
    },
  },
  methods: {
    setCurrentPosition(newPositions) {
      this.currentPosition = newPositions;
    },
    startSorting(numberOfPeople) {
      this.isFinished = false;
      this.score = null;
      let uniqueIdentifiers = [];
      while (uniqueIdentifiers.length < numberOfPeople) {
        const newIdentifier = Math.floor(Math.random() * 100) + 1;
        if (uniqueIdentifiers.indexOf(newIdentifier) === -1) {
          uniqueIdentifiers.push(newIdentifier);
        }
      }
      let newPeople = {};

      uniqueIdentifiers.forEach((uniqueIdentifier) => {
        const info = generateNameEmail();
        newPeople[uniqueIdentifier] = {
          ...info,
          potatoes: uniqueIdentifier,
        };
      });

      this.currentPosition = uniqueIdentifiers;
      this.sortedPeople = [...uniqueIdentifiers].sort(
        (num1, num2) => num2 - num1
      );
      this.people = newPeople;
      this.startTime = Date.now();
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@import "../style/_main.scss";
</style>
