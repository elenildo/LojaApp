<template>
    <div class="adm-main">
        <menu-left></menu-left>
        <div class="adm-content">
            <div class="container-adm">
                <table class="table">
                    <tr>
                        <td>
                            <form @submit.prevent="submit()" class="form-adm">
                                <h2>Lançar em Estoque</h2>
                                <div class="form-row">
                                    <div class="form-component">
                                        <label for="produto">Produto</label>
                                        <select id="produto" v-model="lancamento.produto">
                                            <option :selected="true" :value="false" disabled>Selecione o produto</option>
                                            <option v-for="produto in produtos" :key="produto.id" :value="produto">
                                            {{ produto.nome }} - {{ produto.estoqueAtual }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-component">
                                    <label for="cbarras">Código de Barras</label>
                                    <input type="number" id="cbarras" v-model="lancamento.codigoBarras" step="1">
                                </div>
                                <div class="form-component">
                                    <label for="quantidade">Quantidade</label>
                                    <input type="number" id="quantidade" v-model="lancamento.quantidade" step="1" min="1" max="100">
                                </div>
                                <div class="form-row">
                                    <button v-if="this.lancamento.produto" class="butn">Lançar</button>
                                </div>
                            </form>
                        </td>
                        <td>
                            <div v-if="this.produto.id != null">
                                <h4>{{ this.produto.nome }}</h4>
                                <p>Estoque atual: {{ this.produto.estoqueAtual }}</p>
                            </div>
                        </td>
                    </tr>
                </table>
               
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/service/http_auth'
import MenuLeft from '@/components/admin/MenuLeft.vue'
import MainContent from '@/components/admin/MainContent.vue'

export default {
   name: 'AdmHome',
   components:{
    MenuLeft,
    MainContent
   },
   data(){
    return{
        produtos: [],
        lancamento: {
            id: null,
            produto: null,
            codigoBarras: "",
            quantidade: 1
        },
        produto:{},
        busca: ""
    }
   },
   methods:{
      getprodutos(){
          http.get('admin/produtos').then(resp=>{
            this.produtos = resp.data.content

          }).catch(error=>{
            this.$router.push({name: 'erro', query:{message: error.response.data.error }})
          })
      },
      submit(){
        if(this.lancamento.id){
            this.alterar()
        } else {
            this.salvar()
        }
      },
      salvar(){
        if(! this.lancamento.quantidade) return alert('Digite a quantidade de produtos que será lançado')
        http.post('admin/estoque', this.lancamento).then(resp=>{
            this.limparForm()
            this.produto = resp.data
            this.getprodutos()
            alert('Produto(s) adicionado(s) ao estoque!')
        }).catch(error=>{
            alert(error)
        })

      },
    //   alterar(){
    //     if(! confirm('Deseja alterar essa produto?')){
    //         this.limparForm()
    //         return
    //     }
    //     http.put(`admin/produtos/${this.produto.id}`, this.produto).then(resp=>{
    //         this.limparForm()
    //         this.getprodutos()

    //     }).catch(error=>{
    //         alert(error)
    //     })
    //   },
      editar(lancamento){
        this.lancamento.id = lancamento.id
      },
      limparForm(){
        this.lancamento = {
            quantidade: 1
        }
        this.showForm = false
      },
    //   buscar(){
    //       http.post(`admin/produtos/busca?nome=${this.busca}`).then(resp=>{
    //         this.produtos = resp.data

    //       }).catch(error=>{
    //         alert("Erro ao buscar produto: "+error)
    //       })
    //   },
    },
    mounted(){
        this.getprodutos()
    } 
}
</script>

<style lang="scss" scoped>

table, td, th{
    border: none;
}

</style>