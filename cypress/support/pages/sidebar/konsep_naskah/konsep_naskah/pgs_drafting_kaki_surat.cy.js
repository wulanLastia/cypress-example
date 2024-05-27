import kaki_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kaki_surat"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingKakiSuratPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingKakiSurat() {
        draftingKonsepNaskahPage.aksesKakiSurat()
    }

    inputKakiSurat() {
        draftingKonsepNaskahPage.inputKakiSurat()
    }

    checkDetail() {
        const titleKaki = cy.get(kaki_surat.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')

        const labelPenandatangan = cy.get(kaki_surat.labelPenandatangan).as('labelPenandatangan')
        labelPenandatangan.should('contain', 'Penandatangan')

        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.find('option:selected').should('have.text', 'Pilih Format Penandatangan')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.should('have.attr', 'placeholder', ' Pilih Penandatangan')

        const labelPemeriksa = cy.get(kaki_surat.labelPemeriksa).as('labelPemeriksa')
        labelPemeriksa.should('contain', 'Pemeriksa')

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksa).as('pilihPemeriksa')
        pilihPemeriksa.should('have.attr', 'placeholder', ' Pilih/ketik nama pemeriksa naskah')

        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.should('be.visible')
            .should('contain', 'Tambahkan Pemeriksa')

        const labelTembusan = cy.get(kaki_surat.labelTembusan).as('labelTembusan')
        labelTembusan.should('contain', 'Tembusan')

        const subLabelTembusan = cy.get(kaki_surat.subLabelTembusan).as('subLabelTembusan')
        subLabelTembusan.should('contain', 'Tujuan tembusan maksimal 10 orang')

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.should('have.attr', 'placeholder', ' Pilih/ketik tembusan naskah')

        const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
        btnTambahTembusan.should('be.visible')
            .should('contain', 'Tambahkan Tembusan')
    }

    closeKakiSurat() {
        const closeKaki = cy.get(kaki_surat.closeKaki).as('closeKaki')
        closeKaki.should('be.visible')
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

    checkDropdownPenandatangan() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan
            .select(0)
            .should('have.text', 'Pilih Format Penandatangan Atasan \n              Atas nama\n             \n              Untuk beliau\n             Diri sendiri')
    }

    leaveEmptyField() {
        this.closeKakiSurat()

        const btnKirim = cy.get(kaki_surat.btnKirim).as('btnKirim')
        btnKirim.should('contain', 'Kirim Naskah')
            .should('have.attr', 'disabled', 'disabled')
    }

    pilihPenandatanganDiriSendiri(inputanPenandatanganDiriSendiri) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(4).should('have.value', 'DIRI_SENDIRI')

        const selectedPenandatangan = cy.xpath(kaki_surat.selectedPenandatangan).as('selectedPenandatangan')
        selectedPenandatangan.should('contain', inputanPenandatanganDiriSendiri)
            .invoke('val')
            .then(text => {
                const Penandatangan = text;
                const profileName = cy.get(kaki_surat.profileName).as('profileName')
                profileName.should('contain', Penandatangan)
            })
    }

    pilihPenandatanganAtasan(inputEnv, inputanPenandatanganAtasan1) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.wait(1000)
            .type(inputanPenandatanganAtasan1)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestPenandatanganAtasan1 = cy.get(kaki_surat.suggestPenandatanganAtasan1).as('suggestPenandatanganAtasan1')
                    suggestPenandatanganAtasan1.contains(inputanPenandatanganAtasan1, { timeout: 10000 }).should('be.visible')
                    pilihPenandatangan.type('{enter}')
                }
            })
    }

    pilihPemeriksa(inputEnv, inputanPemeriksa1) {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksa).as('pilihPemeriksa2')
        pilihPemeriksa.wait(1000)
            .type(inputanPemeriksa1)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestPemeriksa1 = cy.get(kaki_surat.suggestPemeriksa1).as('suggestPemeriksa1')
                    suggestPemeriksa1.contains(inputanPemeriksa1, { timeout: 10000 }).should('be.visible')
                    pilihPemeriksa.type('{enter}')
                }
            })
    }

    pilihTembusan(inputEnv, inputanTembusan1, inputanTembusan2) {
        this.inputTembusanEksternal1(inputEnv, inputanTembusan1)

        this.clickTambahTembusan()

        this.inputTembusanEksternal2(inputEnv, inputanTembusan2)
    }

    pilihTembusanSkenario1(inputEnv, inputanTembusanInternal1, inputanTembusanInternal2, inputanTembusanInternal3) {
        this.inputTembusanInternal1(inputEnv, inputanTembusanInternal1)

        this.clickTambahTembusan()

        this.inputTembusanInternal2(inputEnv, inputanTembusanInternal2)

        this.clickTambahTembusan()

        this.inputTembusanInternal3(inputEnv, inputanTembusanInternal3)
    }

    pilihTembusanSkenario2(inputanTembusan1, inputanTembusan2, inputanTembusan3) {
        this.inputTembusanEksternal1(inputanTembusan1)

        this.clickTambahTembusan()

        this.inputTembusanEksternal2(inputanTembusan2)

        this.clickTambahTembusan()

        this.inputTembusanEksternal3(inputanTembusan3)
    }

    pilihTembusanSkenario3(inputEnv, inputanTembusan1, inputanTembusan2, inputanTembusan3, inputanTembusanEksternal4, inputanTembusanEksternal5, inputanTembusanEksternal6) {
        this.inputTembusanInternal1(inputEnv, inputanTembusan1)

        this.clickTambahTembusan()

        this.inputTembusanInternal2(inputEnv, inputanTembusan2)

        this.clickTambahTembusan()

        this.inputTembusanInternal3(inputEnv, inputanTembusan3)

        this.clickTambahTembusan()

        this.inputTembusanEksternal4(inputEnv, inputanTembusanEksternal4)

        this.clickTambahTembusan()

        this.inputTembusanEksternal5(inputEnv, inputanTembusanEksternal5)

        this.clickTambahTembusan()

        this.inputTembusanEksternal6(inputEnv, inputanTembusanEksternal6)
    }

    pilihPenandatanganDiriSendiriProd(inputanPenandatanganDiriSendiri) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(2).should('have.value', 'DIRI_SENDIRI')

        const selectedPenandatangan = cy.xpath(kaki_surat.selectedPenandatangan).as('selectedPenandatangan')
        selectedPenandatangan.should('contain', inputanPenandatanganDiriSendiri)
            .invoke('val')
            .then(text => {
                const Penandatangan = text;
                const profileName = cy.get(kaki_surat.profileName).as('profileName')
                profileName.should('contain', Penandatangan)
            })
    }

    pilihPenandatanganAtasanProd(inputEnv, inputanPenandatanganAtasan1) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.wait(1000)
            .type(inputanPenandatanganAtasan1, { delay: 10 })

        cy.wait(5000)

        const suggestPenandatanganAtasan1 = cy.get(kaki_surat.suggestPenandatanganAtasan1).scrollIntoView().as('suggestPenandatanganAtasan1')
        suggestPenandatanganAtasan1.contains(inputanPenandatanganAtasan1, { timeout: 10000 }).should('be.visible')

        pilihPenandatangan.type('{enter}')
    }

    pilihPemeriksaProd(inputEnv, inputanPemeriksa1) {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksa).as('pilihPemeriksa2')
        pilihPemeriksa.wait(1000)
            .type(inputanPemeriksa1)

        cy.wait(5000)

        const suggestPemeriksa1 = cy.get(kaki_surat.suggestPemeriksa1).scrollIntoView().as('suggestPemeriksa1')
        suggestPemeriksa1.contains(inputanPemeriksa1, { timeout: 10000 }).should('be.visible')

        pilihPemeriksa.type('{enter}')
    }

    pilihTembusanSkenario3Prod(inputEnv, inputanTembusan1, inputanTembusan2, inputanTembusan3, inputanTembusanEksternal4, inputanTembusanEksternal5, inputanTembusanEksternal6) {
        this.inputTembusanInternalProd1(inputEnv, inputanTembusan1)

        this.clickTambahTembusan()

        this.inputTembusanInternalProd2(inputEnv, inputanTembusan2)

        this.clickTambahTembusan()

        this.inputTembusanInternalProd3(inputEnv, inputanTembusan3)

        this.clickTambahTembusan()

        this.inputTembusanEksternalProd4(inputEnv, inputanTembusanEksternal4)

        this.clickTambahTembusan()

        this.inputTembusanEksternalProd5(inputEnv, inputanTembusanEksternal5)

        this.clickTambahTembusan()

        this.inputTembusanEksternalProd6(inputEnv, inputanTembusanEksternal6)
    }

    clickTambahTembusan() {
        const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
        btnTambahTembusan.click()
    }

    // Tembusan Internal
    inputTembusanInternal1(inputEnv, inputanTembusanInternal1) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.wait(1000)
            .type(inputanTembusanInternal1)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusan = cy.get(kaki_surat.suggestTembusan, { timeout: 10000 }).as('suggestTembusan')
                    suggestTembusan.contains(inputanTembusanInternal1, { timeout: 15000 }).should('be.visible')

                    pilihTembusan.type('{enter}')
                }
            })
    }

    inputTembusanInternal2(inputEnv, inputanTembusanInternal2) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.wait(1000)
            .type(inputanTembusanInternal2)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusan = cy.get(kaki_surat.suggestTembusan, { timeout: 5000 }).as('suggestTembusan')
                    suggestTembusan.contains(inputanTembusanInternal2, { timeout: 10000 }).should('be.visible')

                    pilihTembusan2.type('{enter}')
                }
            })
    }

    inputTembusanInternal3(inputEnv, inputanTembusanInternal3) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.wait(1000)
            .type(inputanTembusanInternal3)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusan = cy.get(kaki_surat.suggestTembusan, { timeout: 5000 }).as('suggestTembusan')
                    suggestTembusan.contains(inputanTembusanInternal3, { timeout: 10000 }).should('be.visible')

                    pilihTembusan3.type('{enter}')
                }
            })
    }

    // Tembusan Eksternal
    inputTembusanEksternal1(inputEnv, inputanTembusan1) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.wait(1000)
            .type(inputanTembusan1)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal, { timeout: 10000 }).as('suggestTembusanEksternal')
                    suggestTembusanEksternal.contains(inputanTembusan1, { timeout: 10000 }).should('be.visible')

                    pilihTembusan.type('{enter}')
                }
            })
    }

    inputTembusanEksternal2(inputEnv, inputanTembusan2) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.wait(1000)
            .type(inputanTembusan2)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal, { timeout: 5000 }).as('suggestTembusanEksternal')
                    suggestTembusanEksternal.contains(inputanTembusan2, { timeout: 10000 }).should('be.visible')

                    pilihTembusan2.type('{enter}')
                }
            })
    }

    inputTembusanEksternal3(inputEnv, inputanTembusan3) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.wait(1000)
            .type(inputanTembusan3)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal, { timeout: 5000 }).as('suggestTembusanEksternal')
                    suggestTembusanEksternal.contains(inputanTembusan3, { timeout: 10000 }).should('be.visible')

                    pilihTembusan3.type('{enter}')
                }
            })
    }

    inputTembusanEksternal4(inputEnv, inputanTembusan4) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan4 = cy.get(kaki_surat.pilihTembusan4).as('pilihTembusan4')
        pilihTembusan4.wait(1000)
            .type(inputanTembusan4)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal, { timeout: 5000 }).as('suggestTembusanEksternal')
                    suggestTembusanEksternal.contains(inputanTembusan4, { timeout: 10000 }).should('be.visible')

                    pilihTembusan4.type('{enter}')
                }
            })
    }

    inputTembusanEksternal5(inputEnv, inputanTembusan5) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan5 = cy.get(kaki_surat.pilihTembusan5).as('pilihTembusan5')
        pilihTembusan5.wait(1000)
            .type(inputanTembusan5)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal, { timeout: 5000 }).as('suggestTembusanEksternal')
                    suggestTembusanEksternal.contains(inputanTembusan5, { timeout: 10000 }).should('be.visible')

                    pilihTembusan5.type('{enter}')
                }
            })
    }

    inputTembusanEksternal6(inputEnv, inputanTembusan6) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihTembusan6 = cy.get(kaki_surat.pilihTembusan6).as('pilihTembusan6')
        pilihTembusan6.wait(1000)
            .type(inputanTembusan6)

        cy.wait('@postRequest', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal, { timeout: 5000 }).as('suggestTembusanEksternal')
                    suggestTembusanEksternal.contains(inputanTembusan6, { timeout: 10000 }).should('be.visible')

                    pilihTembusan6.type('{enter}')
                }
            })
    }

    // Tembusan Internal Eksternal Prod
    inputTembusanInternalProd1(inputEnv, inputanTembusanInternal1) {
        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.wait(1000)
            .type(inputanTembusanInternal1)

        cy.wait(5000)

        const suggestTembusan = cy.get(kaki_surat.suggestTembusan).scrollIntoView().as('suggestTembusan')
        suggestTembusan.contains(inputanTembusanInternal1, { timeout: 15000 }).should('be.visible')

        pilihTembusan.type('{enter}')
    }

    inputTembusanInternalProd2(inputEnv, inputanTembusanInternal2) {
        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.wait(1000)
            .type(inputanTembusanInternal2)

        cy.wait(5000)

        const suggestTembusan = cy.get(kaki_surat.suggestTembusan).scrollIntoView().as('suggestTembusan')
        suggestTembusan.contains(inputanTembusanInternal2, { timeout: 10000 }).should('be.visible')

        pilihTembusan2.type('{enter}')
    }

    inputTembusanInternalProd3(inputEnv, inputanTembusanInternal3) {
        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.wait(1000)
            .type(inputanTembusanInternal3)

        cy.wait(5000)

        const suggestTembusan = cy.get(kaki_surat.suggestTembusan).scrollIntoView().as('suggestTembusan')
        suggestTembusan.contains(inputanTembusanInternal3, { timeout: 10000 }).should('be.visible')

        pilihTembusan3.type('{enter}')
    }

    inputTembusanEksternalProd4(inputEnv, inputanTembusan4) {
        const pilihTembusan4 = cy.get(kaki_surat.pilihTembusan4).as('pilihTembusan4')
        pilihTembusan4.wait(1000)
            .type(inputanTembusan4)

        cy.wait(5000)

        const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal).scrollIntoView().as('suggestTembusanEksternal')
        suggestTembusanEksternal.contains(inputanTembusan4, { timeout: 10000 }).should('be.visible')

        pilihTembusan4.type('{enter}')
    }

    inputTembusanEksternalProd5(inputEnv, inputanTembusan5) {
        const pilihTembusan5 = cy.get(kaki_surat.pilihTembusan5).as('pilihTembusan5')
        pilihTembusan5.wait(1000)
            .type(inputanTembusan5)

        cy.wait(5000)

        const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal).scrollIntoView().as('suggestTembusanEksternal')
        suggestTembusanEksternal.contains(inputanTembusan5, { timeout: 10000 }).should('be.visible')

        pilihTembusan5.type('{enter}')
    }

    inputTembusanEksternalProd6(inputEnv, inputanTembusan6) {
        const pilihTembusan6 = cy.get(kaki_surat.pilihTembusan6).as('pilihTembusan6')
        pilihTembusan6.wait(1000)
            .type(inputanTembusan6)

        cy.wait(5000)

        const suggestTembusanEksternal = cy.get(kaki_surat.suggestTembusanEksternal).scrollIntoView().as('suggestTembusanEksternal')
        suggestTembusanEksternal.contains(inputanTembusan6, { timeout: 10000 })//.should('be.visible')

        pilihTembusan6.type('{enter}')
    }
}
