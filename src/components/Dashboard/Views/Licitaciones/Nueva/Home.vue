<template>
  <div class="content">
    <div class="container-fluid">
      <form>
        <div class="form-group">
          <label for="licitName">Nombre</label>
          <input type="text" class="form-control" id="licitName" placeholder="Nombre Licitación">
        </div>
        <div class="form-group">
          <label for="empresaAsociada">Empresa Autora</label>
          <input type="text" class="form-control" id="empresaAsociada" placeholder="CasGroup">
        </div>
        <div class="form-group">
          <label for="bases">Bases</label>
          <textarea class="form-control" id="bases" style="height: 150px;"></textarea>
          <small id="basesHelpBlock" class="form-text text-muted">
            Descripción de bases pendiente
          </small>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home.vue'
  }
</script>

<style>
</style>
