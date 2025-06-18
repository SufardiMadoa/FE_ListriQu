import { reactive } from 'vue'

export const menuStore = reactive({
  menus: [],
  activeMenu: '',
  expandedSections: {},
})
