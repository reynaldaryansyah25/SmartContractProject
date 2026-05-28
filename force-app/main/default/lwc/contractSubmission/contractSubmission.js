import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContractSubmission extends LightningElement {
    @track contractId;

    get acceptedFormats() {
        return ['.pdf', '.docx', '.doc'];
    }

    handleSuccess(event) {
        this.contractId = event.detail.id;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Sukses!',
                message: 'Data Smart Contract berhasil dibuat. Silakan unggah dokumennya.',
                variant: 'success',
            })
        );
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files.length;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'File Berhasil Dilampirkan',
                message: uploadedFiles + ' dokumen kontrak telah disimpan dengan aman.',
                variant: 'info',
            })
        );
    }
}