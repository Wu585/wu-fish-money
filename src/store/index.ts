import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [] as Tag[]
    },
    mutations: {
        fetchRecords(state) {
            state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record) {
            const record2 = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
            store.commit('saveRecords');
            console.log(state.recordList);
        },
        saveRecords(state) {
            localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(localStorage.getItem('tagList') || '[]');
        },
        createTags(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
                return 'duplicated';
            }
            const id = createId().toString();
            state.tagList.push({id: id, name: name});
            store.commit('saveTags');
            window.alert('添加成功');
            return 'success';
        },
        saveTags(state) {
            localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    },
    actions: {},
    modules: {}
});

export default store;