<template>
    <div class="h-screen bg-gray-50 w-full">
        <!-- Navbar Component -->
        <AppNavbar />

        <div class="flex pt-16 h-screen">
            <!-- Sidebar Component -->
            <AppSidebar />

            <!-- Main Content -->
            <div class="flex-1 ml-64">
                <!-- Breadcrumb Component -->
                <AppBreadcrumb />

                <!-- Page Content -->
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';
import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';

// import AppNavbar from './components/AppNavbar.vue'
// import AppSidebar from './components/AppSidebar.vue'
// import AppBreadcrumb from './components/AppBreadcrumb.vue'

export default {
    name: 'ListriQuLayout',
    components: {
        AppNavbar,
        AppSidebar,
        AppBreadcrumb
    }
}
</script>