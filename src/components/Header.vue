<template>
  <div class="header">
    <h2>Sorting Training System</h2>
    <div class="header-action-btn">
      <button class="btn-primary" @click="addPeople">Start Sorting!</button>
      <InputModal
        :showModal="showModal"
        @hide-modal="hideModal"
        @start-sorting="startSorting"
      />
    </div>
  </div>
</template>

<script>
import InputModal from "./InputModal.vue";

export default {
  name: "Header",
  components: {
    InputModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  emits: ["start-sorting"],
  methods: {
    addPeople() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    startSorting(numberOfPeople) {
      this.$emit("start-sorting", numberOfPeople);
      this.showModal = false;
    },
  },
};
</script>
