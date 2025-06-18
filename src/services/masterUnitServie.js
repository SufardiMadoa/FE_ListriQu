import api from '@/api/axios'

// Auth Services
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
  }
}

export const masterUnitService = {
  // Get semua unit
  getUnits: () => {
    return api.get('/master/units', {
      headers: getAuthHeaders(),
    })
  },

  // Create unit baru
  createUnit: (data) => {
    return api.post('/master/units', data, {
      headers: getAuthHeaders(),
    })
  },

  // Update unit berdasarkan ID
  updateUnit: (id, data) => {
    return api.put(`/master/units/${id}`, data, {
      headers: getAuthHeaders(),
    })
  },

  // Delete unit berdasarkan ID
  deleteUnit: (id) => {
    return api.delete(`/master/units/${id}`, {
      headers: getAuthHeaders(),
    })
  },
}
