<script setup>
import { reactive, ref } from 'vue';

import AfrInputLabel from '@/components/form/AfrInputLabel.vue';
import AfrButtonCircleIcon from "@/components/form/AfrButtonCircleIcon.vue";

const form = reactive({
  email: '',
});
</script>

<template>
  <div class="Registration">
    <div class="panel-registration">
      <div class="panel-registration-header">
        <a class="btn-go-home-page" title="На главную" href="/">
          <afr-button-circle-icon>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-circle-left"
              class="svg-inline--fa fa-chevron-circle-left fa-w-16 "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"
              ></path>
            </svg>
          </afr-button-circle-icon>
        </a>
        Регистрация
      </div>
      <div class="panel-registration-content">
        <form id="formRegistration" action="https://apprendrefr.ru/api/auth/registration" method="post">

          <afr-input-label v-model="form.email" label="Email"/>

          <div class="form-item">
            <div class="Input-Form "><input type="text" name="email" required="" autocomplete="on" value=""><span
              data-placeholder="Email"></span></div>
          </div>
          <div class="form-item">
            <div class="Input-Form "><input type="text" name="login" required="" autocomplete="on" value=""><span
              data-placeholder="Имя/логин"></span></div>
          </div>
          <div class="form-item">
            <div class="Input-Form "><input type="password" name="password" required="" autocomplete="on" value=""><span
              data-placeholder="Пароль"></span></div>
          </div>
          <div class="form-item">
            <div class="Input-Form ">
              <input
                type="password"
                name="password_confirmation"
                required="" autocomplete="on"
                value="">
              <span data-placeholder="Подтвердите пароль"></span>
            </div>
          </div>
          <div>
            <div class="checkbox-apr">
              <input id="labelPersonalDataProtectionPolicy" type="checkbox" name="remember">
              <span></span>
            </div>
            <label
              class="label-personal-data-protection-policy"
              for="labelPersonalDataProtectionPolicy"
            >
              Подтверждаю,
              что ознакомился и принимаю
              <a href="#" class="link">правила пользовательского соглашения</a> и
              <a href="#" class="link">Политику по защите персональных данных</a>.
            </label>
          </div>
          <div class="form-item mt-40 text-center">
            <button class="Btn-load" type="submit">
              <span>Зарегистрироваться</span>

            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
