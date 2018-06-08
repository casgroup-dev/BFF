<template>
  <div class="wrapper">
    <side-bar title="CasGroup">
      <!-- <mobile-menu slot="content"/> -->
      <sidebar-link to="/licitaciones">
        <i class="nc-icon nc-notes"></i>
        <p>Licitaciones</p>
      </sidebar-link>
      <sidebar-link to="/providers">
        <i class="nc-icon nc-delivery-fast"></i>
        <p>Proveedores</p>
      </sidebar-link>
      <button class="btn btn-round logout-button" @click="logout">
        <i class="fa fa-sign-out"></i> Salir
      </button>
      <!--
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-paper-2"></i>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>
      -->
    </side-bar>
    <div class="main-panel">
      <top-navbar/>
      <dashboard-content @click="toggleSidebar">
      </dashboard-content>
      <content-footer/>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import api from '../../../api/index'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      logout () {
        api.logout(this.$router)
      }
    }
  }
</script>
<style>
  .logout-button {
    width: 80%;
    margin-left: 10%;
  }
</style>
