<template >
    <div>
        <h1>{{props.category}}</h1>
        <ul>
            <li v-for="movie in props.movies">
                <div>
                    {{ movie.title }}
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
    import { Movie } from '@/interfaces/interface.g';
    interface ListProps {
        category: string;
        movies:Array<Movie>;
    }
    const props = defineProps<ListProps>()
</script>
