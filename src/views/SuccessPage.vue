<template>
  <ion-content>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="card text-center" style="width: 100%; max-width: 600px; padding: 20px;">
        <h2>{{ localIsSuccess ? 'Pesquisa Enviada com Sucesso!' : 'Erro ao Enviar Pesquisa' }}</h2>
        <p v-if="!localIsSuccess">{{ localMessage }}</p>
        <ion-button @click="goBack" class="mt-3">Voltar para o Formulário</ion-button>
      </div>
    </div>
  </ion-content>
</template>

<script>
export default {
  props: {
    isSuccess: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localIsSuccess: this.isSuccess,
      localMessage: this.message,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/home'); 
    },
  },
  created() {
    const params = this.$route.query; // Use query params
    if (params.success === 'true') {
      this.localIsSuccess = true;
    } else if (params.success === 'false') {
      this.localIsSuccess = false;
      this.localMessage = params.message || 'Um erro ocorreu.';
    }
  },
};
</script>

<style scoped>
.card {
  background-color: #f8f9fa; /* Card background color */
  border: 1px solid #dee2e6; /* Card border color */
  border-radius: 0.5rem; /* Rounded corners */
}
</style>
