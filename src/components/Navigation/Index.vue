<script setup lang="ts">
import {computed} from "vue";
import { useDark,useToggle } from "@vueuse/core";
import {NavData} from "./data"
import NavList from './NavList.vue';


const isDark= useDark();
const toggleDark = useToggle(isDark);
const props = defineProps({
    colorTheme:{type:String},
    isCollapsed:{type:Boolean}
})
const emit = defineEmits(["updateCollapsedState"])
// const isCollapsed = ref(true);
const collapsed = computed(()=>props.isCollapsed?"px-3 flex items-center":"p-5")
const collapsedUl = computed(()=>props.isCollapsed?"space-y-1":"space-y-4")
const collapsedDL = computed(()=>props.isCollapsed?"h-6 px-1 py-1":"h-9")
const darkmode = computed(()=>isDark.value?"bg-transparent":"bg-white/50")
const ndarkmode = computed(()=>isDark.value?"bg-white/50":"bg-transparent")
const updateCollapsedState = ()=>{
emit("updateCollapsedState", !props.isCollapsed);
}
</script>
<template >
    <div class="absolute glass w-[92%] h-[97%]  my-3 mx-2 m-auto shadow-2xl p-2 flex flex-col ">
        <div :class="['logo font-special text-4xl text-center p-5 ',collapsed]">logo</div>
        <div class="line h-0.5 w-full bg-white/15 my-4"></div>
        <v-icon name="bi-arrow-left-right" class="absolute top-[13.2%] cursor-pointer right-0" scale="1.5" @click="updateCollapsedState"></v-icon>
        <div class="relative">
            <ul  :class="['space-y-2 flex flex-col h-fit ',collapsedUl]">
                <NavList v-for="item in NavData" :icon="item.icon" :isCollapsed="$props.isCollapsed" :text="item.name" :link="item.link" :colorTheme="colorTheme" />
            </ul>
        </div>
        <div class="h-11 w-full rounded-3xl p-1 bg-black/50 mt-auto focus-within:ring focus-within:ring-white/50">
            <button @click="toggleDark()" type="button" class="bg-black/35 w-full rounded-full  flex items-center h-full justify-between">
                <v-icon scale="1" name="md-lightmode-outlined"  :class="[' h-9 w-full py-2 px-[15%] rounded-full transition-all duration-300',darkmode,collapsedDL]"></v-icon>
                <v-icon scale="1" name="md-nightlight-sharp"  :class="[' h-9 w-full py-2 px-[15%] rounded-full transition-all duration-300',ndarkmode,collapsedDL]"></v-icon>
            </button>
        </div>
    </div>
</template>
<style scoped>
    
</style>