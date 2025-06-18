<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div class="text-center max-w-md mx-auto">
            <!-- Simple Electric Icon -->
            <div class="mb-8">
                <div class="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <svg class="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
            </div>

            <!-- 404 Text -->
            <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>

            <!-- Error Message -->
            <h2 class="text-xl font-semibold text-gray-700 mb-3">
                Halaman Tidak Ditemukan
            </h2>
            <p class="text-gray-500 mb-8 leading-relaxed">
                Maaf, halaman yang Anda cari tidak tersedia dalam sistem ListriQu.
            </p>

            <!-- PLN Badge -->
            <div class="mb-8">
                <div
                    class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                    <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </div>
                    <span class="text-gray-700 text-sm font-medium">ListriQu System</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
                <button @click="goHome"
                    class="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Kembali ke Beranda
                </button>

                <button @click="goBack"
                    class="w-full px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                    Halaman Sebelumnya
                </button>
            </div>

            <!-- Status -->
            <div class="mt-8 text-xs text-gray-400">
                <p class="flex items-center justify-center gap-1">
                    <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                    Error 404 - ListriQu Network
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'NotFound',
    setup() {
        const router = useRouter()

        const goHome = () => {
            router.push('/dashboard')
        }

        const goBack = () => {
            window.history.back()
        }

        return {
            goHome,
            goBack
        }
    }
}
</script>

<style scoped>
/* Minimal custom styles - mostly using Tailwind */
</style>