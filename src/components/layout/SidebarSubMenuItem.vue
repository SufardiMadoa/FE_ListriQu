<template>
    <div>
        <!-- Child with sub-children -->
        <div v-if="menu.children && menu.children.length > 0">
            <div class="flex items-center justify-center ml-3 pl-3 px-1 text-sm cursor-pointer rounded transition-colors duration-200"
                :class="isMenuActive ? 'bg-gray-100 ml-2 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
                @click="$emit('toggle-section', menu.menuCode)">
                <div class="flex items-center pl-3 ml-3">
                    <span>{{ menu.menuName }}</span>
                </div>
            </div>

            <!-- Sub-children -->
            <div v-show="expandedSections[menu.menuCode]" class="ml-3 mt-1 space-y-1">
                <RouterLink v-for="subChild in sortedChildren(menu.children)" :key="subChild.menuId"
                    :to="subChild.menuUrl" :class="[
                        'flex items-center px-3 py-2 text-xs rounded transition-colors duration-200',
                        activeMenu === subChild.menuCode ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    ]" @click="$emit('set-active', subChild.menuCode)">
                    {{ subChild.menuName }}
                </RouterLink>
            </div>
        </div>

        <!-- Simple child menu -->
        <RouterLink v-else :to="menu.menuUrl" :class="[
            'flex items-center py-2 pl-3 text-sm rounded transition-colors duration-200',
            activeMenu === menu.menuCode ? 'bg-[#E9F6FF] text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        ]" @click="$emit('set-active', menu.menuCode)">
            <svg v-if="menu.menuIcon" class="h-4 w-4 mr-2 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(menu.menuIcon)" />
            </svg>
            {{ menu.menuName }}
        </RouterLink>
    </div>
</template>

<script>
import { computed } from 'vue'
import { iconMixin } from './iconMixin'

export default {
    name: 'SidebarSubMenuItem',
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

        // Check if menu is active
        const isMenuActive = computed(() => {
            if (props.menu.menuCode === props.activeMenu) return true

            if (props.menu.children && props.menu.children.length > 0) {
                return props.menu.children.some(child => child.menuCode === props.activeMenu)
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