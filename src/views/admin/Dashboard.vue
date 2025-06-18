<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Header -->


        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 class="text-red-800 font-medium">Error loading dashboard data</h3>
                        <p class="text-red-600 text-sm mt-1">Please try refreshing the page or contact support if the
                            problem persists.</p>
                    </div>
                </div>
            </div>

            <!-- Dashboard Content -->
            <div v-else>
                <!-- Stats Overview -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-blue-100 rounded-lg">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Roles</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalRoles }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-green-100 rounded-lg">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Users</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-purple-100 rounded-lg">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                    </path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Units</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUnits }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-orange-100 rounded-lg">
                                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Menus</p>
                                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalMenus }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->


                <!-- Data Tables -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <!-- Roles Table -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900">Roles & Users</h3>
                            <span v-if="rolesQuery.isFetching" class="text-sm text-blue-600">Loading...</span>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role Name</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Users Count</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="role in rolesData" :key="role.role_id">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span class="text-sm font-medium text-blue-600">{{
                                                        role.role_name?.charAt(0)?.toUpperCase() || 'R' }}</span>
                                                </div>
                                                <div class="ml-3">
                                                    <div class="text-sm font-medium text-gray-900">{{ role.role_name ||
                                                        'Unknown Role' }}</div>
                                                    <div class="text-sm text-gray-500">{{ role.role_code || 'N/A' }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {{ role.users?.length || 0 }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Units Table -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900">Units</h3>
                            <span v-if="unitsQuery.isFetching" class="text-sm text-blue-600">Loading...</span>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Unit Name</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Code</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="unit in unitsData" :key="unit.unitId">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <span class="text-sm font-medium text-purple-600">{{
                                                        unit.unitName?.charAt(0)?.toUpperCase() || 'U' }}</span>
                                                </div>
                                                <div class="ml-3">
                                                    <div class="text-sm font-medium text-gray-900">{{ unit.unitName ||
                                                        'Unknown Unit' }}</div>
                                                    <div class="text-sm text-gray-500">ID: {{ unit.unitId }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {{ unit.unitCode || 'N/A' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                                            {{ unit.address || 'N/A' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                                :class="unit.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                                {{ unit.status || 'Unknown' }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { roleService } from '@/services/roleService' // Adjust import path as needed
import { masterUnitService } from '@/services/masterUnitServie' // Adjust import path as needed

export default {
    name: 'AdminDashboard',
    setup() {
        // Refs for chart canvases


        // Chart instances
        let roleChart = null
        let menuChart = null

        // Vue Query for Roles
        const rolesQuery = useQuery({
            queryKey: ['roles'],
            queryFn: async () => {
                const response = await roleService.getAllRolesWithUsers()
                return response.data?.data || response.data || []
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retry: 2,
            refetchOnWindowFocus: false
        })

        // Vue Query for Units
        const unitsQuery = useQuery({
            queryKey: ['units'],
            queryFn: async () => {
                const response = await masterUnitService.getUnits()
                return response.data || []
            },
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false
        })

        // Vue Query for Menus
        const menusQuery = useQuery({
            queryKey: ['menus'],
            queryFn: async () => {
                const response = await roleService.getAllMenus()
                return response.data?.data || response.data || []
            },
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false
        })

        // Computed properties for data
        const rolesData = computed(() => rolesQuery.data.value || [])
        const unitsData = computed(() => unitsQuery.data.value || [])
        const menusData = computed(() => menusQuery.data.value || [])

        // Loading states
        const isLoading = computed(() =>
            rolesQuery.isLoading.value || unitsQuery.isLoading.value || menusQuery.isLoading.value
        )

        const isRefetching = computed(() =>
            rolesQuery.isFetching.value || unitsQuery.isFetching.value || menusQuery.isFetching.value
        )

        const hasError = computed(() =>
            rolesQuery.isError.value || unitsQuery.isError.value || menusQuery.isError.value
        )

        // Statistics
        const stats = computed(() => {
            const roles = rolesData.value
            const units = unitsData.value
            const menus = menusData.value

            return {
                totalRoles: roles.length,
                totalUsers: roles.reduce((sum, role) => sum + (role.users?.length || 0), 0),
                totalUnits: units.length,
                totalMenus: menus.length
            }
        })


        // Refetch all data
        const refetchAll = async () => {
            await Promise.all([
                rolesQuery.refetch(),
                unitsQuery.refetch(),
                menusQuery.refetch()
            ])
        }

        // Initialize charts on mount
        onMounted(() => {
            // Wait a bit for Chart.js to be fully loaded
            setTimeout(() => {
                initCharts()
            }, 100)
        })

        return {
            // Data
            rolesData,
            unitsData,
            menusData,
            stats,

            // Loading states
            isLoading,
            isRefetching,
            hasError,

            // Queries (for accessing loading states in template)
            rolesQuery,
            unitsQuery,
            menusQuery,

            // Methods
            refetchAll
        }
    }
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.3s ease-out;
}

/* Chart container styling */
.chart-container {
    position: relative;
    height: 250px;
    width: 100%;
}

/* Custom scrollbar for tables */
.overflow-x-auto::-webkit-scrollbar {
    height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Hover effects for cards */
.bg-white:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
}

/* Loading pulse animation */
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>