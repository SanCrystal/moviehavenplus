<script setup lang="ts">
    import {ref,computed} from "vue";
    const props = defineProps({
        items:{type:String,required:true},
        // selectedArray:{type:Array<string>,required:true}
    })
    const isChecked = ref(false);
    const emit = defineEmits(['update:selectedArray']);
    const computedChecked= computed(()=>isChecked.value?"text-primary":"")

    // Function to add a new item to the array
    const addItem = () => {
        emit('update:selectedArray', {type:"add",data:props.items});
    };

    // Function to remove an item from the array by index
    const removeItem = () => {
        emit('update:selectedArray', {type:"remove",data:props.items});
    };
    const toggleChecked = ()=>{
        isChecked.value = !isChecked.value;
        isChecked.value ?addItem():removeItem();
    }
</script>
<template >
        <div class="flex gap-2 text-base font-semibold"  @click="toggleChecked()">
            <input type="checkbox" :checked="isChecked" class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-full outline-ring focus:ring-white dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <!-- :TODO revisit this input element and debug the styling -->
            <label :class="['',computedChecked]" >{{items}}</label>
        </div>
</template>
