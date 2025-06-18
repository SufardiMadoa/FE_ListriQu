<template>
    <div class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Role Management Dashboard</h1>
                <p class="text-gray-600">Kelola roles, users, dan permissions untuk sistem</p>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="border-b border-gray-200">
                    <nav class="flex space-x-8 px-6">
                        <button @click="activeTab = 'roles'"
                            :class="activeTab === 'roles' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
                            <i class="fas fa-users mr-2"></i>Roles & Users
                        </button>
                        <button @click="activeTab = 'assign'"
                            :class="activeTab === 'assign' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
                            <i class="fas fa-user-cog mr-2"></i>Assign Roles
                        </button>
                        <button @click="activeTab = 'permissions'"
                            :class="activeTab === 'permissions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
                            <i class="fas fa-shield-alt mr-2"></i>Role Permissions
                        </button>
                    </nav>
                </div>

                <div class="p-6">
                    <div v-if="isLoading" class="text-center p-8">
                        <i class="fas fa-spinner fa-spin text-3xl text-gray-500"></i>
                        <p class="mt-2 text-gray-600">Loading Data...</p>
                    </div>
                    <div v-else-if="error" class="text-center p-8 text-red-500">
                        <i class="fas fa-exclamation-triangle text-3xl"></i>
                        <p class="mt-2">{{ error }}</p>
                    </div>
                    <div v-else>
                        <RolesUsersTab v-if="activeTab === 'roles'" :roles="rolesData" />
                        <AssignRoleTab v-if="activeTab === 'assign'" :roles="rolesData" :menus="menuData"
                            @assignment-success="fetchInitialData" />
                        <RolePermissionsTab v-if="activeTab === 'permissions'" :roles="rolesData" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RolesUsersTab from './RoleUserTab.vue';
import AssignRoleTab from './AsignRoleTab.vue';
import RolePermissionsTab from './RolePermisionTab.vue';
import { roleService } from '@/services/roleService'; // Pastikan path ini benar

export default {
    name: 'RoleManagement',
    components: {
        RolesUsersTab,
        AssignRoleTab,
        RolePermissionsTab
    },
    data() {
        return {
            activeTab: 'roles',
            rolesData: [],
            menuData: [],
            isLoading: true,
            error: null,
        };
    },
    async mounted() {
        await this.fetchInitialData();
    },
    methods: {
        async fetchInitialData() {
            this.isLoading = true;
            this.error = null;
            try {
                const [rolesResponse, menusResponse] = await Promise.all([
                    roleService.getAllRolesWithUsers(),
                    roleService.getAllMenus()
                ]);
                this.rolesData = rolesResponse.data.data;
                this.menuData = menusResponse.data.data;
            } catch (err) {
                console.error("Gagal mengambil data awal:", err);
                this.error = "Tidak dapat memuat data. Silakan coba lagi nanti.";
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
}

.transition-colors {
    transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

button:hover {
    transform: translateY(-1px);
    transition: transform 0.1s ease-in-out;
}
</style>