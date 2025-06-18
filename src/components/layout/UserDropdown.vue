<template>
    <div class="relative">
        <button @click="toggleDropdown"
            class="flex items-center text-sm rounded-full text-gray-600 hover:text-gray-900 focus:outline-none">
            <span class="rounded-full bg-gray-200 p-2">

                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="4"
                        d="M24 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14M6 40.8V42h36v-1.2c0-4.48 0-6.72-.872-8.432a8 8 0 0 0-3.496-3.496C35.92 28 33.68 28 29.2 28H18.8c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C6 34.08 6 36.32 6 40.8" />
                </svg>
            </span>
            <div class="ml-2 text-left">
                <div class="text-sm font-medium text-gray-900">{{ userName }}</div>
                <div class="text-xs text-gray-500">{{ userRole }}</div>
            </div>
            <svg class="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-show="dropdownOpen"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div class="py-1">
                <a v-for="item in menuItems" :key="item.label" :href="item.href"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="handleMenuClick(item)">
                    {{ item.label }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService' // Adjust path as needed

export default {
    name: 'UserDropdown',
    props: {
        userName: {
            type: String,
            default: 'M. Fakhruroji'
        },
        userRole: {
            type: String,
            default: 'Super Admin'
        },
        userAvatar: {
            type: String,
            default: 'https://via.placeholder.com/32'
        },
        menuItems: {
            type: Array,
            default: () => [
                { label: 'Profile', href: '#' },
                { label: 'Settings', href: '#' },
                { label: 'Logout', href: '#' }
            ]
        }
    },
    setup() {
        const router = useRouter()
        const dropdownOpen = ref(false)

        const toggleDropdown = () => {
            dropdownOpen.value = !dropdownOpen.value
        }

        const handleMenuClick = async (item) => {
            if (item.label === 'Logout') {
                try {
                    await authService.logout()
                    // Clear any other user-related data from localStorage if needed
                    localStorage.removeItem('token') // Or your specific token key
                    // Redirect to login page or home page
                    router.push({ name: 'Login' }) // Ensure you have a route named 'Login'
                } catch (error) {
                    console.error('Logout failed:', error)
                    // Optionally, show an error message to the user
                }
            }
            dropdownOpen.value = false
        }

        const handleClickOutside = (event) => {
            if (dropdownOpen.value && !event.target.closest('.relative')) {
                dropdownOpen.value = false
            }
        }

        onMounted(() => {
            document.addEventListener('click', handleClickOutside)
        })

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside)
        })

        return {
            dropdownOpen,
            toggleDropdown,
            handleMenuClick
        }
    }
}
</script>