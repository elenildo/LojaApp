<template>
    <div class="container">
        <store-navbar />
        <RegisterForm />
    </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import StoreNavbar from '@/components/StoreNavbar.vue';

export default {
    name: "RegisterView",
    components: { RegisterForm, StoreNavbar }
}
</script>

<style lang="scss" scoped>

</style>