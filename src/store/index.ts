import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

// type RootState = {
//     recordList: RecordItem[],
//     tagList: Tag[],
//     currentTag?: Tag
// };

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [] as Tag[],
        currentTag: {} as Tag
    },
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            const idList = state.tagList.map(item => item.id);
            const index = idList.indexOf(id);
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
            }
        }
        ,
        fetchRecords(state) {
            state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record) {
            const record2 = clone(record);
            record2.createdAt = new Date().toISOString();
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
            }
            const id = createId().toString();
            state.tagList.push({id: id, name: name});
            store.commit('saveTags');
            window.alert('添加成功');
        },
        saveTags(state) {
            localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    },
    actions: {},
    modules: {}
});

export default store;