import konsep_naskah from "@selectors/sidebar/konsep_naskah/konsep_naskah"
import surat_perintah from "@selectors/sidebar/konsep_naskah/surat_perintah/drafting_surat_perintah"
import { MenuPage } from "../../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingSuratPerintahPage {

    gotoKonsepNaskahSuratPerintah() {
        menuPage.goToKonsepNaskah()

        cy.wait(3000)

        const buttonSuratPerintah = cy.get(surat_perintah.btnSuratPerintah).as('buttonSuratPerintah')
        buttonSuratPerintah.should('be.visible').and('contain', 'Surat Perintah')
            .click()
            .wait(3000)

        this.checkDetail()
    }

    clickbtnKembali() {
        const btnKembali = cy.get(surat_perintah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()
    }

    checkPreviewNaskah() {
        this.aksesFormKopSurat()
        cy.wait(2000)

        this.aksesFormKepalaSurat()
        cy.wait(2000)

        this.aksesBadanNaskah()
        cy.wait(2000)

        this.aksesKakiSurat()
        cy.wait(2000)

        this.aksesLampiranSurat()
        cy.wait(2000)
    }

    checkDetail() {
        cy.wait(2000)

        const btnKembali = cy.get(surat_perintah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleMenu = cy.get(surat_perintah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const selectedKonsep = cy.get(surat_perintah.selectedKonsep).as('selectedKonsep')
        selectedKonsep.should('have.value', '/konsep-naskah/surat-perintah')

        // const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        // btnKirimNaskah.should('contain', 'Kirim Naskah') // Masih dalam tahap development

        // this.checkPreviewNaskah() // Beberapa fungsi masih dalam tahap development
    }

    batalDrafting() {
        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.xpath(konsep_naskah.btnBatalDrafting).as('btnBatalDrafting')
        btnBatalDrafting.should('contain', 'Ya, batalkan')
            .and('be.visible')
            .click()

        const titleKonsepNaskah2 = cy.get(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah2.should('contain', 'Buat Naskah Baru')
            .and('be.visible')
    }

    lanjutkanDrafting() {
        this.goToKonsepNaskahSuratBiasa()

        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnLanjutkanDrafting = cy.xpath(konsep_naskah.btnLanjutkanDrafting).as('btnLanjutkanDrafting')
        btnLanjutkanDrafting.should('contain', 'Tidak')
            .and('be.visible')
            .click()

        const titleMenu = cy.get(konsep_naskah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

    aksesFormKopSurat() {
        const previewKop = cy.get(surat_perintah.previewKop).first().as('previewKop')
        previewKop.click(180, 60)

        cy.wait(5000)

        const titleKop = cy.get(surat_perintah.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
    }

    aksesFormKepalaSurat() {
        const findKepalaSurat = cy.get(surat_perintah.previewKepala).as('findKepalaSurat')
        findKepalaSurat.scrollTo('top', {ensureScrollable: false})
        cy.wait(3000)

        const previewKepala = cy.get(surat_perintah.previewKepala).as('previewKepala')
        previewKepala.click(180, 240, { force: true })

        const titleKepala = cy.get(surat_perintah.titleKepala).as('titleKepala')
        titleKepala.should('contain', 'SURAT PERINTAH')
    }

    aksesBadanNaskah() {
        const previewBadan = cy.get(surat_perintah.previewBadan).as('previewBadan')
        previewBadan.scrollIntoView({ensureScrollable: false})
        previewBadan.click(180, 360, { force: true })

        const titleBadan = cy.get(surat_perintah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Surat')
    }

    aksesKakiSurat() {
        const previewKaki = cy.get(surat_perintah.previewKaki).as('previewKaki')
        previewKaki.scrollIntoView({ensureScrollable: false})
        .click(180, 560, { force: true })

        cy.wait(1500)

        const titleKaki = cy.get(surat_perintah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    aksesLampiranSurat() {
        const titleLampiran = cy.xpath(surat_perintah.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Klik tombol berikut untuk menambah lampiran')
    }

    validateFormDefault() {
        const editFormDefault = cy.get(surat_perintah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Sorot dan klik bagian ini untuk menampilkan teks editor')
            .and('be.visible')
    }

    inputKakiSurat() {
        const previewKaki = cy.xpath(surat_perintah.previewKaki).as('previewKaki')
        previewKaki.click(180, 600)

        const titleKaki = cy.xpath(surat_perintah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    simpanNaskah() {
        const btnSimpanNaskah = cy.get(surat_perintah.btnSimpanNaskah).as('btnSimpanNaskah')
        btnSimpanNaskah.click()
    }

    kirimNaskah() {
        // Intercept all POST network requests
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        
        const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()
    
        const konfirmasiKirimNaskah = cy.get(surat_perintah.konfirmasiKirimNaskah).as('konfirmasiKirimNaskah')
        konfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    
        // Wait and assert that the response status is 200
        cy.wait('@postRequest', { timeout: 5000 }).then((interception) => {
            if (interception.response) {
                const status = interception.response.statusCode;
                const clientErrorStatusCodes = [400, 401, 403, 404, 405, 406, 408, 409, 410, 411, 412];
                const serverErrorStatusCodes = [500, 501, 502, 503, 504];
                const errorStatusCodes = [...clientErrorStatusCodes, ...serverErrorStatusCodes];
        
                // Assert for error status codes
                if (errorStatusCodes.includes(status)) {
                    expect(errorStatusCodes, `Request failed with status code: ${status}`).to.include(status);
                }
        
                const successStatusCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
                const redirectStatusCodes = [300, 301, 302, 303, 307];
                const acceptableStatusCodes = [...successStatusCodes, ...redirectStatusCodes];
        
                // Assert for success and redirect status codes
                expect(acceptableStatusCodes, `Result of status code: ${status}`).to.include(status);
            } else {
                // Log and throw error if no response is received
                cy.log('No response received.');
                throw new Error('No response received.');
            }
        })
        
        
        // Wait for up for the success dialog to appear only 0.5 seconds
        const successKirimNaskah = cy.get(surat_perintah.popupSuccessKirimNaskah, { timeout: 500 }).as('successKirimNaskah')
        successKirimNaskah.should('be.visible')
        
        successKirimNaskah.should('exist')
            .find(surat_perintah.popupTitleSuccessKirimNaskah)
            .should('contain', 'Naskah berhasil dikirim ke pihak selanjutnya')
    }

    kirimNaskahPROD() {
        const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()
    
        const konfirmasiKirimNaskah = cy.get(surat_perintah.konfirmasiKirimNaskah).as('konfirmasiKirimNaskah')
        konfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    
        
        // Wait for up for the success dialog to appear only 0.5 seconds
        const successKirimNaskah = cy.get(surat_perintah.popupSuccessKirimNaskah, { timeout: 500 }).as('successKirimNaskah')
        successKirimNaskah.should('be.visible')
        
        successKirimNaskah.should('exist')
            .find(surat_perintah.popupTitleSuccessKirimNaskah)
            .should('contain', 'Naskah berhasil dikirim ke pihak selanjutnya')
    }


    negativeKirimNaskah() {
        const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('be.visible')
        .should('be.disabled')
    }
    
    scrollPreviewPage() {
        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo('top')
    }

}