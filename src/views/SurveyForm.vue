<template>
  <ion-content>
    <div :key="$route.path"> 
      <div class="container survey-form d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="card rounded p-4" style="width: 100%; max-width: 800px; padding: 40px;">
          <h2 class="text-center mb-4">Formulário de Satisfação</h2>
          <form @submit.prevent="submitSurvey">
            <div class="mb-4">
              <label class="form-label">O quanto está satisfeito com a recepção da Fapeam?</label>
              <div class="d-flex justify-content-between">
                <div class="form-check" @click="setSatisfaction('very_satisfied')" :class="{ selected: satisfaction === 'very_satisfied' }">
                  <i class="bi bi-emoji-grin icon-large" aria-hidden="true"></i>
                </div>
                <div class="form-check" @click="setSatisfaction('satisfied')" :class="{ selected: satisfaction === 'satisfied' }">
                  <i class="bi bi-emoji-smile icon-large" aria-hidden="true"></i>
                </div>
                <div class="form-check" @click="setSatisfaction('neutral')" :class="{ selected: satisfaction === 'neutral' }">
                  <i class="bi bi-emoji-neutral icon-large" aria-hidden="true"></i>
                </div>
                <div class="form-check" @click="setSatisfaction('dissatisfied')" :class="{ selected: satisfaction === 'dissatisfied' }">
                  <i class="bi bi-emoji-frown icon-large" aria-hidden="true"></i>
                </div>
                <div class="form-check" @click="setSatisfaction('very_dissatisfied')" :class="{ selected: satisfaction === 'very_dissatisfied' }">
                  <i class="bi bi-emoji-angry icon-large" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Comentário Adicional</label>
              <textarea v-model="comments" class="form-control" rows="3"></textarea>
            </div>
            <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-if="!isLoading">Enviar</span>
            </button>
          </form>

          <div v-if="message" :class="['mt-3 text-center alert', { 'alert-success': isSuccess, 'alert-danger': !isSuccess }]">
            <strong>{{ message }}</strong>
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script>
import { useRouter } from 'vue-router'; 

export default {
  data() {
    return {
      satisfaction: '',
      comments: '',
      message: '',
      isSuccess: false,
      isLoading: false,
    };
  },
  methods: {
    setSatisfaction(value) {
      this.satisfaction = value;
    },
    submitSurvey() {
      this.isLoading = true; // Start loading
      fetch('http://localhost:3000/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          satisfaction: this.satisfaction,
          comments: this.comments,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar a pesquisa');
        }
        return response.json();
      })
      .then(data => {
        this.message = 'Pesquisa enviada com sucesso!';
        this.isSuccess = true;

       
        this.resetForm();

    
        this.$router.push({ path: '/success', query: { success: 'true' } });
      })
      .catch(error => {
        this.message = error.message;
        this.isSuccess = false;

        this.$router.push({ path: '/success', query: { success: 'false', message: error.message } });
      })
      .finally(() => {
        this.isLoading = false; 
      });
    },
    resetForm() {
      // Reset form fields
      this.satisfaction = '';
      this.comments = '';
      this.message = '';
      this.isSuccess = false;
    },
  },
  mounted() {
    this.resetForm(); 
  },
};
</script>

<style scoped>
.survey-form {
  padding: 32px;
}
.card {
  background-color: #f8f9fa; 
  border: 1px solid #dee2e6; 
}
.form-check {
  cursor: pointer; 
}
.selected {
  color: #007bff; 
  transform: scale(1.2); 
}
.icon-large {
  font-size: 4rem; 
}
</style>
