<template>
    <div class="space-y-1 mb-2">
        <!-- Parent menu with children -->
        <div v-if="menu.children && menu.children.length > 0">
            <div class="flex items-center justify-between py-2 px-2 text-sm font-medium cursor-pointer rounded transition-colors duration-200"
                :class="isMenuActive ? 'bg-[#0B74BE] text-white' : 'text-gray-700 hover:bg-gray-50'"
                @click="$emit('toggle-section', menu.menuCode)">
                <div class="flex items-center ml-1">
                    <!-- Menu Icon -->
                    <svg v-if="menu.menuIcon" class="h-4 w-4 mr-2" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            :d="getIconPath(menu.menuIcon)" />
                    </svg>
                    <span>{{ menu.menuName }}</span>
                </div>
                <svg class="h-4 w-4 transform transition-transform"
                    :class="{ 'rotate-180': expandedSections[menu.menuCode] }" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <!-- Children menus -->
            <div v-show="expandedSections[menu.menuCode]" class="mt-1 space-y-1">
                <SidebarSubMenuItem v-for="child in sortedChildren(menu.children)" :key="child.menuId" :menu="child"
                    :active-menu="activeMenu" :expanded-sections="expandedSections"
                    @set-active="$emit('set-active', $event)" @toggle-section="$emit('toggle-section', $event)" />
            </div>
        </div>

        <!-- Simple parent menu without children -->
        <RouterLink v-else :to="menu.menuUrl" :class="[
            'flex items-center px-3 py-2 text-sm rounded transition-colors duration-200 mb-1',
            activeMenu === menu.menuCode ? 'bg-[#0B74BE] text-white font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        ]" @click="$emit('set-active', menu.menuCode)">
            <svg v-if="menu.menuIcon" class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(menu.menuIcon)" />
            </svg>
            {{ menu.menuName }}
        </RouterLink>
    </div>
</template>

<script>
import { computed } from 'vue'
import SidebarSubMenuItem from './SidebarSubMenuItem.vue'
import { iconMixin } from './iconMixin'

export default {
    name: 'SidebarMenuItem',
    components: {
        SidebarSubMenuItem
    },
    mixins: [iconMixin],
    props: {
        menu: {
            type: Object,
            required: true
        },
        activeMenu: {
            type: String,
            required: true
        },
        expandedSections: {
            type: Object,
            required: true
        }
    },
    emits: ['set-active', 'toggle-section'],
    setup(props) {
        // Sort children menus
        const sortedChildren = (children) => {
            return [...children].sort((a, b) => a.menuOrder - b.menuOrder)
        }

        // Check if menu or its children are active
        const isMenuActive = computed(() => {
            if (props.menu.menuCode === props.activeMenu) return true

            if (props.menu.children && props.menu.children.length > 0) {
                return props.menu.children.some(child => {
                    if (child.menuCode === props.activeMenu) return true
                    if (child.children && child.children.length > 0) {
                        return child.children.some(subChild => subChild.menuCode === props.activeMenu)
                    }
                    return false
                })
            }

            return false
        })

        return {
            sortedChildren,
            isMenuActive
        }
    }
}
</script>