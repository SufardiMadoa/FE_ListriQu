<!-- UnitManager.vue - Main Container Component -->
<template>
  <div class="relative">
    <!-- Action Buttons -->
    <ActionButtons @add-child="openChildModal" @add-parent="openParentModal" />

    <!-- Unit Form Modal -->
    <UnitFormModal :show="showModal" :form-type="formType" :parent-units="parentUnits" :loading="isCreating"
      @close="closeModal" @submit="handleFormSubmit" />

    <!-- Toast Notification -->
    <ToastNotification :show="toast.show" :type="toast.type" :title="toast.title" :message="toast.message"
      @close="hideToast" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { masterUnitService } from '@/services/masterUnitServie'

// Import components (in real project, these would be separate files)
import ActionButtons from './ActionButtons.vue'
import UnitFormModal from './UnitFormModal.vue'
import ToastNotification from './ToastNotification.vue'

// Props
const props = defineProps({
  onSuccess: Function,
})

// Modal state
const showModal = ref(false)
const formType = ref('parent') // 'parent' | 'child'

// Toast state
const toast = reactive({
  show: false,
  type: 'success', // 'success' | 'error'
  title: '',
  message: ''
})

// Vue Query client
const queryClient = useQueryClient()

// Fetch all units
const { data: allUnits } = useQuery({
  queryKey: ['units'],
  queryFn: () => masterUnitService.getUnits().then(res => res.data),
})

// Filter only parent units (parentUnitId == null)
const parentUnits = computed(() =>
  allUnits?.value?.filter(unit => unit.parentUnitId === null) || []
)

// Mutation to create unit
const { mutate: createUnit, isLoading: isCreating } = useMutation({
  mutationFn: (newUnit) => masterUnitService.createUnit(newUnit),
  onSuccess: () => {
    if (props.onSuccess) props.onSuccess()
    showToast('success', 'Berhasil Disimpan', 'Unit berhasil dibuat')
    closeModal()
    queryClient.invalidateQueries({ queryKey: ['units'] })
  },
  onError: (err) => {
    console.error(err)
    showToast('error', 'Gagal Disimpan', 'Terjadi kesalahan saat membuat unit')
  },
})

// Modal functions
function openChildModal() {
  formType.value = 'child'
  showModal.value = true
}

function openParentModal() {
  formType.value = 'parent'
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

// Toast functions
function showToast(type, title, message) {
  toast.type = type
  toast.title = title
  toast.message = message
  toast.show = true
}

function hideToast() {
  toast.show = false
}

// Handle form submission
function handleFormSubmit(payload, errorMessage = null) {
  if (errorMessage) {
    showToast('error', 'Data Tidak Lengkap', errorMessage)
    return
  }

  if (payload) {
    console.log('🧾 Payload:', JSON.stringify(payload, null, 2))
    createUnit(payload)
  }
}
</script>
