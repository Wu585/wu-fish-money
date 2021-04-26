<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notesWrapper">
      <FormItem field-name="备注"
                placeholder="在这里请输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const version = window.localStorage.getItem('version') || 0;
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

if (version === '0.0.1') {
  recordList.forEach(record => {
    record.createdAt = new Date(0);
  });
  localStorage.setItem('recordList', JSON.stringify(recordList));
}

window.localStorage.setItem('version', '0.0.2');

@Component({
  components: {Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
  tags = tagList;
  recordList = recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  saveRecord() {
    recordListModel.create(this.record);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save();
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