<template>
    <nav class="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <div class="text-2xl font-bold">
                        <img src="/logo.png" alt="">
                    </div>
                </div>

                <!-- Right Side - Notification & User -->
                <div class="flex items-center space-x-4">
                    <!-- Notification -->
                    <NotificationButton />

                    <!-- User Menu -->
                    <UserDropdown />
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import NotificationButton from './NotificationButton.vue'
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'AppNavbar',
    components: {
        NotificationButton,
        UserDropdown
    }
}
</script>