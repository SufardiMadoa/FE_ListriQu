<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <CreateUnit :onSuccess="refetch" />

        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path fill="currentColor"
                            d="M6 1a3 3 0 0 0-2.83 2H0v2h3.17a3.001 3.001 0 0 0 5.66 0H16V3H8.83A3 3 0 0 0 6 1M5 4a1 1 0 1 1 2 0a1 1 0 0 1-2 0m5 5a3 3 0 0 0-2.83 2H0v2h7.17a3.001 3.001 0 0 0 5.66 0H16v-2h-3.17A3 3 0 0 0 10 9m-1 3a1 1 0 1 1 2 0a1 1 0 0 1-2 0" />
                    </svg>
                    <h2 class="text-lg font-semibold text-gray-900">Master Unit</h2>
                </div>
                <div class="flex items-center space-x-3">
                    <button
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium disabled:bg-[#E6E8F0] disabled:text-gray-400"
                        :disabled="selectedIds.length === 0 || isDeleting" @click="handleDeleteSelected">
                        <span v-if="isDeleting">Deleting...</span>
                        <span v-else>Delete</span>
                    </button>
                    <button @click="resetFilters"
                        class="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center space-x-1">
                        <RotateCcw class="w-4 h-4" />
                    </button>
                    <div class="relative">
                        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="text" placeholder="Cari data..." v-model="searchTerm"
                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <button @click="refetch" :disabled="isFetching"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50">
                        <span v-if="isFetching">Searching...</span>
                        <span v-else>Search</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">Loading...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="isError" class="px-6 py-4 bg-red-50 border-l-4 border-red-400">
            <div class="flex">
                <div class="ml-3">
                    <p class="text-sm text-red-700">{{ error?.message || 'Failed to fetch data' }}</p>
                    <button @click="refetch" class="mt-2 text-sm text-red-600 hover:text-red-800 underline">
                        Try again
                    </button>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" />
                        </th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            <button @click="handleSort('unitName')"
                                class="flex items-center space-x-1 hover:text-gray-700">
                                <span>Nama Unit</span>
                                <span class="text-gray-400">{{ getSortIcon('unitName') }}</span>
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                </svg>
                            </button>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button @click="handleSort('unitCode')"
                                class="flex items-center space-x-1 hover:text-gray-700">
                                <span>Kode Unit</span>
                                <span class="text-gray-400">{{ getSortIcon('unitCode') }}</span>
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                </svg>
                            </button>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button @click="handleSort('address')"
                                class="flex items-center space-x-1 hover:text-gray-700">
                                <span>Address</span>
                                <span class="text-gray-400">{{ getSortIcon('address') }}</span>
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                </svg>
                            </button>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button @click="handleSort('status')"
                                class="flex items-center space-x-1 hover:text-gray-700">
                                <span>Status</span>
                                <span class="text-gray-400">{{ getSortIcon('status') }}</span>
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                </svg>
                            </button>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <template v-for="item in paginatedData" :key="item.unitId">
                        <!-- Parent Row -->
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4">
                                <input type="checkbox" :value="item.unitId" v-model="selectedIds" />
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <button v-if="item.children && item.children.length > 0"
                                        @click="toggleExpand(item.unitId)" class="mr-2 p-1 hover:bg-gray-200 rounded">
                                        <ChevronDown v-if="expandedRows.has(item.unitId)"
                                            class="w-4 h-4 text-gray-500" />
                                        <ChevronRight v-else class="w-4 h-4 text-gray-500" />
                                    </button>
                                    <div v-else class="w-6 h-6 mr-2"></div>
                                    <div class="flex items-center">
                                        <div
                                            class="w-4 h-4 bg-orange-100 rounded-sm flex items-center justify-center mr-2">
                                            <div class="w-2 h-2 bg-orange-500 rounded-sm"></div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-900">{{ item.unitName }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ item.unitCode }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ item.address || '-' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="[
                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                    item.status === 'Active'
                                        ? 'bg-green-100 text-green-800 border-green-600 border-2 '
                                        : 'bg-red-100 text-red-800'
                                ]">
                                    {{ item.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button @click="editUnit(item)"
                                    class="inline-flex items-center w-[70px] h-[24] px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs disabled:opacity-50">
                                    <Edit class="w-3 h-3 mr-1" />
                                    Edit
                                </button>
                            </td>
                        </tr>

                        <!-- Child Rows (Accordion Content) -->
                        <template v-if="expandedRows.has(item.unitId) && item.children && item.children.length > 0">
                            <tr v-for="child in item.children" :key="child.unitId" class="bg-blue-50">
                                <td class="px-6 py-3">
                                    <input type="checkbox" :value="child.unitId" v-model="selectedIds" />
                                </td>
                                <td class="px-6 py-3 whitespace-nowrap">
                                    <div class="flex items-center ml-8">
                                        <div
                                            class="w-4 h-4 bg-blue-100 rounded-sm flex items-center justify-center mr-2">
                                            <div class="w-2 h-2 bg-blue-500 rounded-sm"></div>
                                        </div>
                                        <span class="text-sm text-gray-700">{{ child.unitName }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {{ child.unitCode }}
                                </td>
                                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {{ child.address || '-' }}
                                </td>
                                <td class="px-6 py-3 whitespace-nowrap">
                                    <span :class="[
                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                        child.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ child.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium">
                                    <button @click="editUnit(child)"
                                        class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs disabled:opacity-50">
                                        <Edit class="w-3 h-3 mr-1" />
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-700">
                Showing {{ startIndex + 1 }} to {{ Math.min(startIndex + itemsPerPage, filteredAndSortedData.length) }}
                of {{ filteredAndSortedData.length }} entries
            </div>
            <div class="flex items-center space-x-2">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                    'px-3 py-1 rounded-md text-sm',
                    currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]">
                    {{ page }}
                </button>
            </div>
        </div>

        <!-- Edit Modal -->
        <EditFormModal :show="showModal" :formType="formType" :parentUnits="data" :editData="editData"
            @close="closeModal" @submit="handleSubmit" @success="handleSuccess" @error="handleError" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { ChevronDown, ChevronRight, Edit, Search, RotateCcw } from 'lucide-vue-next'
import { masterUnitService } from '@/services/masterUnitServie'
import EditFormModal from '../admin/master_unit/EditFormModal.vue'
import CreateUnit from '../admin/master_unit/CreateUnit.vue'

const queryClient = useQueryClient()

// Reactive state
const selectedIds = ref([])
const searchTerm = ref('')
const sortConfig = ref({ key: null, direction: 'asc' })
const expandedRows = ref(new Set())
const currentPage = ref(1)
const itemsPerPage = 10
const isDeleting = ref(false)

// Modal states
const showModal = ref(false)
const formType = ref('parent')
const parentUnits = ref([])
const editData = ref(null)

// Query for fetching units
const {
    data: unitsData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
} = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
        const response = await masterUnitService.getUnits()
        return response.data
    },
    select: (flatData) => {
        if (!flatData || !Array.isArray(flatData)) return []

        const unitsById = {}
        const processedData = flatData.map(unit => ({
            ...unit,
            children: []
        }))

        processedData.forEach(unit => {
            unitsById[unit.unitId] = unit
        })

        const hierarchicalData = []

        processedData.forEach(unit => {
            if (unit.parentUnitId && unitsById[unit.parentUnitId]) {
                unitsById[unit.parentUnitId].children.push(unit)
            } else {
                hierarchicalData.push(unit)
            }
        })

        return hierarchicalData
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
})

// Mutations
const updateUnitMutation = useMutation({
    mutationFn: ({ id, data }) => masterUnitService.updateUnit(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['units'] })
    },
    onError: (error) => {
        console.error('Error updating unit:', error)
    }
})

const deleteUnitMutation = useMutation({
    mutationFn: (id) => masterUnitService.deleteUnit(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['units'] })
        selectedIds.value = []
    },
    onError: (error) => {
        console.error('Error deleting unit:', error)
    }
})

// Computed properties
const data = computed(() => unitsData.value || [])
const isUpdatePending = computed(() => updateUnitMutation.isPending)

const isAllSelected = computed(() => {
    if (paginatedData.value.length === 0) return false
    return paginatedData.value.every(item => selectedIds.value.includes(item.unitId))
})

const filteredAndSortedData = computed(() => {
    if (!data.value) return []

    const searchLower = searchTerm.value.toLowerCase()

    const unitMatches = (unit) => {
        if (!unit) return false
        return unit.unitName?.toLowerCase().includes(searchLower) ||
            unit.unitCode?.toLowerCase().includes(searchLower) ||
            unit.address?.toLowerCase().includes(searchLower) ||
            unit.status?.toLowerCase().includes(searchLower)
    }

    let filtered = data.value.filter(parent => {
        if (unitMatches(parent)) return true
        if (parent.children && parent.children.some(unitMatches)) return true
        return false
    })

    if (sortConfig.value.key) {
        filtered.sort((a, b) => {
            const aVal = a[sortConfig.value.key] || ''
            const bVal = b[sortConfig.value.key] || ''

            if (aVal < bVal) {
                return sortConfig.value.direction === 'asc' ? -1 : 1
            }
            if (aVal > bVal) {
                return sortConfig.value.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }

    return filtered
})

const totalPages = computed(() => Math.ceil(filteredAndSortedData.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const paginatedData = computed(() =>
    filteredAndSortedData.value.slice(startIndex.value, startIndex.value + itemsPerPage)
)

// Methods
const toggleSelectAll = () => {
    const currentParentIds = paginatedData.value.map(item => item.unitId)
    let newSelectedIds = [...selectedIds.value]

    if (isAllSelected.value) {
        newSelectedIds = newSelectedIds.filter(id => !currentParentIds.includes(id))
        paginatedData.value.forEach(parent => {
            if (parent.children) {
                parent.children.forEach(child => {
                    newSelectedIds = newSelectedIds.filter(childId => childId !== child.unitId)
                })
            }
        })
    } else {
        currentParentIds.forEach(id => {
            if (!newSelectedIds.includes(id)) {
                newSelectedIds.push(id)
            }
        })
    }
    selectedIds.value = [...new Set(newSelectedIds)]
}

const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.value.key === key && sortConfig.value.direction === 'asc') {
        direction = 'desc'
    }
    sortConfig.value = { key, direction }
}

const toggleExpand = (unitId) => {
    const newExpanded = new Set(expandedRows.value)
    if (newExpanded.has(unitId)) {
        newExpanded.delete(unitId)
    } else {
        newExpanded.add(unitId)
    }
    expandedRows.value = newExpanded
}

const resetFilters = () => {
    searchTerm.value = ''
    sortConfig.value = { key: null, direction: 'asc' }
    currentPage.value = 1
}

const getSortIcon = (columnKey) => {
    if (sortConfig.value.key !== columnKey) return ''
    return sortConfig.value.direction === 'asc' ? '↑' : '↓'
}

const editUnit = (unit) => {
    editData.value = unit
    formType.value = unit.parentUnitId ? 'child' : 'parent'
    showModal.value = true
}

const handleDeleteSelected = async () => {
    if (selectedIds.value.length === 0) return

    if (confirm(`Are you sure you want to delete ${selectedIds.value.length} unit(s)?`)) {
        isDeleting.value = true
        try {
            await Promise.all(
                selectedIds.value.map(id => deleteUnitMutation.mutateAsync(id))
            )
            selectedIds.value = []
        } catch (error) {
            console.error('Delete error:', error)
        } finally {
            isDeleting.value = false
        }
    }
}

const handleSubmit = (data) => {
    if (editData.value) {
        updateUnitMutation.mutate({ id: editData.value.unitId, data })
    }
}

const handleSuccess = () => {
    showModal.value = false
    refetch()
}

const handleError = (msg) => {
    alert(msg)
}

const closeModal = () => {
    showModal.value = false
    editData.value = null
}

// Expose functions for external use
defineExpose({
    refetch,
    isUpdatePending
})
</script>