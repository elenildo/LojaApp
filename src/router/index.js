import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import ErrorPage from '@/views/ErrorPage'
import ProductView from '@/views/ProductView'
import RegisterView from '@/views/RegisterView'
import LoginView from '@/views/LoginView' 
import EnderecoView from '@/views/EnderecoView'
import ProfileView from '@/views/ProfileView'
import CartView from '@/views/CartView'
import OrderSummary from '@/views/OrderSummary'
import AdmHome from '@/views/admin/AdmHome'
import AdmUser from '@/views/admin/AdmUser'
import AdmCategory from '@/views/admin/AdmCategory'
import AdmProduct from '@/views/admin/AdmProduct'
import AdmLaunch from '@/views/admin/AdmLaunch'
import AdmOrder from '@/views/admin/AdmOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/erro',
    name: 'erro',
    component: ErrorPage
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: ProductView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/endereco',
    name: 'endereco',
    component: EnderecoView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: ProfileView
  },
  {
    path: '/carrinho',
    name: 'carrinho',
    component: CartView
  },
  {
    path: '/pedido',
    name: 'pedido',
    component: OrderSummary
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdmHome,
    params: true
  },
  {
    path: '/admin/usuarios',
    name: 'admUser',
    component: AdmUser
  },
  {
    path: '/admin/categorias',
    name: 'admCategory',
    component: AdmCategory
  },
  {
    path: '/admin/produtos',
    name: 'admProduct',
    component: AdmProduct
  },
  {
    path: '/admin/lancamentos',
    name: 'admLaunch',
    component: AdmLaunch
  },
  {
    path: '/admin/vendas',
    name: 'admOrder',
    component: AdmOrder
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
