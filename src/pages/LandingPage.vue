<template>
  <div
    class="landing-page relative-position column width-percentage-100 height-viewport-100 text-center"
  >
    <div class="landing-page_img"></div>
    <div class="landing-page_bottom text-sm">
      <div class="date mb-12">30 Jan - 15 Feb 2022</div>
      <div class="title mb-8 width-percentage-70 mx-auto">
        Reunite the Zodiac animals and win Ang baos worth up to S$888
      </div>
      <router-link to="/login">
        <ButtonForm
          :title_btn="'Login To My Account'"
          :color_btn="'danger'"
          class="mb-2"
          :src="'/src/images/bg_btn_danger.png'"
          :width="'280'"
          :height="'44'"
        />
      </router-link>
      <router-link to="/create-account">
        <ButtonForm
          :title_btn="'Create New Account'"
          :color_btn="'warning'"
          :src="'/src/images/bg_btn_warning.png'"
          :width="'280'"
          :height="'44'"
        />
      </router-link>

      <div class="alert mt-12 text-xs pt-8 pb-8">
        <div class="text">
          Safety Reminder: Remember to wear your masks and practise safe
          distancing while hunting!
        </div>
      </div>
      <nav class="link-contact mt-20 mb-20 absolute-bottom">
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
import ButtonForm from '../components/form/buttonFrom.vue'
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
  &_img {
    background: url('../images/Group 19687.png') no-repeat bottom center;
    background-size: auto;
    height: 350px;
  }
  &_bottom {
    .alert {
      border-top: 3px solid #b78d5e;
      border-bottom: 3px solid #b78d5e;
      background-color: #fcd074;
      display: block;
    }
    .link-contact {
      ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        color: $dark-blue;
        li:not(:last-child) {
          border-right: 2px solid #b78d5e;
        }
      }
    }
  }
}
</style>
