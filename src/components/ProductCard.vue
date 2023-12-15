<template>
    <div class="card-produto">
        <router-link :to="{name:'produto', params:{id: produto.id}}" >
            <div class="card-cabecalho">
                <span v-text="produto.nome"></span>
                </div>
                <div v-if="produto.imagens.length == 0">
                <img src="../assets/noimage.jpg" alt="Sem imagem">
                </div>
                <div v-else v-for="imagem in produto.imagens.slice(0,1)" :key="imagem.id">
                <img :src="'data:image/jpeg;base64,'+imagem.imagem" :alt="produto.nome" />
            </div>
            <p v-if="produto.disponivel">R$ {{ produto.precoVenda }}</p>
            <p v-else>Produto indisponível</p>
        </router-link> 
    </div>
</template>

<script>
    export default{
        name: 'ProductCard',
        props: ["produto"]
    }

</script>

<style lang="scss" scoped>
.card-produto{
    width: 194px;
    float: left;
    border: solid 1px lightgray;
    padding: 0.5em;
    margin-right: 1em;
    margin-top: 1em;
    box-shadow: 0.5em 0.5em lightgray;
    background-color: white;
    text-align: center;

    img{
        float: left ;
        width: 100%;
        margin: 1em 0;
    }
    a{
        text-decoration: none;
        color: #333;
    }
    .card-cabecalho{
        height: 2em;
    }
    span{
        font-size: 1.2em;
    }
}


</style>