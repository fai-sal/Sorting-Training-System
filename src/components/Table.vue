<template>
  <div class="table-wrapper">
    <div class="table-info">
      {{ Object.entries(people).length }} people in the list
    </div>
    <table>
      <thead>
        <tr>
          <td>Email</td>
          <td>Potatoes</td>
          <td>Full Name</td>
        </tr>
      </thead>

      <tbody class="droppable" @onDrop="handleDrop">
        <tr
          v-for="(id, index) in currentPosition"
          :key="id"
          :class="{
            dragging: index === draggingIndex,
            'drag-over': index === draggingOver,
            selected: selectedPeople.includes(id),
          }"
          draggable="true"
          @dragstart="handleDragStart(index)"
          @dragend="onDragEnd"
          @dragover.prevent="onDragOver(index)"
        >
          <td>
            <div class="email-wrapper">
              <label>
                <input type="checkbox" @change="handleSelection(id)" />
                <span className="checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                    fill="none"
                  >
                    <path
                      fill="#fff"
                      d="M.935 4.583a.523.523 0 01-.106-.162.6.6 0 010-.417.5.5 0 01.106-.162l.754-.723a.469.469 0 01.354-.162.493.493 0 01.208.041c.065.03.124.07.173.121l2.274 2.279L9.58.516a.51.51 0 01.571-.12.473.473 0 01.16.12l.754.733a.5.5 0 01.106.162.6.6 0 010 .417.523.523 0 01-.106.162l-6 5.97a.479.479 0 01-.163.122.546.546 0 01-.416 0 .479.479 0 01-.163-.123L.935 4.583z"
                    />
                  </svg>
                </span>
              </label>
              <div class="email">{{ people[id].email }}</div>
            </div>
          </td>
          <td>{{ people[id].potatoes }}</td>
          <td>{{ people[id].name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    people: {
      type: Object,
      required: true,
    },
    currentPosition: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      draggingIndex: null,
      draggingOver: null,
      selectedPeople: [],
    };
  },
  emits: ["setCurrentPosition"],
  methods: {
    addPeople() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    handleSelection(id) {
      if (this.selectedPeople.indexOf(id) === -1) {
        this.selectedPeople.push(id);
      } else {
        this.selectedPeople.splice(this.selectedPeople.indexOf(id), 1);
      }
    },
    handleDrop(event) {
      event.preventDefault();
    },
    handleDragStart(index) {
      this.draggingIndex = index;
    },
    onDragEnd(event) {
      event.preventDefault();

      let tempPositions = [...this.currentPosition];
      const draggedItem = tempPositions[this.draggingIndex];
      tempPositions.splice(this.draggingIndex, 1);
      tempPositions.splice(this.draggingOver, 0, draggedItem);

      this.$emit("setCurrentPosition", tempPositions);
      this.draggingIndex = null;
      this.draggingOver = null;
    },

    onDragOver(index) {
      this.draggingOver = index;
    },
  },
};
</script>
