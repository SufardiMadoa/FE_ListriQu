import api from '@/api/axios'

// Auth Services
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
  }
}

export const roleService = {
  getRoleMenu: (roleId) => {
    return api.get(`/role/${roleId}/menu`, {
      headers: getAuthHeaders(),
    })
  },

  assignRoleMenu: (userData) => {
    return api.post(
      '/role-menu',
      {
        role_id: userData.role_id,
        menu_ids: userData.menu_ids,
      },
      {
        headers: getAuthHeaders(),
      },
    )
  },

  getAllRolesWithUsers: () => {
    return api.get('/role', {
      headers: getAuthHeaders(),
    })
  },

  // Optional: Method untuk get all menus (jika diperlukan)
  getAllMenus: () => {
    return api.get('/menu', {
      headers: getAuthHeaders(),
    })
  },
}
