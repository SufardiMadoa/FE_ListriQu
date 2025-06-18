<template>
    <div class="space-y-6">
        <div v-for="role in roles" :key="role.role_id" class="bg-white border border-gray-200 rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-800">{{ role.role_name }} Permissions</h3>
                    <button @click="togglePermissionView(role.role_id)"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <i class="fas fa-eye mr-2"></i>
                        {{ expandedPermissions.includes(role.role_id) ? 'Hide' : 'View' }} Permissions
                    </button>
                </div>
            </div>

            <div v-if="expandedPermissions.includes(role.role_id)" class="p-6">
                <div v-if="loadingMenus[role.role_id]" class="text-center">
                    <i class="fas fa-spinner fa-spin text-xl text-gray-500"></i>
                </div>
                <div v-else-if="roleMenus[role.role_id] && !roleMenus[role.role_id].error" class="space-y-4">
                    <div v-for="menu in roleMenus[role.role_id]" :key="menu.menuId"
                        class="border border-gray-200 rounded-lg">
                        <div class="p-4 bg-gray-50 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <i :class="getMenuIcon(menu.menuIcon)" class="text-gray-600"></i>
                                    <div>
                                        <h4 class="font-medium text-gray-800">{{ menu.menuName }}</h4>
                                        <p class="text-sm text-gray-500">{{ menu.menuUrl }}</p>
                                    </div>
                                </div>
                                <span
                                    class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Accessible</span>
                            </div>
                        </div>
                        <div v-if="menu.children && menu.children.length > 0" class="p-4">
                            <h5 class="text-sm font-medium text-gray-700 mb-2">Sub-menus:</h5>
                            <div class="space-y-2">
                                <div v-for="child in menu.children" :key="child.menuId"
                                    class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div class="flex items-center space-x-2">
                                        <i :class="getMenuIcon(child.menuIcon)" class="text-gray-500 text-sm"></i>
                                        <span class="text-sm text-gray-700">{{ child.menuName }}</span>
                                    </div>
                                    <span
                                        class="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Accessible</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="roleMenus[role.role_id] && roleMenus[role.role_id].error"
                    class="text-red-500 text-center">
                    {{ roleMenus[role.role_id].error }}
                </div>
                <div v-else class="text-gray-500 text-center">
                    Role ini tidak memiliki permission.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { roleService } from '@/services/roleService.js';

export default {
    name: 'RolePermissionsTab',
    props: {
        roles: Array
    },
    data() {
        return {
            expandedPermissions: [],
            roleMenus: {},
            loadingMenus: {},
        }
    },
    methods: {
        getMenuIcon(iconName) {
            const iconMap = { 'dashboard_icon': 'fas fa-tachometer-alt', 'data-master-icon': 'fas fa-database', 'building': 'fas fa-building', 'users': 'fas fa-users', 'settings': 'fas fa-cog' };
            return iconMap[iconName] || 'fas fa-circle';
        },
        async togglePermissionView(roleId) {
            const index = this.expandedPermissions.indexOf(roleId);
            if (index > -1) {
                this.expandedPermissions.splice(index, 1);
            } else {
                this.expandedPermissions.push(roleId);
                if (!this.roleMenus[roleId]) {
                    this.loadingMenus[roleId] = true;
                    try {
                        const response = await roleService.getRoleMenu(roleId);
                        this.roleMenus[roleId] = response.data.data && response.data.data.length > 0 ? response.data.data : null;
                    } catch (err) {
                        console.error(`Gagal mengambil permission untuk role ${roleId}:`, err);
                        this.loadingMenus[roleId] = true;
                    }
                }
            }
        }
    }
}
</script>