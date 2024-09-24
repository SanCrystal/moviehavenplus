<script setup lang="ts">
    import { ref,computed } from 'vue';
    import { GenreList } from './Search/data';
    import GenreItem from './Search/GenreItem.vue';
    import { Years,Popularity } from './Search/data';
    import Item from './Search/Item.vue';

    const showdrop = ref(false);
    const selectedYear = ref<number>(new Date().getFullYear());
    const selectedPopularity = ref<string>("");
    const selectedArray = ref<string[]>([]);
    const titleRef = ref<string>("");
    const flip = ref("");
    const showed = computed(()=>showdrop.value?"rounded-t-3xl rounded-b-none":"rounded-full")
    const props = defineProps({
        icon:{type:String},
        text:{type:String},
        hasDropdown:{type:Boolean},
    })
    const emit =  defineEmits(["searchquerydata"]);
    const toggleDropDown = ()=>{
        showdrop.value = !showdrop.value
        flip.value = showdrop.value?"vertical":""
    }

    const updateArray = (action:{type:string;data:string})=>{
        const index = selectedArray.value.indexOf(action?.data);
        if(action.type == "add" && index == -1){
            selectedArray.value.push(action?.data)
        }
        if(action.type == "remove" && index >-1){
            selectedArray.value.splice(index, 1);
        }
        emit("searchquerydata",{key:"genre",value:selectedArray.value})
    }
    const updateYear = (year:number)=>{
        selectedYear.value = year;
        emit("searchquerydata",{key:"year",value:selectedYear.value})
    }
    const updatePopularity = ({value,valueCap}:{value:number,valueCap:number})=>{
        selectedPopularity.value = `${value}-${valueCap}`;
        emit("searchquerydata",{key:"popularity",value:selectedPopularity.value})
    }
    const updateTitle =(event:Event)=>{
        const e = event.target as HTMLInputElement;
        titleRef.value = e.value;
         emit("searchquerydata",{key:"title",value:titleRef.value})
    }
</script>
<template >
    <div v-if="props.hasDropdown" :class="['w-full min-w-24  bg-accentPrimary py-0.5 rounded-full relative',showed]">
        <div class="w-full justify-between mx-auto flex items-center py-1.5 px-3 pl-4" @click="toggleDropDown" >
            <span class="font-semibold font-head text-xl">{{props.text}}</span>
            <div  class="h-8 w-8 flex items-center justify-center rounded-full bg-primary/50">


            <v-icon  name="md-keyboarddoublearrowdown-sharp" :flip="flip" speed="slow" class="transition-all duration-300"></v-icon>
            </div>
        </div>
        
        <div v-if="props.hasDropdown && showdrop" class="transition-all duration-700 bg-accentPrimary  dark:bg-accentPrimary  absolute w-full p-4 rounded-b-3xl max-h-[70vh] overflow-y-scroll pb-4">
            <!-- genre data -->
            <div class="space-y-2" v-if="props.text?.toLowerCase() == 'genre'">
                <GenreItem v-for="items in GenreList"  :items="items" @update:selectedArray="updateArray"/>
            </div>
            <!-- year  -->
            <Item v-if="props.text?.toLowerCase() == 'year' && props.text?.toLowerCase() != 'title'"  text="year" :year="year"  @updateYear="updateYear"  v-for="year in Years " />
            <!-- year | popularity -->
            <Item v-if="props.text?.toLowerCase() == 'popularity'" text="popularity" :item="items.item" :value="items.value" :valueCap="items.valueCap" v-for="items in Popularity" @updatePopularity="updatePopularity" />
        </div>

    </div>
    <div  v-if="props.text?.toLowerCase() == 'title'" class="w-full min-w-24  bg-accentPrimary py-0.5 rounded-full relative flex items-center" >
        <!-- title  -->
        <input  type="text" placeholder="Enter movie title"  value="" @change="updateTitle" class="placeholder:text-white w-[98%] mx-auto rounded-full h-11 py-1.5 px-3 pl-4 focus:ring-1 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary"/>
    </div>

</template>
