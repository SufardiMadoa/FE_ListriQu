<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <!-- Logo -->
                <div class="text-left mb-8">
                    <img src="/public/logo.png" width="180">
                </div>

                <!-- Welcome Text -->
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-1">Hi, Welcome</h2>
                    <p class="text-sm text-gray-500">It's good to see you again</p>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin">
                    <div class="space-y-4">
                        <!-- Username -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input type="text" v-model="form.username"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Input username" required>
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div class="relative">
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                    class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Input your password" required>
                                <button type="button" @click="showPassword = !showPassword"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                    <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div v-if="errorMessage" class="text-red-600 text-sm">
                            {{ errorMessage }}
                        </div>

                        <!-- Forgot Password -->
                        <div class="text-left">
                            <span>Forgot your password?</span>
                            <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
                                Click here
                            </a>
                        </div>

                        <!-- Login Button -->
                        <button type="submit" :disabled="loading"
                            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ loading ? 'Signing In...' : 'Sign In' }}
                        </button>

                        <!-- Register Link -->
                        <div class="text-center">
                            <span class="text-sm text-gray-600">Don't have an account? </span>
                            <RouterLink to="/register" class="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                Register
                            </RouterLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService' // sesuaikan path jika berbeda
import api from '@/api/axios'// untuk set default header

export default {
    name: 'LoginPage',
    setup() {
        const router = useRouter()
        const loading = ref(false)
        const showPassword = ref(false)
        const errorMessage = ref('')

        const form = ref({
            username: '',
            password: ''
        })

        const handleLogin = async () => {
            loading.value = true
            errorMessage.value = ''

            try {
                const response = await authService.login(form.value)
                const { data } = response.data

                // Simpan token dan data user ke localStorage
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data))
                localStorage.setItem("menus", JSON.stringify(data.menus))

                // Set default Authorization header untuk Axios
                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

                // Arahkan ke dashboard (ganti path sesuai dengan role kalau mau)
                router.push('/dashboard')
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage.value = error.response.data.message
                } else {
                    errorMessage.value = 'Login failed. Please try again.'
                }
            } finally {
                loading.value = false
            }
        }
        return {
            form,
            loading,
            showPassword,
            errorMessage,
            handleLogin
        }
    }
}
</script>
