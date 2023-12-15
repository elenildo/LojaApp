<template>
    <div class="adm-main">
        <menu-left></menu-left>
        <div class="adm-content">
            <div class="container-adm">
                conteudo
            </div>
        </div>
    </div>
</template>

<script>
import MenuLeft from '@/components/admin/MenuLeft.vue'

export default {
   name: 'AdmHome',
   components:{
    MenuLeft,
   }
}
</script>

<style lang="scss">

</style>