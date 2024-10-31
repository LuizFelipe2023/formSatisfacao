<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Home</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <survey-form />
  </ion-content>
</template>

<script>
import SurveyForm from '@/views/SurveyForm.vue';

export default {
  components: {
    SurveyForm,
  },
};
</script>
