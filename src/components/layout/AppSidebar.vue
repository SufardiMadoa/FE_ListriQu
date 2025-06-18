<template>
    <div class="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <!-- User Info -->
        <div class="p-4 border-b border-gray-200">
            <div class="text-sm text-gray-600 mb-1"></div>
        </div>

        <!-- Dynamic Navigation Menu -->
        <nav class="px-4 py-2">
            <SidebarMenuItem v-for="menu in sortedMenus" :key="menu.menuId" :menu="menu" :active-menu="activeMenu"
                :expanded-sections="expandedSections" @set-active="setActiveMenu" @toggle-section="toggleSection" />
        </nav>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import SidebarMenuItem from './SidebarMenuItem.vue'

export default {
    name: 'AppSidebar',
    components: {
        SidebarMenuItem
    },
    setup() {
        const activeMenu = ref('')
        const expandedSections = ref({})
        const menus = ref([])

        // Load menus from localStorage
        const loadMenusFromStorage = () => {
            try {
                const storedMenus = localStorage.getItem('userMenus') || localStorage.getItem('menus')
                if (storedMenus) {
                    menus.value = JSON.parse(storedMenus)

                    // Auto-expand sections that have active children
                    expandedSections.value = {}
                    menus.value.forEach(menu => {
                        if (menu.children && menu.children.length > 0) {
                            expandedSections.value[menu.menuCode] = true
                        }
                    })

                    // Set first menu as active if none is set
                    if (!activeMenu.value && menus.value.length > 0) {
                        const firstMenu = menus.value[0]
                        if (firstMenu.children && firstMenu.children.length > 0) {
                            activeMenu.value = firstMenu.children[0].menuCode
                        } else {
                            activeMenu.value = firstMenu.menuCode
                        }
                    }
                } else {
                    console.warn('No menu data found in localStorage')
                }
            } catch (error) {
                console.error('Error loading menus from localStorage:', error)
            }
        }

        // Computed property for sorted menus
        const sortedMenus = computed(() => {
            return [...menus.value].sort((a, b) => a.menuOrder - b.menuOrder)
        })

        const setActiveMenu = (menuCode) => {
            activeMenu.value = menuCode
        }

        const toggleSection = (sectionCode) => {
            expandedSections.value[sectionCode] = !expandedSections.value[sectionCode]
        }

        onMounted(() => {
            loadMenusFromStorage()
        })

        return {
            activeMenu,
            expandedSections,
            menus,
            sortedMenus,
            setActiveMenu,
            toggleSection
        }
    }
}
</script>

<style scoped>
/* Custom scrollbar untuk sidebar */
nav::-webkit-scrollbar {
    width: 4px;
}

nav::-webkit-scrollbar-track {
    background: #f1f1f1;
}

nav::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>