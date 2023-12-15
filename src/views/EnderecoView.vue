<template>
    <div class="container">
        <store-navbar />
        <address-form />
    </div>
</template>

<script>
import StoreNavbar from '@/components/StoreNavbar.vue';
import AddressForm from '@/components/AddressForm.vue';

export default {
    name: "RegisterView",
    components: { StoreNavbar, AddressForm },
    mounted() {
        this.$emit('login')
        this.$emit('cartModified')
    },
}
</script>

<style lang="scss" scoped>

</style>