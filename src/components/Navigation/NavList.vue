<script setup lang="ts">
import {computed} from "vue"
import { convertHexToAccentColor } from "@/utils/utils";

    const props = defineProps({
        isCollapsed:{type: Boolean,},
        icon:{type:String},
        text:{type:String,},
        link:{type:String,},
        colorTheme:{type:String}
    })
 const styleObject = computed(()=>{return {
    color:convertHexToAccentColor(props.colorTheme!)
}})
const computeScale = computed(()=>props.isCollapsed?"2":"1.5")

</script>
<template >
    <li v-if="isCollapsed" class="list-none  font-bold font-special items-center flex   " :style="styleObject">
        <a :href="link" class=" flex items-center p-3 mx-auto rounded-full hover:bg-black/25 transition-all duration-300" :style="styleObject">
            <v-icon :name="icon" :scale="computeScale"/>
        </a>
    </li>
    <li v-if="!isCollapsed" class="list-none  font-bold font-special text-2xl items-center flex gap-2  " :style="styleObject">
        <a :href="link" class=" flex items-center gap-2 px-3 py-1.5 w-full rounded-3xl hover:bg-black/25 transition-all duration-300" :style="styleObject">
            <v-icon :name="icon" :scale="computeScale" color="" />
            <span class="text-lg"> {{text}}</span>
        </a>
    </li>
</template>
