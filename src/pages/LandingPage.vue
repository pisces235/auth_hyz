<template>
  <div
    class="landing-page relative-position column width-percentage-100 text-center"
  >
    <div class="landing-page_img"></div>
    <div class="landing-page_bottom text-sm">
      <div class="date mb-12">30 Jan - 15 Feb 2022</div>
      <div class="title mb-8 width-percentage-70 mx-auto">
        Reunite the Zodiac animals and win Ang baos worth up to S$888
      </div>

      <router-link to="/login" class="landing-page--link mx-auto fit-content">
        <ButtonForm
          :btnTitle="'Login To My Account'"
          :btnColor="'danger'"
          class="mb-2"
          :imgSrc="'/images/bg_btn_danger.png'"
          :imgWidth="'280'"
          :imgHeight="'44'"
        />
      </router-link>
      <router-link to="/signup" class="landing-page--link mx-auto fit-content">
        <ButtonForm
          :btnTitle="'Create New Account'"
          :btnColor="'warning'"
          :imgSrc="'/images/bg_btn_warning.png'"
          :imgWidth="'280'"
          :imgHeight="'44'"
        />
      </router-link>

      <div class="alert mt-12 text-xs pt-8 pb-8">
        <div class="text">
          Safety Reminder: Remember to wear your masks and practise safe
          distancing while hunting!
        </div>
      </div>
      <nav class="link-contact mt-15 mb-15">
        <ul class="width-percentage-100">
          <li v-for="(item, i) in contacts" :key="i" class="pl-10 pr-10">
            <router-link :to="item.link">{{ item.title }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonForm from '../components/form/ButtonForm.vue'
const contacts = [
  {
    title: 'FAQ',
    link: '#'
  },
  {
    title: 'Terms & Conditions',
    link: '#'
  }
]
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.landing-page {
  background: linear-gradient(#ffecd6, #ffe9c8);
  max-width: 600px;
  min-height: 100vh;
  &_img {
    background: url('/images/group19687.png') no-repeat bottom center;
    background-size: auto;
    height: 335px;
  }
  &_bottom {
    .alert {
      border-top: 3px solid #b78d5e;
      border-bottom: 3px solid #b78d5e;
      background-color: #fcd074;
      display: block;
    }
    .link-contact {
      position: absolute;
      bottom: 0;

      width: 100%;
      ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        li:not(:last-child) {
          border-right: 2px solid #b78d5e;
        }
        li {
          a {
            color: $dark-blue !important;
          }
        }
      }
    }
  }

  .landing-page--link,
  .form-field {
    display: block;
  }
}
</style>
