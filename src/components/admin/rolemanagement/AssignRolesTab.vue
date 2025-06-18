<template>
    <div class="max-w-4xl mx-auto">
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 class="text-xl font-bold text-white flex items-center">
                    <i class="fas fa-user-cog mr-3"></i>
                    Assign Role & Menu Permissions
                </h3>
                <p class="text-blue-100 text-sm mt-1">Configure role access and menu permissions</p>
            </div>

            <div class="p-6">
                <form @submit.prevent="$emit('submit-assignment')" class="space-y-6">
                    <!-- Role Selection -->
                    <div class="bg-gray-50 rounded-lg p-4">
                        <label class="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-user-shield mr-2 text-blue-600"></i>
                            Select Role
                        </label>
                        <select :value="assignFormRoleId" @input="$emit('update:assignFormRoleId', $event.target.value)"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                            <option value="">Choose a role...</option>
                            <option v-for="role in rolesData" :key="role.role_id" :value="role.role_id">
                                {{ role.role_name }} ({{ role.role_code }})
                            </option>
                        </select>
                    </div>

                    <!-- Menu Permissions -->
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <label class="text-sm font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-list mr-2 text-purple-600"></i>
                                Menu Permissions
                            </label>
                            <div class="flex space-x-2">
                                <button type="button" @click="$emit('select-all-menus')"
                                    class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                                    <i class="fas fa-check-double mr-1"></i>Select All
                                </button>
                                <button type="button" @click="$emit('clear-all-menus')"
                                    class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                                    <i class="fas fa-times mr-1"></i>Clear All
                                </button>
                            </div>
                        </div>

                        <!-- Search Menu -->
                        <div class="mb-4">
                            <div class="relative">
                                <input type="text" :value="menuSearchQuery" @input="$emit('update:menuSearchQuery', $event.target.value)"
                                    placeholder="Search menus..."
                                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>

                        <!-- Menu Tree -->
                        <div class="max-h-96 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                            <div class="p-2">
                                <div v-for="menu in filteredMenus" :key="menu.menuId" class="mb-2">
                                    <!-- Parent Menu -->
                                    <div class="flex items-center p-3 hover:bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                        <div class="flex items-center flex-1">
                                            <input type="checkbox" :id="`menu-${menu.menuId}`" :value="menu.menuId"
                                                :checked="assignFormMenuIds.includes(menu.menuId)"
                                                @change="$emit('parent-menu-toggled', menu)"
                                                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3">

                                            <div class="flex items-center flex-1">
                                                <div class="p-2 bg-blue-100 rounded-lg mr-3">
                                                    <i :class="getMenuIcon(menu.menuIcon)" class="text-blue-600 text-sm"></i>
                                                </div>
                                                <div class="flex-1">
                                                    <label :for="`menu-${menu.menuId}`" class="font-medium text-gray-800 cursor-pointer">
                                                        {{ menu.menuName }}
                                                    </label>
                                                    <p class="text-xs text-gray-500">{{ menu.menuUrl }}</p>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                        ID: {{ menu.menuId }}
                                                    </span>
                                                    <span v-if="menu.children && menu.children.length > 0"
                                                        class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                        {{ menu.children.length }} sub-menus
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Sub Menus -->
                                    <div v-if="menu.children && menu.children.length > 0" class="ml-6 mt-2 space-y-1">
                                        <div v-for="child in menu.children" :key="child.menuId"
                                            class="flex items-center p-2 hover:bg-gray-50 rounded-lg border-l-2 border-gray-300">
                                            <input type="checkbox" :id="`menu-${child.menuId}`" :value="child.menuId"
                                                :checked="assignFormMenuIds.includes(child.menuId)"
                                                @change="toggleMenuId(child.menuId)"
                                                class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-3">

                                            <div class="flex items-center flex-1">
                                                <div class="p-1.5 bg-purple-100 rounded mr-3">
                                                    <i :class="getMenuIcon(child.menuIcon)" class="text-purple-600 text-xs"></i>
                                                </div>
                                                <div class="flex-1">
                                                    <label :for="`menu-${child.menuId}`" class="text-sm text-gray-700 cursor-pointer">
                                                        {{ child.menuName }}
                                                    </label>
                                                    <p class="text-xs text-gray-500">{{ child.menuUrl }}</p>
                                                </div>
                                                <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                                    ID: {{ child.menuId }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Selected Count -->
                        <div class="mt-3 text-sm text-gray-600 flex items-center justify-between">
                            <span>
                                <i class="fas fa-check-circle text-green-500 mr-1"></i>
                                {{ assignFormMenuIds.length }} menu(s) selected
                            </span>
                            <span class="text-xs bg-gray-100 px-2 py-1 rounded">
                                Total: {{ totalMenuCount }} menus available
                            </span>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex justify-center">
                        <button type="submit" :disabled="!assignFormRoleId || assignFormMenuIds.length === 0"
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <i class="fas fa-save mr-2"></i>
                            Assign Role & Permissions
                        </button>
                    </div>
                </form>

                <!-- Assignment Preview -->
                <div v-if="assignFormRoleId && assignFormMenuIds.length > 0" class="mt-6">
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                        <h4 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                            <i class="fas fa-eye mr-2"></i>
                            Assignment Preview
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-3 rounded-lg border">
                                <h5 class="text-xs font-medium text-gray-600 mb-2">Selected Role:</h5>
                                <div class="flex items-center">
                                    <div class="p-2 bg-blue-100 rounded mr-2">
                                        <i class="fas fa-user-shield text-blue-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-800">{{ selectedRoleName }}</p>
                                        <p class="text-xs text-gray-500">ID: {{ assignFormRoleId }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white p-3 rounded-lg border">
                                <h5 class="text-xs font-medium text-gray-600 mb-2">JSON Payload:</h5>
                                <pre class="text-xs text-gray-700 bg-gray-50 p-2 rounded overflow-x-auto">{{ JSON.stringify({
                                    role_id: parseInt(assignFormRoleId),
                                    menu_ids: assignFormMenuIds
                                }, null, 2) }}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AssignRolesTab',
    props: {
        rolesData: Array,
        assignFormRoleId: [String, Number],
        assignFormMenuIds: Array,
        menuSearchQuery: String,
        filteredMenus: Array,
        totalMenuCount: Number,
        selectedRoleName: String,
        getMenuIcon: Function,
    },
    methods: {
        toggleMenuId(menuId) {
            const newMenuIds = [...this.assignFormMenuIds];
            const index = newMenuIds.indexOf(menuId);
            if (index > -1) {
                newMenuIds.splice(index, 1);
            } else {
                newMenuIds.push(menuId);
            }
            this.$emit('update:assignFormMenuIds', newMenuIds);
        }
    }
}
</script>