<template>
    <div class="grid gap-6">
        <div v-for="role in roles" :key="role.role_id"
            class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="p-2 bg-blue-100 rounded-lg">
                            <i class="fas fa-user-shield text-blue-600"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">{{ role.role_name }}</h3>
                            <p class="text-sm text-gray-500">Code: {{ role.role_code }}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {{ role.users.length }} Users
                        </span>
                        <button @click="toggleRoleExpansion(role.role_id)" class="p-1 hover:bg-gray-200 rounded">
                            <i :class="expandedRoles.includes(role.role_id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                                class="text-gray-500"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="expandedRoles.includes(role.role_id)" class="p-6">
                <h4 class="text-sm font-medium text-gray-700 mb-3">Assigned Users:</h4>
                <div class="grid gap-2">
                    <div v-for="user in role.users" :key="user.user_id"
                        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <i class="fas fa-user text-gray-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">{{ user.name }}</p>
                                <p class="text-xs text-gray-500">ID: {{ user.user_id }}</p>
                            </div>
                        </div>
                        <button class="text-red-500 hover:text-red-700 text-sm">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RolesUsersTab',
    props: {
        roles: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            expandedRoles: [],
        }
    },
    mounted() {
        // Expand first role by default
        if (this.roles && this.roles.length > 0) {
            this.expandedRoles.push(this.roles[0].role_id);
        }
    },
    methods: {
        toggleRoleExpansion(roleId) {
            const index = this.expandedRoles.indexOf(roleId);
            if (index > -1) {
                this.expandedRoles.splice(index, 1);
            } else {
                this.expandedRoles.push(roleId);
            }
        }
    }
}
</script>