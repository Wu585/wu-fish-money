import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
    tagList: [] as Tag[],
    fetchTags() {
        this.tagList = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList;
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            window.alert('标签名重复了');
            return 'duplicated';
        }
        const id = createId().toString();
        this.tagList.push({id: id, name: name});
        this.saveTags();
        window.alert('添加成功');
        return 'success';
    },
    removeTag(id: string) {
        const idList = this.tagList.map(item => item.id);
        const index = idList.indexOf(id);
        if (index >= 0) {
            this.tagList.splice(index, 1);
            this.saveTags();
            return true;
        } else {
            return false;
        }
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    saveTags() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
};

tagStore.fetchTags();

export default tagStore;