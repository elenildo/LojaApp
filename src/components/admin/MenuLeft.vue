<template>
    <aside>
        <ul>
            <li><router-link :to="{name: 'admin'}" >Home</router-link></li>
            <li><router-link :to="{name: 'admUser'}" >Usuários</router-link></li>
            <li><router-link :to="{name: 'admCategory'}" >Categorias</router-link></li>
            <li><router-link :to="{name: 'admProduct'}" >Produtos</router-link></li>
            <li><router-link :to="{name: 'admLaunch'}" >Lançamentos</router-link></li>
            <li><router-link :to="{name: 'admOrder'}" >Vendas</router-link></li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: 'MenuLeft'
}
</script>

<style lang="scss" scoped>
aside{
    background-color: #b0bbe6;
    padding: 0 1em;
    min-width: 150px;
    min-height: 600px;

    ul{
        list-style: none;
        padding: 0;

        li{
            padding: 0.5em 0;
        }
    }
}

</style>