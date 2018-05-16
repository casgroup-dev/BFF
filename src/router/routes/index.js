// General views
import DashboardLayout from '../../components/Dashboard/Layout/DashboardLayout.vue'
import NotFound from '../../components/GeneralViews/NotFoundPage.vue'
import Login from '../../components/GeneralViews/login/Layout'
import Register from '../../components/GeneralViews/register/Layout'
import NuevaLicitacion from 'src/components/Dashboard/Views/Licitaciones/Nueva/Home'
import LicitacionLayout from 'src/components/Dashboard/Views/Licitaciones/Licitacion/Layout'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import LicitacionesHome from 'src/components/Dashboard/Views/licitaciones/Home'
import ProvidersHome from 'src/components/Dashboard/Views/providers/Home.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/licitaciones',
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
    path: '/licitaciones',
    component: DashboardLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: '/',
        name: 'home',
        component: LicitacionesHome
      },
      {
        path: '/Licitacion',
        name: 'licitacion',
        component: LicitacionLayout
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
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
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
