<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Types extends Vue {

}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    line-height: 64px;
    height: 64px;
    position: relative;

    &.selected {
      &::after {
        content: '';
        position: absolute;
        border-bottom: 3px solid;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #333;
      }
    }
  }
}
</style>