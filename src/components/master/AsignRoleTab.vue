<template>
    <div class="max-w-4xl mx-auto">
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 class="text-xl font-bold text-white flex items-center">
                    <i class="fas fa-user-cog mr-3"></i> Assign Role & Menu Permissions
                </h3>
                <p class="text-blue-100 text-sm mt-1">Configure role access and menu permissions</p>
            </div>

            <div class="p-6">
                <form @submit.prevent="assignRole" class="space-y-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <label class="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-user-shield mr-2 text-blue-600"></i> Select Role
                        </label>
                        <select v-model="assignForm.role_id"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                            <option value="">Choose a role...</option>
                            <option v-for="role in roles" :key="role.role_id" :value="role.role_id">
                                {{ role.role_name }} ({{ role.role_code }})
                            </option>
                        </select>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <label class="text-sm font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-list mr-2 text-purple-600"></i> Menu Permissions
                            </label>
                            <div class="flex space-x-2">
                                <button type="button" @click="selectAllMenus"
                                    class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                                    <i class="fas fa-check-double mr-1"></i>Select All
                                </button>
                                <button type="button" @click="clearAllMenus"
                                    class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                                    <i class="fas fa-times mr-1"></i>Clear All
                                </button>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="relative"><input type="text" v-model="menuSearch" placeholder="Search menus..."
                                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"><i
                                    class="fas fa-search absolute left-3 top-3 text-gray-400"></i></div>
                        </div>
                        <div class="max-h-96 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                            <div class="p-2">
                                <div v-for="menu in filteredMenus" :key="menu.menuId" class="mb-2">
                                    <div
                                        class="flex items-center p-3 hover:bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                        <input type="checkbox" :id="`menu-${menu.menuId}`" :value="menu.menuId"
                                            v-model="assignForm.menu_ids" @change="handleParentMenuChange(menu)"
                                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3">
                                        <div class="flex items-center flex-1">
                                            <div class="p-2 bg-blue-100 rounded-lg mr-3"><i
                                                    :class="getMenuIcon(menu.menuIcon)"
                                                    class="text-blue-600 text-sm"></i></div>
                                            <div class="flex-1">
                                                <label :for="`menu-${menu.menuId}`"
                                                    class="font-medium text-gray-800 cursor-pointer">{{ menu.menuName
                                                    }}</label>
                                                <p class="text-xs text-gray-500">{{ menu.menuUrl }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="menu.children && menu.children.length > 0" class="ml-6 mt-2 space-y-1">
                                        <div v-for="child in menu.children" :key="child.menuId"
                                            class="flex items-center p-2 hover:bg-gray-50 rounded-lg border-l-2 border-gray-300">
                                            <input type="checkbox" :id="`menu-${child.menuId}`" :value="child.menuId"
                                                v-model="assignForm.menu_ids"
                                                class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-3">
                                            <div class="flex items-center flex-1">
                                                <div class="p-1.5 bg-purple-100 rounded mr-3"><i
                                                        :class="getMenuIcon(child.menuIcon)"
                                                        class="text-purple-600 text-xs"></i></div>
                                                <div class="flex-1">
                                                    <label :for="`menu-${child.menuId}`"
                                                        class="text-sm text-gray-700 cursor-pointer">{{ child.menuName
                                                        }}</label>
                                                    <p class="text-xs text-gray-500">{{ child.menuUrl }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-sm text-gray-600 flex items-center justify-between">
                            <span><i class="fas fa-check-circle text-green-500 mr-1"></i> {{ assignForm.menu_ids.length
                            }} menu(s) selected</span>
                            <span class="text-xs bg-gray-100 px-2 py-1 rounded">Total: {{ totalMenuCount }} menus
                                available</span>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit"
                            :disabled="!assignForm.role_id || assignForm.menu_ids.length === 0 || isSubmitting"
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-save'" class="mr-2"></i>
                            {{ isSubmitting ? 'Saving...' : 'Assign Role & Permissions' }}
                        </button>
                    </div>
                </form>
                <div v-if="assignForm.role_id && assignForm.menu_ids.length > 0" class="mt-6">
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                        <h4 class="text-sm font-semibold text-green-800 mb-3 flex items-center"><i
                                class="fas fa-eye mr-2"></i> Assignment Preview</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-3 rounded-lg border">
                                <h5 class="text-xs font-medium text-gray-600 mb-2">Selected Role:</h5>
                                <div class="flex items-center">
                                    <div class="p-2 bg-blue-100 rounded mr-2"><i
                                            class="fas fa-user-shield text-blue-600 text-sm"></i></div>
                                    <div>
                                        <p class="font-medium text-gray-800">{{ getSelectedRoleName() }}</p>
                                        <p class="text-xs text-gray-500">ID: {{ assignForm.role_id }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white p-3 rounded-lg border">
                                <h5 class="text-xs font-medium text-gray-600 mb-2">JSON Payload:</h5>
                                <pre
                                    class="text-xs text-gray-700 bg-gray-50 p-2 rounded overflow-x-auto">{{ JSON.stringify({ role_id: parseInt(assignForm.role_id), menu_ids: assignForm.menu_ids }, null, 2) }}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { roleService } from '@/services/roleService.js';

export default {
    name: 'AssignRoleTab',
    props: {
        roles: Array,
        menus: Array
    },
    data() {
        return {
            isSubmitting: false,
            menuSearch: '',
            assignForm: {
                role_id: '',
                menu_ids: []
            },
        }
    },
    computed: {
        filteredMenus() {
            if (!this.menuSearch) return this.menus;
            const search = this.menuSearch.toLowerCase();
            return this.menus.filter(menu =>
                menu.menuName.toLowerCase().includes(search) ||
                (menu.children && menu.children.some(child => child.menuName.toLowerCase().includes(search)))
            );
        },
        totalMenuCount() {
            return this.menus.reduce((count, menu) => count + 1 + (menu.children ? menu.children.length : 0), 0);
        }
    },
    methods: {
        async assignRole() {
            this.isSubmitting = true;
            const payload = {
                role_id: parseInt(this.assignForm.role_id),
                menu_ids: this.assignForm.menu_ids
            };
            try {
                await roleService.assignRoleMenu(payload);
                alert('Role assigned successfully!');
                this.assignForm = { role_id: '', menu_ids: [] };
                this.$emit('assignment-success'); // Beri tahu parent untuk refresh data
            } catch (err) {
                console.error('Gagal meng-assign role:', err);
                alert(`Error: ${err.response?.data?.message || err.message}`);
            } finally {
                this.isSubmitting = false;
            }
        },
        getMenuIcon(iconName) {
            const iconMap = { 'dashboard_icon': 'fas fa-tachometer-alt', 'data-master-icon': 'fas fa-database', 'building': 'fas fa-building', 'users': 'fas fa-users', 'settings': 'fas fa-cog' };
            return iconMap[iconName] || 'fas fa-circle';
        },
        selectAllMenus() {
            const allMenuIds = [];
            this.menus.forEach(menu => {
                allMenuIds.push(menu.menuId);
                if (menu.children) {
                    menu.children.forEach(child => allMenuIds.push(child.menuId));
                }
            });
            this.assignForm.menu_ids = [...allMenuIds];
        },
        clearAllMenus() {
            this.assignForm.menu_ids = [];
        },
        handleParentMenuChange(parentMenu) {
            const isSelected = this.assignForm.menu_ids.includes(parentMenu.menuId);
            if (parentMenu.children) {
                parentMenu.children.forEach(child => {
                    const childIndex = this.assignForm.menu_ids.indexOf(child.menuId);
                    if (isSelected && childIndex === -1) {
                        this.assignForm.menu_ids.push(child.menuId);
                    } else if (!isSelected && childIndex > -1) {
                        this.assignForm.menu_ids.splice(childIndex, 1);
                    }
                });
            }
        },
        getSelectedRoleName() {
            const role = this.roles.find(r => r.role_id == this.assignForm.role_id);
            return role ? role.role_name : '';
        }
    }
}
</script>

<style scoped>
input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
}
</style>