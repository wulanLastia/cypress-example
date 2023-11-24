import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import nota_dinas from "../../../../selectors/sidebar/konsep_naskah/nota_dinas/drafting_nota_dinas"
import { MenuPage } from "../../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingNotaDinasPage {

    goToKonsepNaskahNotaDinas() {
        menuPage.goToKonsepNaskah()

        const notaDinas = cy.get(nota_dinas.notaDinas).as('notaDinas')
        notaDinas.should('be.visible')
            .click({ force: true })
    }

    clickbtnKembali() {
        const btnKembali = cy.get(nota_dinas.btnKembali).as('btnKembali')
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
        this.goToKonsepNaskahSuratBiasa()

        const btnKembali = cy.get(nota_dinas.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleMenu = cy.get(nota_dinas.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const selectedKonsep = cy.get(nota_dinas.selectedKonsep).as('selectedKonsep')
        selectedKonsep.should('have.value', '/konsep-naskah/nota-dinas')

        const btnKirimNaskah = cy.get(nota_dinas.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim Naskah')

        this.checkPreviewNaskah()
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
        const previewKop = cy.get(nota_dinas.previewKop, { timeout: 10000 }).as('previewKop')
        previewKop.click(180, 60)

        const titleKop = cy.get(nota_dinas.titleKop, { timeout: 10000 }).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
    }

    aksesFormKepalaSurat() {
        const findKepalaSurat = cy.get(nota_dinas.previewKepala).as('findKepalaSurat')
        findKepalaSurat.scrollTo('top', {ensureScrollable: false})
        cy.wait(3000)

        const previewKepala = cy.get(nota_dinas.previewKepala).as('previewKepala')
        previewKepala.click(180, 240, { force: true })

        const titleKepala = cy.get(nota_dinas.titleKepala).as('titleKepala')
        titleKepala.should('contain', 'Kepala Surat')
    }

    aksesBadanNaskah() {
        const previewBadan = cy.xpath(nota_dinas.previewBadan).as('previewBadan')
        previewBadan.click(180, 360)

        const titleBadan = cy.get(nota_dinas.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    aksesKakiSurat() {
        const previewKaki = cy.xpath(nota_dinas.previewKaki).as('previewKaki')
        previewKaki.click(180, 560)

        const titleKaki = cy.xpath(nota_dinas.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    aksesLampiranSurat() {
        const titleLampiran = cy.xpath(nota_dinas.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Klik tombol berikut untuk menambah lampiran')
    }

    validateFormDefault() {
        const editFormDefault = cy.get(nota_dinas.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')
    }

    inputKakiSurat() {
        const previewKaki = cy.xpath(nota_dinas.previewKaki).as('previewKaki')
        previewKaki.click(180, 600)

        const titleKaki = cy.xpath(nota_dinas.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    kirimNaskah() {
        // Intercept all POST network requests
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        
        const btnKirimNaskah = cy.get(nota_dinas.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()
    
        const konfirmasiKirimNaskah = cy.get(nota_dinas.konfirmasiKirimNaskah).as('konfirmasiKirimNaskah')
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
        const successKirimNaskah = cy.get(nota_dinas.popupSuccessKirimNaskah, { timeout: 500 }).as('successKirimNaskah')
        successKirimNaskah.should('be.visible')
        
        successKirimNaskah.should('exist')
            .find(nota_dinas.popupTitleSuccessKirimNaskah)
            .should('contain', 'Naskah berhasil dikirim ke pihak selanjutnya')
    }
    

    negativeKirimNaskah() {
        const btnKirimNaskah = cy.get(nota_dinas.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('be.visible')
        .should('be.disabled')
    }

    inputLampiranSuratNotaDinas() {
        const findLampiranPage = cy.get(konsep_naskah.previewLampiran).first().as('findLampiranPage');
        findLampiranPage.scrollIntoView();
    
        const previewLampiran1NotaDinas = cy.get(konsep_naskah.previewLampiranNotaDinas).first().as('previewLampiran1NotaDinas');
        previewLampiran1NotaDinas.scrollIntoView()
        .click({ force: true });
        cy.wait(3000);
    
        const titleLampiran = cy.get(konsep_naskah.titleLampiran).as('titleLampiran');
        titleLampiran.should('contain', 'Lampiran');
    }
    
    inputLampiran2SuratNotaDinas() {
        cy.wait(3000);
    
        const findLampiranPage = cy.get(konsep_naskah.previewLampiran).last().as('findLampiranPage');
        findLampiranPage.scrollIntoView();
    
        const previewLampiran2NotaDinas = cy.get(konsep_naskah.previewLampiranNotaDinas).last().as('previewLampiran2NotaDinas');
        previewLampiran2NotaDinas.scrollIntoView()
        .click({ force: true });
        cy.wait(3000);
    
        const titleLampiran = cy.get(konsep_naskah.titleLampiran).as('titleLampiran');
        titleLampiran.should('contain', 'Lampiran');
    }
    
    scrollPreviewPage() {
        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo('top')
    }

    clickSimpanSurat() {
        cy.wait(3000)

        const buttonSimpanSurat = cy.get(konsep_naskah.btnSimpanSuratNotaDinas).as('buttonSimpanSurat')
        buttonSimpanSurat.should('contain', 'Simpan')
            .click({ force: true })
    }


}