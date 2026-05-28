import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Mengambil field Status dari objek kustom Smart_Contract__c kamu
const FIELDS = ['Smart_Contract__c.Status__c'];

export default class ApprovalTracking extends LightningElement {
    @api recordId; // Otomatis mengambil ID data kontrak dari halaman
    approvalStatus = 'Draft';

    // Wire service untuk mendeteksi perubahan data di Salesforce secara real-time
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            const statusValue = data.fields.Status__c.value;
            this.approvalStatus = statusValue ? statusValue : 'Draft';
        } else if (error) {
            console.error('Gagal memuat status approval', error);
        }
    }

    // Mengatur warna badge otomatis berdasarkan status kontrak
    get badgeClass() {
        if (this.approvalStatus === 'Approved') {
            return 'slds-theme_success';
        } else if (this.approvalStatus === 'In Review') {
            return 'slds-theme_warning';
        }
        return 'slds-theme_light';
    }
}