<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden transform transition-all">
            <!-- Header -->
            <div
                class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                :d="isEdit ? pencilPath : plusPath" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-gray-900">
                            {{ isEdit ? 'Edit Unit' : `Add ${formType === 'parent' ? 'Parent' : 'Child'}` }}
                        </h2>
                        <p class="text-sm text-gray-600">
                            {{ isEdit ? 'Update unit information' : 'Create a new organizational unit' }}
                        </p>
                    </div>
                </div>
                <button @click="closeModal"
                    class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="p-6">
                <div class="space-y-3">
                    <!-- Basic Information Section -->
                    <div class="space-y-4">


                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">
                                Unit Code <span class="text-red-500">*</span>
                            </label>
                            <input v-model="formData.unitCode" type="text" placeholder="e.g., DKI" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" />
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">
                                Manager ID <span class="text-red-500">*</span>
                            </label>
                            <input v-model.number="formData.managerId" type="number" placeholder="Manager ID" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" />
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">
                                Unit Name <span class="text-red-500">*</span>
                            </label>
                            <input v-model="formData.unitName" type="text" placeholder="e.g., DKI Jakarta" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" />
                        </div>

                        <div class="">
                            <label class="block text-sm font-medium text-gray-700">
                                Address <span class="text-red-500">*</span>
                            </label>
                            <input v-model="formData.address" placeholder="Enter complete address" required rows="3"
                                class="w-full px-4 py-1  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none" />
                        </div>
                    </div>

                    <!-- Hierarchy & Status Section -->
                    <div class="space-y-1">


                        <div v-if="formType === 'child' || isEdit" class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">
                                Parent Unit <span class="text-red-500">*</span>
                            </label>
                            <select v-model.number="formData.parentUnitId" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white">
                                <option disabled value="">Select Parent Unit</option>
                                <option value="0">No Parent (Root Unit)</option>
                                <option v-for="unit in parentUnits" :key="unit.unitId" :value="unit.unitId">
                                    {{ unit.unitName }}
                                </option>
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">
                                Status <span class="text-red-500">*</span>
                            </label>
                            <select v-model="formData.status" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                    <button type="button" @click="closeModal"
                        class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Cancel
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[100px]">
                        <span v-if="loading" class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isEdit ? 'Updating...' : 'Saving...' }}
                        </span>
                        <span v-else>
                            {{ isEdit ? 'Update Unit' : 'Save Unit' }}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { masterUnitService } from '@/services/masterUnitServie'

// Props & Emits
const props = defineProps({
    show: Boolean,
    formType: String,
    parentUnits: Array,
    editData: Object
})
const emit = defineEmits(['close', 'submit', 'success', 'error'])

const loading = ref(false)
const queryClient = useQueryClient()

const isEdit = computed(() => props.editData !== null)

const formData = reactive({
    unitCode: '',
    unitName: '',
    address: '',
    managerId: null,
    parentUnitId: null,
    status: 'active',
})

// Icons
const pencilPath = 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
const plusPath = 'M12 6v6m0 0v6m0-6h6m-6 0H6'

// Vue Query Mutation
const updateUnitMutation = useMutation({
    mutationFn: ({ id, data }) => masterUnitService.updateUnit(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['units'] })
        emit('success', 'Unit berhasil diupdate!')
        closeModal()
    },
    onError: (err) => {
        emit('error', err?.response?.data?.message || 'Gagal mengupdate unit')
    }
})

// Watch to populate/reset form
watch([() => props.show, () => props.editData], ([show, data]) => {
    if (!show) return
    if (data) {
        Object.assign(formData, {
            unitCode: data.unitCode || '',
            unitName: data.unitName || '',
            address: data.address || '',
            managerId: data.managerId || null,
            parentUnitId: data.parentUnitId ?? 0,
            status: data.status || 'active',
        })
    } else {
        resetForm()
    }
})

function resetForm() {
    Object.assign(formData, {
        unitCode: '',
        unitName: '',
        address: '',
        managerId: null,
        parentUnitId: null,
        status: 'active',
    })
}

function closeModal() {
    emit('close')
    resetForm()
}

async function handleSubmit() {
    if (props.formType === 'child' && !formData.parentUnitId) {
        emit('error', 'Parent Unit wajib diisi')
        return
    }

    const payload = {
        unitCode: formData.unitCode.trim(),
        unitName: formData.unitName.trim(),
        address: formData.address.trim(),
        managerId: formData.managerId.trim(),
        status: formData.status,
        ...(props.formType !== 'parent' && { parentUnitId: formData.parentUnitId ?? 0 })
    }

    if (isEdit.value) {
        updateUnitMutation.mutate({
            id: props.editData.unitId || props.editData.id,
            data: payload
        })
    } else {
        loading.value = true
        try {
            emit('submit', payload)
        } finally {
            loading.value = false
        }
    }
}

watch(() => updateUnitMutation.isPending, val => loading.value = val)
</script>