import tandatangani from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/tandatangani"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class TandatanganiPage {

    tandatanganiNaskah() {
        const btn_tandatanganiNaskah = cy.get(tandatangani.btn_tandatanganiNaskah).as('btn_tandatanganiNaskah')
        btn_tandatanganiNaskah.should('contain', 'TTE Naskah')
            .click()
    }

    checkInputDataRegistrasi() {
        // Check Popup
        const dialog_konfirmasiTandatangani = cy.get(tandatangani.dialog_konfirmasiTandatangani).as('dialog_konfirmasiTandatangani')
        dialog_konfirmasiTandatangani.should('be.visible')

        const label_tandatanganiNaskah = cy.get(tandatangani.label_tandatanganiNaskah).as('label_tandatanganiNaskah')
        label_tandatanganiNaskah.should('contain', 'Kirim Naskah')

        const label_tandatanganiInfoTitle = cy.get(tandatangani.label_tandatanganiInfoTitle).as('label_tandatanganiInfoTitle')
        label_tandatanganiInfoTitle.should('contain', 'Pastikan kembali naskah Anda sudah benar')

        const label_tandatanganiInfoDesc = cy.get(tandatangani.label_tandatanganiInfoDesc).as('label_tandatanganiInfoDesc')
        label_tandatanganiInfoDesc.should('contain', 'Pastikan nomor urut naskah sesuai dengan file-file yang anda upload')

        // Check Data
        cy.readFile(getPreviewData).then((object) => {
            // Assert Jenis Naskah
            const jenis_naskah = object.upload_file[0].jenis_naskah

            const label_dataJenisNaskah = cy.get(tandatangani.label_dataJenisNaskah).as('label_dataJenisNaskah')
            label_dataJenisNaskah.should('contain', jenis_naskah)

            // Assert Urgensi
            const urgensi = object.identitas_surat[1].urgensi

            const label_dataUrgensi = cy.get(tandatangani.label_dataUrgensi).as('label_dataUrgensi')
            label_dataUrgensi.should('contain', urgensi)

            // Assert Perihal
            const perihal = object.identitas_surat[0].perihal

            const label_dataPerihal = cy.get(tandatangani.label_dataPerihal).as('label_dataPerihal')
            label_dataPerihal.should('contain', perihal)

            // Assert Nomor Naskah
            const nomor_urut = object.bank_nomor[1].nomor_urut

            const label_dataNomorUrut = cy.get(tandatangani.label_dataNomorUrut).as('label_dataNomorUrut')
            label_dataNomorUrut.should('contain', nomor_urut)

            // Assert Nama File
            const upload_file_name = object.upload_file[1].upload_file_name

            const label_dataFileName = cy.get(tandatangani.label_dataFileName).as('label_dataFileName')
            label_dataFileName.should('contain', upload_file_name)

            // Assert Penandatangan
            const label_penandatangan = cy.get(tandatangani.label_penandatangan).as('label_penandatangan')
            label_penandatangan.should('contain', 'Penandatangan')

            const penandatangan_diri_sendiri = object.penandatangan[0].penandatangan_diri_sendiri

            const label_dataNamaPenandatangan = cy.get(tandatangani.label_dataNamaPenandatangan).as('label_dataNamaPenandatangan')
            label_dataNamaPenandatangan.contains(penandatangan_diri_sendiri, { matchCase: false })

            // Assert Penerima
            const label_penerima = cy.get(tandatangani.label_penerima).as('label_penerima')
            label_penerima.should('contain', 'Penerima')

            const tujuan_surat1 = object.tujuan_surat[0].tujuan_internal
            let arrPenerima = tujuan_surat1.split('(')

            const label_dataNamaPenerima = cy.get(tandatangani.label_dataNamaPenerima).as('label_dataNamaPenerima')
            label_dataNamaPenerima.contains(arrPenerima[0], { matchCase: false })

            const label_dataJabatanPenerima = cy.get(tandatangani.label_dataJabatanPenerima).as('label_dataJabatanPenerima')
            label_dataJabatanPenerima.contains(arrPenerima[1].replace(')', ''), { matchCase: false })
        })
    }

    tteNaskah() {
        const btn_tteNaskah = cy.get(tandatangani.btn_tteNaskah).as('btn_tteNaskah')
        btn_tteNaskah.should('contain', 'TTE Naskah')
            .click()

        // Assertion 
        const dialog_panelTte = cy.get(tandatangani.dialog_panelTte).as('dialog_panelTte')
        dialog_panelTte.should('be.visible')

        const dialog_panelTteTitle = cy.get(tandatangani.dialog_panelTteTitle).as('dialog_panelTteTitle')
        dialog_panelTteTitle.should('contain', 'TTE Naskah')
            .and('be.visible')

        const dialog_panelTteDesc = cy.get(tandatangani.dialog_panelTteDesc).as('dialog_panelTteDesc')
        dialog_panelTteDesc.contains('Pastikan anda sudah membaca draft naskah dan yakin isi naskah sudah benar sebelum TTE')
            .and('be.visible')

        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.should('be.visible')

        const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
        btn_tteConfirm.should('contain', 'TTE Naskah')
            .and('be.visible')

        const btn_tteCancel = cy.get(tandatangani.btn_tteCancel).as('btn_tteCancel')
        btn_tteCancel.should('contain', 'Periksa Kembali')
            .and('be.visible')
    }

    confirmTteNaskah(status) {
        if (status === 'negatif') {
            // Assert button disable
            const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
            btn_tteConfirm.should('contain', 'TTE Naskah')
                .and('be.disabled')
        } else {
            const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
            btn_tteConfirm.should('contain', 'TTE Naskah')
                .and('be.visible')
                .click()
        }
    }

    checkInputPassphrase() {
        // Assert inputan passphrase
        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.should('be.visible')

        const dialog_panelIconHideShow = cy.xpath(tandatangani.dialog_panelIconHideShow).as('dialog_panelIconHideShow')
        dialog_panelIconHideShow.find('svg')
            .should('have.class', 'iconify iconify--material-symbols')
    }

    clickBtnPeriksaKembali() {
        // Click button periksa 
        const btn_tteCancel = cy.get(tandatangani.btn_tteCancel).as('btn_tteCancel')
        btn_tteCancel.should('contain', 'Periksa Kembali')
            .and('be.visible')
            .click()

        // Assertion
        const label_headerDocumentType = cy.get(tandatangani.label_headerDocumentType).as('label_headerDocumentType')
        label_headerDocumentType.should('contain', 'Konsep Naskah')
    }

    submitTteNaskah(passphrase) {
        // Input passphrase
        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.type(passphrase)
            .wait(1000)

        // Click button tte naskah
        this.confirmTteNaskah('positif')

        // @TODO: Assert popup konfirmasi menunggu konfirmasi data-cy
    }
}