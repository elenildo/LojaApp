<template>
    <div class="adm-main">
        <menu-left></menu-left>
        <div class="adm-content">
            <div class="container-adm">
                <div v-if="!this.showForm">
                    <h2>Categorias</h2>
                    <div class="search-bar">
                        <input type="text" placeholder="Digite o nome da categoria" v-model="busca" v-on:keyup="buscar()">
                        <label for="rows">Registros por página:</label>
                        <select v-model="rowsPerPage" @change="getCategorias()" id="rows">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <button @click="showForm = true" class="butn float-right">Adicionar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Categoria</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tr v-for="categoria in categorias.content" :key="categoria.id">
                            <td>{{ categoria.id }}</td>
                            <td>{{ categoria.nome }}</td>
                            <td>
                                <a href="" @click.prevent="editar(categoria)">Editar</a>
                            </td>
                        </tr>
                    </table>
                    <paginator-store :source="categorias" @navigate="navigate"></paginator-store>
                </div>

                <form v-if="this.showForm" @submit.prevent="submit()" class="form-adm">
                    <h2>Categoria</h2>
                    <div class="form-component">
                        <label for="nome">Nome</label>
                        <input type="text" id="nome" v-model="categoria.nome">
                    </div>
                    <div class="form-row">
                        <button class="butn">Salvar</button>
                        <input type="button" value="Voltar" @click.prevent="fecharForm()" class="butn butn-inverse">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/service/http_auth'
import MenuLeft from '@/components/admin/MenuLeft.vue'
import MainContent from '@/components/admin/MainContent.vue'
import PaginatorStore from '@/components/PaginatorStore.vue'

export default {
   name: 'AdmHome',
   components:{
    MenuLeft,
    MainContent,
    PaginatorStore
},
   data(){
    return{
        categorias: [],
        categoria: {
            id: null,
            nome: null
        },
        busca: "",
        showForm: false,
        rowsPerPage: 10
    }
   },
   computed: {
    computedVisible: function () {
      return this.width;
    }
  },
   methods:{
      getCategorias(page){
          http.get(`admin/categorias?page=${page}&size=${this.rowsPerPage}`).then(resp=>{
            this.categorias = resp.data

          }).catch(error=>{
            this.$router.push({name: 'erro', query:{message: error.response.data.error }})
          })
      },
      navigate(page){
        this.getCategorias(page-1)
      },
      submit(){
        if(this.categoria.id){
            this.alterar()
        } else {
            this.salvar()
        }
      },
      salvar(){
        http.post('admin/categorias', this.categoria).then(resp=>{
            this.limparForm()
            this.getCategorias()
        }).catch(error=>{
            alert(error)
        })

      },
      alterar(){
        if(! confirm('Deseja alterar essa categoria?')){
            this.limparForm()
            return
        }
        http.put(`admin/categorias/${this.categoria.id}`, this.categoria).then(resp=>{
            this.limparForm()
            this.getCategorias()

        }).catch(error=>{
            alert(error)
        })
      },
      editar(categoria){
        this.categoria.id = categoria.id
        this.categoria.nome = categoria.nome
        this.showForm = true
      },
      limparForm(){
        this.categoria.id = null
        this.categoria.nome = null
        this.showForm = false
      },
      buscar(page){
          http.post(`admin/categorias/busca?nome=${this.busca}&size=${this.rowsPerPage}`).then(resp=>{
            this.categorias = resp.data

          }).catch(error=>{
            alert("Erro ao buscar categoria: "+error)
          })
      },
      fecharForm(){
        this.showForm = false
      }
    },
    mounted(){
        this.getCategorias()
    } 
}
</script>

<style lang="scss">

</style>