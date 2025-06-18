<!-- UnitFormModal.vue -->
<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-gray-900">
                        Add {{ formType === 'parent' ? 'Parent' : 'Child' }}
                    </h2>
                </div>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Form Content -->
            <form @submit.prevent="handleSubmit" class="p-6">
                <div class="space-y-5">
                    <!-- Unit Code -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ formType === 'parent' ? 'Parent Unit Initial' : 'Unit Code' }}
                        </label>
                        <input v-model="formData.unitCode" type="text"
                            :placeholder="formType === 'parent' ? 'e.g., -1' : 'e.g., DKI'"
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            required />
                    </div>

                    <!-- Unit Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ formType === 'parent' ? 'Nama Parent' : 'Unit Name' }}
                        </label>
                        <input v-model="formData.unitName" type="text"
                            :placeholder="formType === 'parent' ? 'e.g., DKI Jakarta' : 'Unit Name'"
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            required />
                    </div>

                    <!-- Address -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input v-model="formData.address" type="text" placeholder="Enter address"
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            required />
                    </div>

                    <!-- Manager ID -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Manager ID</label>
                        <input v-model.number="formData.managerId" type="number" placeholder="Enter manager ID"
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            required />
                    </div>

                    <!-- Parent Unit Selection (for child only) -->
                    <div v-if="formType === 'child'">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Kode Unit</label>
                        <div class="relative">
                            <select v-model.number="formData.parentUnitId"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                                required>
                                <option disabled value="">Select Parent Unit</option>
                                <option v-for="unit in parentUnits" :key="unit.unitId" :value="unit.unitId">
                                    {{ unit.unitName }}
                                </option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Parent Type (for parent only) -->
                    <div v-if="formType === 'parent'">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Parent Type</label>
                        <div class="relative">
                            <select v-model="formData.parentType"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                                <option value="regional">Regional</option>
                                <option value="national">National</option>
                                <option value="local">Local</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Status -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <div class="relative">
                            <select v-model="formData.status"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                                required>
                                <option value="active">Aktif</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex justify-end space-x-3 mt-8">
                    <button type="button" @click="$emit('close')"
                        class="px-6 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium">
                        Batal
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium disabled:opacity-50">
                        {{ loading ? 'Saving...' : 'Save' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    formType: {
        type: String,
        default: 'parent',
        validator: (value) => ['parent', 'child'].includes(value)
    },
    parentUnits: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'submit'])

// Form data
const formData = reactive({
    unitCode: '',
    unitName: '',
    address: '',
    managerId: null,
    parentUnitId: null,
    parentType: 'regional',
    status: 'active',
})

// Reset form when modal opens
watch(() => props.show, (newValue) => {
    if (newValue) {
        resetForm()
    }
})

// Reset form
function resetForm() {
    formData.unitCode = ''
    formData.unitName = ''
    formData.address = ''
    formData.managerId = null
    formData.parentUnitId = null
    formData.parentType = 'regional'
    formData.status = 'active'
}

// Handle form submission
function handleSubmit() {
    if (props.formType === 'child' && !formData.parentUnitId) {
        emit('submit', null, 'Parent Unit ID wajib diisi untuk child unit')
        return
    }

    const payload = {
        unitCode: formData.unitCode,
        unitName: formData.unitName,
        address: formData.address,
        managerId: formData.managerId,
        parentUnitId: props.formType === 'child' ? formData.parentUnitId : null,
        status: formData.status,
    }

    emit('submit', payload)
}
</script>