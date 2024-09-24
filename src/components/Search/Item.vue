<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["updatePopularity", "updateYear"]);

interface ItemProps {
  text: string;
  year?: number;
  value?: number;
  valueCap?: number;
  item?: string;
}

const props = defineProps<ItemProps>();

// State variables for tracking whether the radio buttons are checked
const isYearChecked = ref(false);
const isPopularityChecked = ref(false);

// isYearChecked.value = props.year === undefined ? false : true;
// isPopularityChecked.value = props.value === undefined ? false : true;

// Update state when a change event occurs on the year radio button
const handleYearChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  isYearChecked.value = target.checked; // Update the state variable
  console.log(target.labels?.[0].classList.remove("text-primary"))
  if (target.checked) {
    updateYear(props.year!);
  }
};

// Update state when a change event occurs on the popularity radio button
const handlePopularityChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  isPopularityChecked.value = target.checked; // Update the state variable
  if (target.checked) {
    updatePopularity(props.value!, props.valueCap!);
  }
};


// Emit functions to update parent component with year and popularity values
const updatePopularity = (value: number, valueCap: number) => {
  emit("updatePopularity", { value, valueCap });
};

const updateYear = (year: number) => {
  emit("updateYear", year);
};
</script>

<template>
  <div v-if="props.text?.toLowerCase() == 'year'" class="text-base font-semibold flex items-center gap-2 my-3">
    <input type="radio" @change="handleYearChange" :checked="isYearChecked" class="w-6 h-6" :id="props.year?.toString()" :name="props.text"/>
    <label :for="props.year?.toString()" >{{ props.year }}</label>
  </div>
  <div v-if="props.text?.toLowerCase() == 'popularity'" class="text-base font-semibold flex items-center gap-2 my-3">
    <input type="radio" @change="handlePopularityChange" :checked="isPopularityChecked" class="w-6 h-6" :id="props.item" :name="props.text" />
    <label :for="props.item" >{{ props.item }}</label>
  </div>
</template>


