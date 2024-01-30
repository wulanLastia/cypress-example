import upload_single from "../../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_luar/upload_single_file"

export class UploadSingleFilePage {

    checkDetailJenisNaskah() {
        const label_headerDocumentType = cy.get(upload_single.label_headerDocumentType).as('label_headerDocumentType')
        label_headerDocumentType.should('contain', 'Surat biasa')
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