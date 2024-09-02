import perbaiki from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/perbaiki"
import tab_registrasi from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/tab_registrasi"
import upload_single from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/upload_single_file"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class PerbaikiPage {

    checkPoinPerbaikan() {
        cy.readFile(getPreviewData).then((object) => {
            // Assertion Poin Perbaikan
            const poinPerbaikanValue = object.perbaikan[0].poin_perbaikan

            const label_notePerbaikanTitle = cy.get(perbaiki.label_notePerbaikanTitle).as('label_notePerbaikanTitle')
            label_notePerbaikanTitle.should('contain', 'Poin Perbaikan')

            const label_notePerbaikanDescription = cy.get(perbaiki.label_notePerbaikanDescription).as('label_notePerbaikanDescription')
            label_notePerbaikanDescription.should('contain', poinPerbaikanValue)
        })
    }

    checkDataPemeriksa() {
        cy.readFile(getPreviewData).then((object) => {
            // Assertion Nama dan Jabatan Pemeriksa
            const pemeriksaNameValue = object.perbaikan[1].pemeriksa_name
            const pemeriksaPositionValue = object.perbaikan[2].pemeriksa_position

            const label_pemeriksaName = cy.get(perbaiki.label_pemeriksaName).as('label_pemeriksaName')
            label_pemeriksaName.contains(pemeriksaNameValue, { matchCase: false })

            const label_pemeriksaPosition = cy.get(perbaiki.label_pemeriksaPosition).as('label_pemeriksaPosition')
            label_pemeriksaPosition.contains(pemeriksaPositionValue, { matchCase: false })
        })
    }

    // Asumsi user menceklis semua checkbox poin perbaikan surat
    checkInputPerbaikanPerihal() {
        // Assertion perbaikan perihal
        const cb_inputPerihal = cy.get(perbaiki.cb_inputPerihal).as('cb_inputPerihal')
        cb_inputPerihal.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputPerihal = cy.get(perbaiki.label_inputPerihal).as('label_inputPerihal')
        label_inputPerihal.should('contain', 'Perihal')    
    }

    checkInputPerbaikanIsiNaskah() {
        // Assertion perbaikan isi naskah
        const cb_inputIsiNaskah = cy.get(perbaiki.cb_inputIsiNaskah).as('cb_inputIsiNaskah')
        cb_inputIsiNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputIsiNaskah = cy.get(perbaiki.label_inputIsiNaskah).as('label_inputIsiNaskah')
        label_inputIsiNaskah.should('contain', 'Isi naskah')    
    }

    checkInputPerbaikanLampiran() {
        // Assertion perbaikan lampiran
        const cb_inputLampiran = cy.get(perbaiki.cb_inputLampiran).as('cb_inputLampiran')
        cb_inputLampiran.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputLampiran = cy.get(perbaiki.label_inputLampiran).as('label_inputLampiran')
        label_inputLampiran.should('contain', 'Lampiran')    
    }

    checkInputPerbaikanTujuan() {
        // Assertion perbaikan tujuan naskah
        const cb_inputTujuanNaskah = cy.get(perbaiki.cb_inputTujuanNaskah).as('cb_inputTujuanNaskah')
        cb_inputTujuanNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputTujuanNaskah = cy.get(perbaiki.label_inputTujuanNaskah).as('label_inputTujuanNaskah')
        label_inputTujuanNaskah.should('contain', 'Tujuan naskah')    
    }

    checkInputPerbaikanAlamatNaskah() {
        // Assertion perbaikan alamat naskah
        const cb_inputAlamatNaskah = cy.get(perbaiki.cb_inputAlamatNaskah).as('cb_inputAlamatNaskah')
        cb_inputAlamatNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputAlamatNaskah = cy.get(perbaiki.label_inputAlamatNaskah).as('label_inputAlamatNaskah')
        label_inputAlamatNaskah.should('contain', 'Alamat naskah')   
    }

    checkInputPerbaikanTembusan() {
        // Assertion perbaikan tembusan
        const cb_inputTembusan = cy.get(perbaiki.cb_inputTembusan).as('cb_inputTembusan')
        cb_inputTembusan.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputTembusan = cy.get(perbaiki.label_inputTembusan).as('label_inputTembusan')
        label_inputTembusan.should('contain', 'Tembusan')   
    }

    checkInputPerbaikanUrgensi() {
        // Assertion perbaikan urgensi
        const cb_inputUrgensiNaskah = cy.get(perbaiki.cb_inputUrgensiNaskah).as('cb_inputUrgensiNaskah')
        cb_inputUrgensiNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputUrgensiNaskah = cy.get(perbaiki.label_inputUrgensiNaskah).as('label_inputUrgensiNaskah')
        label_inputUrgensiNaskah.should('contain', 'Urgensi naskah')   
    }

    checkInputPerbaikanSifatNaskah() {
        // Assertion perbaikan sifat naskah
        const cb_inputSifatNaskah = cy.get(perbaiki.cb_inputSifatNaskah).as('cb_inputSifatNaskah')
        cb_inputSifatNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputSifatNaskah = cy.get(perbaiki.label_inputSifatNaskah).as('label_inputSifatNaskah')
        label_inputSifatNaskah.should('contain', 'Sifat naskah')   
    }

    checkInputPerbaikanKodeKlasifikasi() {
        // Assertion perbaikan kode klasifikasi
        const cb_inputKodeKlasifikasi = cy.get(perbaiki.cb_inputKodeKlasifikasi).as('cb_inputKodeKlasifikasi')
        cb_inputKodeKlasifikasi.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputKodeKlasifikasi = cy.get(perbaiki.label_inputKodeKlasifikasi).as('label_inputKodeKlasifikasi')
        label_inputKodeKlasifikasi.should('contain', 'Kode klasifikasi')   
    }

    aksesTabDaftarFile() {
        // Click button perbaiki
        const btn_perbaikiNavbar = cy.get(perbaiki.btn_perbaikiNavbar).as('btn_perbaikiNavbar')
        btn_perbaikiNavbar.should('contain', 'Perbaiki')  
            .click()
        
        // Assert tab daftar file
        const tab_daftar_file = cy.get(perbaiki.tab_daftar_file).as('tab_daftar_file')
        tab_daftar_file.click()
            .should('have.class', 'tabs__menu active')  

        cy.readFile(getPreviewData).then((object) => {
            // Assertion file upload
            const upload_file_name = object.upload_file[1].upload_file_name

            const label_fileUploadTitle = cy.get(tab_registrasi.label_fileTitle).as('label_fileUploadTitle')
            label_fileUploadTitle.scrollIntoView()
                .should('contain', upload_file_name)

            const label_fileUploadSize = cy.get(tab_registrasi.label_fileSize).as('label_fileUploadSize')
            label_fileUploadSize.should('contain', '18.3 KB')

            const btn_deleteSuratPengantar = cy.get(tab_registrasi.btn_deleteSuratPengantar).as('btn_deleteSuratPengantar')
            btn_deleteSuratPengantar.should('be.visible')

            cy.wait(6000)
        })
    }

    checkUpdatePerbaikanFile(inputStatus) {
        if(inputStatus == 'positif') {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/Dummy2.pdf'
            const fileName = 'Dummy2.pdf'

            const btn_inputNaskahButtonUploadFile = cy.get(upload_single.btn_inputNaskahButtonUploadFile).as('btn_inputNaskahButtonUploadFile')
            btn_inputNaskahButtonUploadFile.attachFile(fileUploadSingleFile)

            // Begin Save Assertion Data
            cy.readFile(getPreviewData).then((object) => {
                if (!object.upload_file) {
                    object.upload_file = [];
                }

                // Check if there's already a perihal
                let fileNameExist = object.identitas_surat.some(item => 'upload_file_name' in item);

                if (fileNameExist) {
                    // Update existing perihal
                    object.upload_file.find(item => 'upload_file_name' in item).upload_file_name = fileName;
                } else {
                    // Construct the sub-object
                    const upload_file_name = {
                        upload_file_name: fileName
                    }

                    // Push the sub-object to the array
                    object.upload_file.push(upload_file_name)
                }

                // // Write data to the JSON file
                cy.writeFile(getPreviewData, object)
            })

            // Assertion
            const label_fileUploadTitle = cy.get(upload_single.label_fileUploadTitle).as('label_fileUploadTitle')
            label_fileUploadTitle.should('contain', fileName)
        } else {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/image_example.jpg'

            const btn_inputNaskahButtonUploadFile = cy.get(upload_single.btn_inputNaskahButtonUploadFile).as('btn_inputNaskahButtonUploadFile')
            btn_inputNaskahButtonUploadFile.attachFile(fileUploadSingleFile)

            // Assertion file upload
            const label_fileNotSupport = cy.get(upload_single.label_fileNotSupport).as('label_fileNotSupport')
            label_fileNotSupport.should('be.visible')
        }

        cy.wait(3000)
    }

    checkDeletePerbaikanFileUpload() {
        // Click button delete file
        const btn_deleteFile = cy.get(upload_single.btn_deleteFile).as('btn_deleteFile')
        btn_deleteFile.should('be.visible')
            .click()

        // Assertion
        const dialog_backPanel = cy.get(upload_single.dialog_backPanel).as('dialog_backPanel')
        dialog_backPanel.should('be.visible')

        const dialog_backTitle = cy.get(upload_single.dialog_backTitle).as('dialog_backTitle')
        dialog_backTitle.should('contain', 'Hapus Draft')

        const dialog_backDesc = cy.get(upload_single.dialog_backDesc).as('dialog_backDesc')
        dialog_backDesc.find('p')
            .should('contain', 'Dummy2.pdf')
    }

    batalDeletePerbaikanFileUpload() {
        // Assertion
        const dialog_backPanel = cy.get(upload_single.dialog_backPanel).as('dialog_backPanel')
        dialog_backPanel.should('be.visible')

        const dialog_backTitle = cy.get(upload_single.dialog_backTitle).as('dialog_backTitle')
        dialog_backTitle.should('contain', 'Hapus Draft')

        const dialog_backDesc = cy.get(upload_single.dialog_backDesc).as('dialog_backDesc')
        dialog_backDesc.find('p')
            .should('contain', 'Apakah anda ingin menghapus file')

        const dialog_backConfirm = cy.get(upload_single.dialog_backConfirm).first().as('dialog_backConfirm')
        dialog_backConfirm.find('div')
            .find('span')
            .should('contain', 'Ya, hapus file')

        const dialog_backCancel = cy.get(upload_single.dialog_backCancel).first().as('dialog_backCancel')
        dialog_backCancel.should('contain', 'Tidak')
            .and('be.visible')
            .click()
    }

    checkBtnPerbaiki() {
        // Click button perbaiki
        const btn_perbaikiNavbar = cy.get(perbaiki.btn_perbaikiNavbar).as('btn_perbaikiNavbar')
        btn_perbaikiNavbar.should('contain', 'Perbaiki')  
            .click()
        
        // Assert tab daftar file
        const tab_daftar_file = cy.get(perbaiki.tab_daftar_file).as('tab_daftar_file')
        tab_daftar_file.click()
            .should('have.class', 'tabs__menu active')  
    }

    checkBtnKembali() {
        // Click button perbaiki
        const btn_kembaliNavbar = cy.get(perbaiki.btn_kembaliNavbar).as('btn_kembaliNavbar')
        btn_kembaliNavbar.should('be.visible')  
            .click()
        
        // Assert tab histori
        const tab_histori = cy.get(perbaiki.tab_histori).as('tab_histori')
        tab_histori.should('have.class', 'tabs__menu')
            .and('be.visible')  
    }

    aksesTabRegistrasi() {
        // Click tab registrasi
        const tab_registration = cy.get(perbaiki.tab_registration).as('tab_registration')
        tab_registration.should('be.visible')
            .click()

        // Assertion 
        const input_perihal = cy.get(tab_registrasi.input_perihal).as('input_perihal')
        input_perihal.should('be.enabled')
    }

    inputPerbaikanPerihal(inputPerihal, assertionPerihal) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.identitas_surat) {
                object.identitas_surat = []; // Initialize as an empty array
            }

            // Assert perihal title
            const label_perihal = cy.get(tab_registrasi.label_perihal).as('label_perihal')
            label_perihal.should('contain', 'Perihal')

            // Input perihal
            const input_perihal = cy.get(tab_registrasi.input_perihal).as('input_perihal')
            input_perihal.type(inputPerihal)

            // Input update perihal into json data
            const assert_perihal = cy.get(tab_registrasi.input_perihal).as('assert_perihal')
            assert_perihal.invoke('val')
                .then((val) => {
                    // Check if there's already a perihal
                    let perihalExist = object.identitas_surat.some(item => 'perihal' in item);

                    if (perihalExist) {
                        // Update existing perihal
                        object.identitas_surat.find(item => 'perihal' in item).perihal = val.trim();
                    } else {
                        // Construct the sub-object
                        const perihal_name = {
                            perihal: val.trim()
                        }

                        // Push the sub-object to the array
                        object.identitas_surat.push(perihal_name)
                    }

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    inputPerbaikanUrgensi(inputanUrgensi, index) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.identitas_surat) {
                object.identitas_surat = []; // Initialize as an empty array
            }

            // Label
            const label_urgensi = cy.get(tab_registrasi.label_urgensi).as('label_urgensi')
            label_urgensi.should('contain', 'Urgensi')

            // Input Urgensi
            const select_urgensi = cy.get(tab_registrasi.select_urgensi).last().as('select_urgensi')
            select_urgensi.click()

            const select_urgensiOption = cy.get(tab_registrasi.select_urgensiOption + index + '"').as('select_urgensiOption')
            select_urgensiOption.click()
                .invoke('text')
                .then((val) => {
                    // Check if there's already a urgensi
                    let urgensiExist = object.identitas_surat.some(item => 'urgensi' in item);

                    if (urgensiExist) {
                        // Update existing urgensi
                        object.identitas_surat.find(item => 'urgensi' in item).urgensi = val.trim();
                    } else {
                        // Construct the sub-object
                        const urgensi_name = {
                            urgensi: val.trim()
                        }

                        // Push the sub-object to the array
                        object.identitas_surat.push(urgensi_name)
                    }

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })

        // Assertion warna
        if (inputanUrgensi === 'Amat Segera') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#FFEBEE]')
        } else if (inputanUrgensi === 'Biasa') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#E6F6EC]')
        } else if (inputanUrgensi === 'Penting') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#E3F2FD]')
        } else {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#FFF9E1]')
        }
    }

    inputPerbaikanSifat(indexSurat) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.identitas_surat) {
                object.identitas_surat = []; // Initialize as an empty array
            }

            // Label
            const label_sifatSurat = cy.get(tab_registrasi.label_sifatSurat).as('label_sifatSurat')
            label_sifatSurat.should('contain', 'Sifat Surat')

            // Input Sifat
            const select_sifatSurat = cy.get(tab_registrasi.select_sifatSurat).first().as('select_sifatSurat')
            select_sifatSurat.click()

            const select_sifatSuratOption = cy.get(tab_registrasi.select_sifatSuratOption + indexSurat + '"').as('select_sifatSuratOption')
            select_sifatSuratOption.click()
                .invoke('text')
                .then((val) => {
                    // Check if there's already a sifat
                    let sifatExist = object.identitas_surat.some(item => 'sifat' in item);

                    if (sifatExist) {
                        // Update existing sifat
                        object.identitas_surat.find(item => 'sifat' in item).sifat = val.trim();
                    } else {
                        // Construct the sub-object
                        const sifat_name = {
                            sifat: val.trim()
                        }

                        // Push the sub-object to the array
                        object.identitas_surat.push(sifat_name)
                    }

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    uploadPerbaikanSuratPengantar(status) {
        if (status === 'positif') {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/Dummy.pdf'
            const fileName = 'Dummy.pdf'

            const btn_inputSuratPengantar = cy.get(tab_registrasi.btn_inputSuratPengantar).as('btn_inputSuratPengantar')
            btn_inputSuratPengantar.attachFile(fileUploadSingleFile)

            // Assertion file name
            const label_fileTitle = cy.get(tab_registrasi.label_fileTitle).as('label_fileTitle')
            label_fileTitle.should('contain', fileName)
        } else {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/image_example.jpg'
            const fileName = 'image_example.jpg'

            const btn_inputSuratPengantar = cy.get(tab_registrasi.btn_inputSuratPengantar).as('btn_inputSuratPengantar')
            btn_inputSuratPengantar.attachFile(fileUploadSingleFile)

            // Assertion file name
            const label_fileNotSupport = cy.get(tab_registrasi.label_fileNotSupport).as('label_fileNotSupport')
            label_fileNotSupport.should('contain', fileName)
                .and('have.class', 'filename text-[#C62828]')
        }
    }
}