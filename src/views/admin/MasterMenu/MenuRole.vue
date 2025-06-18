<template>
    <RoleManagement />

</template>

<script>

import RoleManagement from '@/components/master/RoleManagement.vue';

export default {
    name: 'RoleManagementPage',
    components: {
        RoleManagement,
    },
}
</script>

<style scoped>
/* Custom styles if needed */
.container {
    max-width: 1200px;
}

/* Transition effects */
.transition-colors {
    transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

/* Checkbox styling */
input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
}

/* Button hover effects */
button:hover {
    transform: translateY(-1px);
    transition: transform 0.1s ease-in-out;
}

/* Card shadow on hover */
.border:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s ease-in-out;
}
</style>