<template>
    <div class="relative">
        <button class="p-2 text-gray-400 hover:text-gray-600 relative">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-5-5h5l-5-5-5 5h5l-5 5z" />
            </svg>
            <span v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ notificationCount }}
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'NotificationButton',
    props: {
        notificationCount: {
            type: Number,
            default: 3
        }
    }
}
</script>