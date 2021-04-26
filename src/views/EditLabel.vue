<template>
  <Layout>
    <div class="navBar">
      <Icon @click.native="goBack" class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="formWrapper">
      <FormItem :value="tag.name" @update:value="update" field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="buttonWrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      this.$store.commit('updateTag', {id: this.tag.id, name});
    }
  }

  remove(id: string) {
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id);
      this.$router.push('/labels');
    }
  }

  goBack() {
    this.$router.replace('/labels');
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .title {
  }

  > .leftIcon {
    left: 16px;
    width: 20px;
    height: 20px;
  }

  > .rightIcon {
    width: 20px;
    height: 20px;
  }
}

.formWrapper {
  background: white;
  margin-top: 8px;
}

.buttonWrapper {
  text-align: center;
  padding: 16px;
}
</style>