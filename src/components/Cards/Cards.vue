<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
const data = {
        items:['fuckkkkkkkkkkkkkkkkkkkkk','mad','damn']
    } as {items: string[]}

</script>

<template>
  <h1 class="text-yellow-500">{{ msg }}</h1>
    <ul v-for="items in data.items">
        <li>{{items}}</li>
    </ul>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
