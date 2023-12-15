<template>
    <div class="adm-main">
        <menu-left></menu-left>
        <div class="adm-content">
            <div class="container-adm">
                <div v-if="showDetails">
                    <div class="mt-3">
                        <button class="butn butn-inverse" @click="showDetails = false">Voltar</button>
                    </div>
                    <table>
                        <tr>
                            <td>Ped. {{ pedido.numero }}</td>
                            <td>Data: {{ pedido.data }}</td>
                            <td>Forma de pagamento: {{ pedido.formaPagamento }}</td>
                            <td><label for="status" class="mr-2">Status:</label>
                                <select id="status" v-model="pedido.status" @change="changeOrderStatus()" class="bg-info">
                                    <option value="PENDENTE">Pendente</option>
                                    <option value="PAGO">Pago</option>
                                    <option value="ENVIADO">Enviado</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Subtotal: R${{ pedido.subtotal }}</td>
                            <td>Frete: R$ {{ pedido.frete }}</td>
                            <td>Descontos: R$ {{ pedido.descontos }}</td>
                            <td>Total: R$ {{ pedido.total }}</td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <p>Cliente: {{ pedido.cliente.nome }} {{ pedido.cliente.sobrenome }}</p>
                                <p>Email: {{ pedido.cliente.email }}</p>
                                <p>Localização: {{ pedido.cliente.endereco.cidade }}/{{ pedido.cliente.endereco.estado }}
                                </p>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <thead>
                            <th>cód. Produto</th>
                            <th>Descrição</th>
                            <th>Preço Un.</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in pedido.itens" :key="item.produtoId">
                                <td>{{ item.produtoId }}</td>
                                <td>{{ item.produto }}</td>
                                <td>{{ item.precoUnitario }}</td>
                                <td>{{ item.quantidade }}</td>
                                <td>{{ item.subtotal }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else>
                    <h2>Pedidos</h2>
                    <div class="search-bar">
                        <input type="text" placeholder="Digite o numero" v-model="busca" v-on:keyup="buscar()">
                        <label for="rows">Registros por página:</label>
                        <select v-model="rowsPerPage" @change="getPedidos(page)" id="rows">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Data</th>
                                <th>Valor total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tr v-for="pedido in pedidos.content" :key="pedido.numero">
                            <td><a href="" @click.prevent="select(pedido)">{{ pedido.numero }}</a></td>
                            <td>{{ pedido.data }}</td>
                            <td>{{ pedido.total }}</td>
                            <td>{{ pedido.status }}</td>
                        </tr>
                    </table>
                    <paginator-store :source="pedidos" @navigate="navigate" />

                </div>
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
    components: {
        MenuLeft,
        MainContent,
        PaginatorStore
    },
    data() {
        return {
            pedidos: [],
            pedido: {},
            busca: "",
            rowsPerPage: 10,
            showDetails: false,
            modalShow: false
        }
    },
    methods: {
        getPedidos(page) {
            http.get(`admin/pedidos?page=${page}&size=${this.rowsPerPage}`).then(resp => {
                this.pedidos = resp.data

            }).catch(error => {
                this.$router.push({ name: 'erro', query: { message: error.response.data.error } })
            })
        },
        select(pedido) {
            this.pedido = pedido
            this.showDetails = true
            console.log(this.pedido)
        },
        changeOrderStatus() {
            if (!confirm('Deseja alterar o estado deste pedido?')) return
            http.patch(`admin/pedidos/${this.pedido.numero}`, { pedidoStatus: this.pedido.status }).then(resp => {
                this.getPedidos()
                this.showDetails = false
            }).catch(error => {
                alert(error)
            })

        },
        navigate(page) {
            this.getPedidos(page - 1)
        },
        buscar() {
            http.post(`admin/pedidos/busca?numero=${this.busca}&size=${this.rowsPerPage}`).then(resp => {
                this.pedidos = resp.data
            }).catch(error => {
                alert("Erro ao buscar usuário: " + error)
            })
        },
    },
    created() {
        this.getPedidos()
    }
}
</script>

<style lang="scss"></style>