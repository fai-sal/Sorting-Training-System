<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-overlay" @click="hideModal"></div>
        <div class="modal-container">
          <div class="modal-header">
            <div class="title">How many people?</div>
            <div class="close-icon" @click="hideModal">x</div>
          </div>
          <div class="modal-body">
            <form class="input-form" @submit.prevent="onSubmit">
              <label for="people"
                >Enter a number of how many people you want to add to then list
              </label>
              <input
                class="input"
                id="people"
                v-model="people"
                @blur="onBlur"
                placeholder="Add people"
              />
              <div v-if="showWarning" class="warning">
                Number of people must be between 20 and 100
              </div>
            </form>
          </div>

          <div class="modal-footer d-flex">
            <div name="footer">
              <button class="modal-button btn-seondary" @click="hideModal">
                Cancel
              </button>
              <button class="modal-button btn-primary" @click="onStart">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "InputModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["hide-modal", "start-sorting"],
  data() {
    return {
      people: null,
      showWarning: false,
    };
  },
  watch: {
    people(newValue) {
      if (this.showWarning && newValue >= 20 && newValue <= 100) {
        this.showWarning = false;
      }
    },
  },
  methods: {
    hideModal() {
      this.$emit("hide-modal");
      this.people = null;
      this.showWarning = false;
    },
    onBlur() {
      if (this.people < 20 || this.people > 100) {
        this.showWarning = true;
      }
    },
    onStart() {
      if (this.people < 20 || this.people > 100) {
        this.showWarning = true;
        return;
      }
      this.$emit("start-sorting", this.people);
      this.people = null;
    },
  },
};
</script>
