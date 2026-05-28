trigger SmartContractTrigger on Smart_Contract__c (before insert, before update) {
    try {
        for (Smart_Contract__c contract : Trigger.new) {
            // Rule 5.1 & 5.2: Jika nilai kontrak di atas 1.000.000, wajib lolos Compliance otomatis
            if (contract.Contract_Value__c != null && contract.Contract_Value__c > 1000000) {
                contract.Compliance_Checked__c = true;
                contract.Compliance_Notes__c = 'Sistem Otomatis: Kontrak bernilai besar ini telah melewati pemeriksaan kepatuhan standar kelompok aman.';
            } else {
                // Jika di bawah 1.000.000, biarkan default tidak tercentang otomatis
                contract.Compliance_Checked__c = false;
                contract.Compliance_Notes__c = 'Sistem Otomatis: Kontrak bernilai standar. Tidak memerlukan pemeriksaan kepatuhan tingkat tinggi.';
            }
        }
    } catch (Exception e) {
        // Rule 5.3: Implementasi Error Handling jika terjadi kegagalan sistem data
        for (Smart_Contract__c contract : Trigger.new) {
            contract.addError('Gagal memproses otomatisasi kepatuhan kontrak: ' + e.getMessage());
        }
    }
}