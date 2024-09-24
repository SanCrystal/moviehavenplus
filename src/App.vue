<script setup lang="ts">
import { ref,computed } from 'vue';
import { useFetch } from '@vueuse/core'
import Navigation from "@/components/Navigation/Index.vue";
import { getAverageColor } from '@/utils/utils';
import {searchData} from "@/components/Search/data";
import SearchComp from './components/SearchComp.vue';
import { Movie,
  FetchedMovies
 } from './interfaces/interface.g';
import { getMyToken } from '@/utils/utils';

const theme = ref("bg-[#16213E]/60")
const colorTheme = ref("#F652A0")
const imageT = ref(null)
const isCollapsed = ref(true);
const previewImageData = ref<{image:string}>({image:""})
const searchQueryDataRaw = ref<{genre?:string[],popularity?:string,title?:string,year?:number}>({genre:[],popularity:"",year:new Date().getFullYear(), title:""})
const computedTheme = computed(()=>theme.value =="bg-[#16213E]/60"? "bg-[#16213E]/60": theme.value)
const computedColorTheme= computed(()=>colorTheme.value =="#16213E"? "#16213E": colorTheme.value)
const collapsed = computed(()=>isCollapsed.value?"w-28":"w-52")
const collapsed1 = computed(()=>isCollapsed.value?"w-[92.4%]":"")


//functions
const setHomeTheme = ()=>{
  const averageColor = getAverageColor(imageT.value)
  const color = averageColor?.bgColor?averageColor.bgColor:theme.value;
  theme.value =color;
  colorTheme.value =  `${averageColor?.textColor?.match(/(?<=\[)[^\]]+(?=\])/g)?.[0]!}`;
}
const fetchsearchquery =({key,value}:{key:string,value:string|number|string[]})=>{
  switch (key) {
    case 'genre':
      searchQueryDataRaw.value = {...searchQueryDataRaw.value,genre:value as string[]};
      break;
    case 'title':
      searchQueryDataRaw.value = {...searchQueryDataRaw.value,title:value as string};
      break;
    case 'year':
      searchQueryDataRaw.value = {...searchQueryDataRaw.value,year:value as number};
      break;
    case 'popularity':
      searchQueryDataRaw.value = {...searchQueryDataRaw.value,popularity:value as string};
      break;
    default:
     return;
  }
  console.log(searchQueryDataRaw.value ,"searchQueryDataRaw")
}

const fetchSearch =()=>{
    console.log("fetchSearch....")
    setTimeout(()=>{
        console.log("fetchSearch completed",searchQueryDataRaw.value)
    },3000)
}

const fetchInitialmovies =():FetchedMovies|null=>{
    const { data, error } = useFetch(" https://api.themoviedb.org/3/discover/movie",{
    
    beforeFetch({ url, options, cancel }) {
        const myToken = getMyToken()

        if (!myToken)
          cancel()

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${myToken}`,
        }
        console.log(options.headers,"headerss",myToken)
        return {
          options,
        }
        
    }
  })
  console.log("errors",error)
  if(!error) return data.value as FetchedMovies;
  return null;
}

console.log(fetchInitialmovies(),"FetchedMovies")
const toggleSideNav =(value:boolean)=>{
    isCollapsed.value = value;
}
</script>

<template>
 <main class="relative bg-[#16213E]/50 backdrop-blur-2xl bg-opacity-50 w-full ">
  <div :class="[computedTheme,'blend-container absolute w-full h-full backdrop-blur-4xl bg-opacity-50 mix-blend-overlay z-0']"></div>
  <div class="relative flex z-10 ">
    <div :class="['navigation relative h-[100vh]',collapsed]">
      <Navigation :colorTheme="computedColorTheme" :isCollapsed="isCollapsed" @updateCollapsedState="toggleSideNav"/>
    </div>
    <div class="component-pages h-[100vh] overflow-y-scroll w-full relative">
      <div :class="['search h-[4.3rem]  px-8 w-[87%] fixed bg-primary/70 bg-opacity-50 z-10',collapsed1]">
        <div class="flex items-center gap-3 w-full  mt-3">

          <div class="flex items-center gap-4 w-full">
            <SearchComp v-for="items in searchData" :key="items.text" :text="items.text" :hasDropdown="items.hasDropDown"  @searchquerydata="fetchsearchquery"/>
            <div  class="ml- relative bg-accentPrimary p-2 rounded-full ">

              <v-icon name="fa-searchengin" scale="1.5" @click="fetchSearch"/>
            </div>
          </div>
        </div>
      </div>
      <div class="preview w-full h-[90%] overflow-hidden bg-cover relative overflow-x-hidden">
        <div class="bg h-full absolute bg-gradient-to-b from-transparent via-transparent to-primary bg-primary/70 w-full bottom-0">
        </div>
        <div class="text-white absolute top-[45%] px-8 z-10 space-y-8">

          <h1 class="font-special text-7xl">Godzilla x Kong: The New Empire</h1>
          <p class="font-head text-2xl leading-9 tracking-wide text-ellipsis max-w-[60%]">Godzilla x Kong: The New Empire","overview":"Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.</p>
          <div class="flex gap-5 relative">

            <button class="px-4 py-2 bg-transparent border border-white rounded-xl min-w-40 flex gap-3 items-center font-semibold hover:scale-105 hover:border-accentPrimary transition-all duration-300" type="button"><v-icon name="bi-play-btn-fill" fill="#F652A0" scale="1.5"></v-icon><span>Play</span></button>
            <button class="px-4 py-2 bg-transparent border border-white rounded-xl min-w-40 flex gap-3 items-center font-semibold hover:scale-105 hover:border-accentPrimary transition-all duration-300" type="button"><v-icon name="ri-information-fill" fill="#F652A0" scale="1.5"></v-icon><span>More Info</span></button>
          </div>
          <div class="text-3xl absolute right-4 top-36  z-10 flex items-center font-bold px-4 py-2 border border-white"><v-icon name="io-person-add-sharp" scale="1.5" fill="#F652A0"></v-icon><span>16</span></div>
        </div>
        <img ref="imageT" src="https://image.tmdb.org/t/p/original/gmGK5Gw5CIGMPhOmTO0bNA9Q66c.jpg" crossorigin="anonymous" alt="" @click="setHomeTheme" class="object-cover h-full w-full z-0">
      </div>
      
      <RouterView></RouterView>
    </div>
  </div>
 </main>
</template>

<style scoped>

</style>
          <!-- <span class="text-accentPrimary font-head font-semibold text-xl text-nowrap">Search by</span> -->