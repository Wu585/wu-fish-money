import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList;
    },
    saveRecords() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const record2 = clone(record);
        record2.createdAt = new Date().toString();
        this.recordList && this.recordList.push(record);
        recordStore.saveRecords();
    }
};

recordStore.fetchRecords();

export default recordStore;