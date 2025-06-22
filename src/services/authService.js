import api from '@/api/axios'

// Auth Services
const token = localStorage.getItem('token')
export const authService = {
  login: (credentials) => {
    return api.post('/auth/login', {
      username: credentials.username,
      password: credentials.password,
    })
  },
  register: (userData) => {
    return api.post('/auth/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      roleId: userData.roleId || 3, // default role jika tidak disediakan
    })
  },
  logout: () => {
    return api.post('/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
