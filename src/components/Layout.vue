<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix&&`${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import x from '@/assets/icons/money.svg';

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
  @Prop() classPrefix: string;
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow: auto;
  flex-grow: 1;
}
</style>