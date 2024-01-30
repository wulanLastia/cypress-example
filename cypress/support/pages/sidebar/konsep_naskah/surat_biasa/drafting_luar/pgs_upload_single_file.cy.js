import upload_single from "../../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_luar/upload_single_file"

export class UploadSingleFilePage {

    goToUploadSingleFileSuratBiasa() {
        // Find Document Type
        const list_listJenisNaskahSuratBiasa = cy.get(upload_single.list_listJenisNaskahSuratBiasa).as('list_listJenisNaskahSuratBiasa')
        list_listJenisNaskahSuratBiasa.find('div')
            .contains('Surat Biasa')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleSuratBiasa = cy.get(upload_single.list_naskahTitleSuratBiasa).as('list_naskahTitleSuratBiasa')
        list_naskahTitleSuratBiasa.should('contain', 'Surat Biasa')
            .and('be.visible')

        const btn_draftSuratBiasa = cy.get(upload_single.btn_draftSuratBiasa).as('btn_draftSuratBiasa')
        btn_draftSuratBiasa.should('contain', 'Buat Draft')
            .and('be.visible')

        const btn_uploadFileSuratBiasa = cy.get(upload_single.btn_uploadFileSuratBiasa).as('btn_uploadFileSuratBiasa')
        btn_uploadFileSuratBiasa.should('contain', 'Upload')
            .and('be.visible')

        const btn_templateSuratBiasa = cy.get(upload_single.btn_templateSuratBiasa).as('btn_templateSuratBiasa')
        btn_templateSuratBiasa.should('contain', 'Template')
            .and('be.visible')

        // Access Upload Single File
        btn_uploadFileSuratBiasa.click()
    }

    checkDetailJenisNaskah() {
        const label_headerDocumentType = cy.get(upload_single.label_headerDocumentType).as('label_headerDocumentType')
        label_headerDocumentType.should('contain', 'Surat biasa')
    }

    checkDetailButtonKirim() {
        const btn_headerButtonSubmit = cy.get(upload_single.btn_headerButtonSubmit).as('btn_headerButtonSubmit')
        btn_headerButtonSubmit.should('contain', 'Kirim')
            .and('be.visible')
    }

    checkTabRegistrasi() {
        const btn_tabDocumentRegistration = cy.get(upload_single.btn_tabDocumentRegistration).as('btn_tabDocumentRegistration')
        btn_tabDocumentRegistration.should('be.visible')
    }

    batalDrafting() {
        const btn_headerButtonBack = cy.get(upload_single.btn_headerButtonBack).as('btn_headerButtonBack')
        btn_headerButtonBack.should('be.visible')
            .click()
    }
}