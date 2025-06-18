<template>
    <div>
        <ListriquLayout>
            <v-main>
                <router-view />
            </v-main>
        </ListriquLayout>
    </div>
</template>

<script scoped>
import ListriquLayout from './ListriquLayout.vue';


export default {
    name: 'AdminLayout',
    components: {
        ListriquLayout,
    },
}
</script>

<style scoped>
/* Optional styling */
main {
    padding: 1rem;
}
</style>
