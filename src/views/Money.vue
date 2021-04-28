<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notesWrapper">
      <FormItem field-name="备注"
                placeholder="在这里请输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

// const version = window.localStorage.getItem('version') || 0;
// const recordList = window.recordList;
//
// if (version === '0.0.1') {
//   recordList.forEach(record => {
//     record.createdAt = new Date(0);
//   });
//   localStorage.setItem('recordList', JSON.stringify(recordList));
// }
//
// window.localStorage.setItem('version', '0.0.2');
@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  // eslint-disable-next-line no-undef
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notesWrapper {
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>
</style>