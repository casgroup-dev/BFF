import DashboardLayout from '../../components/Dashboard/Layout/DashboardLayout.vue'
import NotFound from '../../components/GeneralViews/NotFoundPage.vue'
import Login from '../../components/GeneralViews/login/Layout'
import Register from '../../components/GeneralViews/register/Layout'
import NuevaLicitacion from 'src/components/Dashboard/Views/Licitaciones/Nueva/Home'
import LicitacionLayout from 'src/components/Dashboard/Views/Licitaciones/Licitacion/Layout'
import LicitacionesHome from 'src/components/Dashboard/Views/Licitaciones/Home'
import ProvidersHome from 'src/components/Dashboard/Views/providers/Home.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/Licitaciones',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/Licitaciones',
    component: DashboardLayout,
    meta: {requiresAuth: true},
    props: true,
    children: [
      {
        path: '/',
        name: 'home',
        component: LicitacionesHome,
        props: true
      },
      {
        path: '/Licitacion',
        name: 'licitacion',
        component: LicitacionLayout,
        props: true
      },
      {
        path: '/Nueva',
        name: 'NewLicit',
        component: NuevaLicitacion
      }

    ]
  },
  {
    path: '/Providers',
    component: DashboardLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: '/',
        name: 'Home',
        component: ProvidersHome
      }
    ]
  },
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
