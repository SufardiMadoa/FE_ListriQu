<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <!-- Logo -->
                <div class="text-center mb-8">
                    <div class="text-3xl font-bold mb-2">
                        <span class="text-blue-600">Listri</span><span class="text-orange-400">Qu</span>
                    </div>
                    <div class="text-sm text-gray-500">ENERGY DIGITAL ECOSYSTEM</div>
                </div>

                <!-- Welcome Text -->
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-1">Create Account</h2>
                    <p class="text-sm text-gray-500">Join our energy digital ecosystem</p>
                </div>

                <!-- Register Form -->
                <form @submit.prevent="handleRegister">
                    <div class="space-y-4">
                        <!-- Full Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" v-model="form.fullname"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your full name" required>
                            <span v-if="errors.fullname" class="text-red-500 text-xs">{{ errors.fullname }}</span>
                        </div>

                        <!-- Username -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input type="text" v-model="form.username" @blur="validateUsername"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Choose a username" required>
                            <span v-if="errors.username" class="text-red-500 text-xs">{{ errors.username }}</span>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" v-model="form.email" @blur="validateEmail"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email address" required>
                            <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" v-model="form.phone" @blur="validatePhone"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your phone number" required>
                            <span v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</span>
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div class="relative">
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                    @blur="validatePassword"
                                    class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Create a strong password" required>
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
                            <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>

                            <!-- Password Strength Indicator -->
                            <div class="mt-2">
                                <div class="flex space-x-1">
                                    <div v-for="i in 4" :key="i" class="h-1 flex-1 rounded-full"
                                        :class="getPasswordStrengthClass(i)"></div>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">{{ passwordStrengthText }}</p>
                            </div>
                        </div>

                        <!-- Confirm Password -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div class="relative">
                                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword"
                                    @blur="validateConfirmPassword"
                                    class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Confirm your password" required>
                                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                    <svg v-if="!showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor"
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
                            <span v-if="errors.confirmPassword" class="text-red-500 text-xs">{{ errors.confirmPassword
                            }}</span>
                        </div>

                        <!-- Terms and Conditions -->
                        <div class="flex items-start">
                            <input id="terms" type="checkbox" v-model="form.agreeToTerms"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1" required>
                            <label for="terms" class="ml-2 block text-sm text-gray-600">
                                I agree to the
                                <a href="#" class="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
                                and
                                <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                            </label>
                        </div>

                        <!-- Error Message -->
                        <div v-if="errorMessage" class="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                            {{ errorMessage }}
                        </div>

                        <!-- Success Message -->
                        <div v-if="successMessage" class="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                            {{ successMessage }}
                        </div>

                        <!-- Register Button -->
                        <button type="submit" :disabled="loading || !isFormValid"
                            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ loading ? 'Creating Account...' : 'Create Account' }}
                        </button>

                        <!-- Login Link -->
                        <div class="text-center">
                            <span class="text-sm text-gray-600">Already have an account? </span>
                            <RouterLink to="/login" class="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                Sign In
                            </RouterLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'RegisterPage',
    setup() {
        const router = useRouter()
        const loading = ref(false)
        const showPassword = ref(false)
        const showConfirmPassword = ref(false)
        const errorMessage = ref('')
        const successMessage = ref('')

        const form = ref({
            fullname: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false
        })

        const errors = ref({
            fullname: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        })

        // Password strength calculation
        const passwordStrength = computed(() => {
            const password = form.value.password
            let score = 0

            if (password.length >= 8) score++
            if (/[a-z]/.test(password)) score++
            if (/[A-Z]/.test(password)) score++
            if (/[0-9]/.test(password)) score++
            if (/[^A-Za-z0-9]/.test(password)) score++

            return Math.min(score, 4)
        })

        const passwordStrengthText = computed(() => {
            const strength = passwordStrength.value
            if (strength === 0) return 'Very Weak'
            if (strength === 1) return 'Weak'
            if (strength === 2) return 'Fair'
            if (strength === 3) return 'Good'
            return 'Strong'
        })

        const isFormValid = computed(() => {
            return form.value.fullname &&
                form.value.username &&
                form.value.email &&
                form.value.phone &&
                form.value.password &&
                form.value.confirmPassword &&
                form.value.agreeToTerms &&
                !Object.values(errors.value).some(error => error)
        })

        // Validation functions
        const validateUsername = () => {
            const username = form.value.username
            if (username.length < 3) {
                errors.value.username = 'Username must be at least 3 characters'
            } else if (!/^[a-zA-Z0-9._]+$/.test(username)) {
                errors.value.username = 'Username can only contain letters, numbers, dots, and underscores'
            } else {
                errors.value.username = ''
            }
        }

        const validateEmail = () => {
            const email = form.value.email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                errors.value.email = 'Please enter a valid email address'
            } else {
                errors.value.email = ''
            }
        }

        const validatePhone = () => {
            const phone = form.value.phone
            const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
            if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
                errors.value.phone = 'Please enter a valid Indonesian phone number'
            } else {
                errors.value.phone = ''
            }
        }

        const validatePassword = () => {
            const password = form.value.password
            if (password.length < 8) {
                errors.value.password = 'Password must be at least 8 characters'
            } else {
                errors.value.password = ''
            }
        }

        const validateConfirmPassword = () => {
            if (form.value.password !== form.value.confirmPassword) {
                errors.value.confirmPassword = 'Passwords do not match'
            } else {
                errors.value.confirmPassword = ''
            }
        }

        const getPasswordStrengthClass = (index) => {
            const strength = passwordStrength.value
            if (index <= strength) {
                if (strength <= 1) return 'bg-red-500'
                if (strength === 2) return 'bg-yellow-500'
                if (strength === 3) return 'bg-blue-500'
                return 'bg-green-500'
            }
            return 'bg-gray-200'
        }

        const handleRegister = async () => {
            loading.value = true
            errorMessage.value = ''
            successMessage.value = ''

            // Validate all fields
            validateUsername()
            validateEmail()
            validatePhone()
            validatePassword()
            validateConfirmPassword()

            if (!isFormValid.value) {
                loading.value = false
                errorMessage.value = 'Please correct the errors above'
                return
            }

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000))

                // Mock registration success
                successMessage.value = 'Account created successfully! Redirecting to login...'

                // Redirect to login after 2 seconds
                setTimeout(() => {
                    router.push('/login')
                }, 2000)

                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                errorMessage.value = 'Registration failed. Please try again.'
            } finally {
                loading.value = false
            }
        }

        // Watch for password changes to validate confirm password
        watch(() => form.value.password, () => {
            if (form.value.confirmPassword) {
                validateConfirmPassword()
            }
        })

        return {
            form,
            errors,
            loading,
            showPassword,
            showConfirmPassword,
            errorMessage,
            successMessage,
            passwordStrength,
            passwordStrengthText,
            isFormValid,
            validateUsername,
            validateEmail,
            validatePhone,
            validatePassword,
            validateConfirmPassword,
            getPasswordStrengthClass,
            handleRegister
        }
    }
}
</script>