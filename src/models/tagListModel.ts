import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'  //success表示成功，duplicated表示标签名重复
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name) {

        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createId().toString();
        this.data.push({id: id, name: name});
        this.save();
        return 'success';
    },
    update(id, name) {
        const idList = this.data.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(item => item.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    remove(id: string) {
        const idList = this.data.map(item => item.id);
        const index = idList.indexOf(id);
        if (index >= 0) {
            this.data.splice(index, 1);
            this.save();
            return true;
        } else {
            return false;
        }
    },
    save() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;
