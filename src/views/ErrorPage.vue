<template>
    <div class="error-message">
        <h2>{{ mensagem }}</h2>
    </div>
</template>

<script>
    export default{
        name: 'ErrorPage',
        data(){
            return{
                mensagem: this.$route.query.message
            }
        },
        mounted() {
            this.$emit('login')
            this.$emit('cartModified')
        },  
    }
</script>

<style lang="scss">
.error-message{
    display: flex;
    height: 600px;

    h2{
        margin: auto;
    }
}
</style>