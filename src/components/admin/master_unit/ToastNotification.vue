<!-- ToastNotification.vue -->
<template>
    <div v-if="show" class="absolute top-80 left-150 right-150 z-[60] animate-fade-out">
        <div class="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 max-w-sm w-full mx-auto">
            <div class="flex items-center space-x-4">
                <!-- Success Icon -->
                <div v-if="type === 'success'" class="flex-shrink-0">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                    </div>
                </div>

                <!-- Error Icon -->
                <div v-else-if="type === 'error'" class="flex-shrink-0">
                    <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>

                <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900">{{ title }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ message }}</p>
                </div>
            </div>

            <!-- OK Button -->
            <div class="mt-4 flex justify-end">
                <button @click="$emit('close')"
                    class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                    Oke
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'success',
        validator: (value) => ['success', 'error'].includes(value)
    },
    title: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }
})

defineEmits(['close'])
</script>

<style scoped>
@keyframes fade-out {
    0% {
        opacity: 0;
        transform: scale(0.8) translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-fade-out {
    animation: fade-out 0.4s ease-out;
}
</style>