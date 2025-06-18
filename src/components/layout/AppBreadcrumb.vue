<template>
    <div class="bg-white px-6 py-4 border-b border-gray-200">
        <span class="text-xl font-bold mb-2" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
            {{ breadcrumb }}
        </span>
        <div class="flex items-center text-sm text-gray-600">
            <span>ListriQu</span>
            <svg class="mx-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <span v-if="index === breadcrumbs.length - 1" class="text-blue-600 font-medium">
                    {{ breadcrumb }}
                </span>
                <template v-else>
                    <span>{{ breadcrumb }}</span>
                    <svg class="mx-2 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </template>
            </span>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'AppBreadcrumb',
    setup() {
        const route = useRoute()
        const menus = ref([])

        // Load data from localStorage
        const loadData = () => {
            try {
                const storedMenus = localStorage.getItem('userMenus') || localStorage.getItem('menus')
                if (storedMenus) {
                    menus.value = JSON.parse(storedMenus)
                }
            } catch (error) {
                console.error('Error loading data:', error)
            }
        }

        // Find menu by route name and get its path
        const findMenuPathByRoute = (menuList, routeName, currentPath = []) => {
            for (const menu of menuList) {
                const newPath = [...currentPath, menu.menuName]

                // Check if this menu matches the route
                if (menu.routeName === routeName ||
                    menu.menuCode === routeName ||
                    menu.menuPath === route.path) {
                    return newPath
                }

                // Search in children
                if (menu.children && menu.children.length > 0) {
                    const found = findMenuPathByRoute(menu.children, routeName, newPath)
                    if (found) return found
                }
            }
            return null
        }

        // Generate breadcrumbs based on current route
        const breadcrumbs = computed(() => {
            const routeName = route.name
            const routePath = route.path

            // Skip breadcrumbs for auth pages and 404
            if (['login', 'register', 'NotFound'].includes(routeName)) {
                return []
            }

            // First try to find from menu data
            if (menus.value.length > 0) {
                const menuPath = findMenuPathByRoute(menus.value, routeName)
                if (menuPath) {
                    return menuPath
                }
            }

            // Fallback: Generate breadcrumbs from route structure
            const segments = routePath.split('/').filter(segment => segment !== '')

            if (segments.length === 0) {
                return ['Dashboard'] // Root path
            }

            const breadcrumbPath = []

            segments.forEach((segment, index) => {
                switch (segment) {
                    case 'dashboard':
                        breadcrumbPath.push('Dashboard')
                        break
                    case 'master':
                        breadcrumbPath.push('Master')
                        break
                    case 'unit':
                        breadcrumbPath.push('Unit')
                        break
                    case 'role':
                        breadcrumbPath.push('Role')
                        break
                    default:
                        // Capitalize first letter
                        breadcrumbPath.push(segment.charAt(0).toUpperCase() + segment.slice(1))
                }
            })

            return breadcrumbPath
        })

        // Watch route changes to reload data if needed
        watch(() => route.path, () => {
            // Optionally reload menu data if it changes
            loadData()
        })

        onMounted(() => {
            loadData()
        })

        return {
            breadcrumbs
        }
    }
}
</script>