import kaki_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kaki_surat"
import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingKakiSuratPage {

    aksesFormEditingKakiSurat() {
        const findKaki = cy.get(konsep_naskah.previewKop).as('findKaki')
        findKaki.scrollIntoView()
    }

    inputKakiSurat() {
        const previewKaki = cy.get(konsep_naskah.previewKaki).as('previewKaki')
        previewKaki.click({ multiple: true })

        const titleKaki = cy.get(konsep_naskah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    checkDetail() {
        const titleKaki = cy.get(kaki_surat.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')

        const labelPenandatangan = cy.get(kaki_surat.labelPenandatanganNotaDinas).as('labelPenandatangan')
        labelPenandatangan.should('contain', 'Penandatangan')

        cy.wait(3000)

        const selectPenandatangan = cy.get(kaki_surat.selectPenandatanganNotaDinas).as('selectPenandatangan')
        selectPenandatangan.find('option:selected').should('have.text', 'Pilih Format Penandatangan')

        cy.wait(3000)

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatanganNotaDinas).as('pilihPenandatangan')
        pilihPenandatangan.find('input').should('have.attr', 'placeholder', ' Pilih Penandatangan')

        cy.wait(3000)

        const labelPemeriksa = cy.get(kaki_surat.labelPemeriksaNotaDinas).as('labelPemeriksa')
        labelPemeriksa.should('contain', 'Pemeriksa')

        cy.wait(3000)

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksaNotaDinas).as('pilihPemeriksa')
        pilihPemeriksa.should('have.attr', 'placeholder', ' Pilih/ketik nama pemeriksa naskah')

        cy.wait(3000)

        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksaNotaDinas).as('btnTambahPemeriksa')
        btnTambahPemeriksa.should('be.visible')
            .should('contain', 'Tambahkan Pemeriksa')
    }

    closeKakiSurat() {
        const closeKaki = cy.get(kaki_surat.closeKakiNotaDinas).as('closeKaki')
        closeKaki.scrollIntoView()
            .click()
    }

    checkDropdownPenandatangan() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatanganNotaDinas).as('selectPenandatangan')
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

    pilihPenandatanganDiriSendiri() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatanganNotaDinas).as('selectPenandatangan')
        selectPenandatangan.select(4).should('have.value', 'DIRI_SENDIRI')

        const selectedPenandatangan = cy.xpath(kaki_surat.selectedPenandatangan).as('selectedPenandatangan')
        selectedPenandatangan.should('contain', 'VITA PUTRI UTAMI, S.Sos., M.I.Kom')
            .invoke('val')
            .then(text => {
                const Penandatangan = text;
                const profileName = cy.get(kaki_surat.profileName).as('profileName')
                profileName.should('contain', Penandatangan)
            })
    }

    pilihPenandatanganDiriSendiriPROD() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatanganNotaDinas).as('selectPenandatangan')
        selectPenandatangan.select(2).should('have.value', 'DIRI_SENDIRI')

        const selectedPenandatangan = cy.xpath(kaki_surat.selectedPenandatangan).as('selectedPenandatangan')
        selectedPenandatangan.should('contain', 'SMOKE TEST VITA PUTRI UTAMI, S.Sos., M.I.Kom')
            .invoke('val')
            .then(text => {
                const Penandatangan = text;
                const profileName = cy.get(kaki_surat.profileName).as('profileName')
                profileName.should('contain', Penandatangan)
            })
    }

    pilihPenandatanganAtasan(inputEnv, inputanPenandatanganAtasan1) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatanganNotaDinas).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        const pilihPenandatanganNotaDinas = cy.get(kaki_surat.pilihPenandatanganNotaDinas).as('pilihPenandatanganNotaDinas')
        pilihPenandatanganNotaDinas.wait(1000)
            .type(inputanPenandatanganAtasan1)
            .wait(3000)

        cy.wait('@postRequest', { timeout: 15000 })
        .then((interception) => {
            if (interception.response.statusCode === 200) {
                const suggestPenandatanganAtasan1 = cy.get(kaki_surat.suggestPenandatanganAtasan1).as('suggestPenandatanganAtasan1')
                suggestPenandatanganAtasan1.contains(inputanPenandatanganAtasan1, { timeout: 10000 }).should('be.visible')
                pilihPenandatanganNotaDinas.type('{enter}')
            }
        })
    }

    pilihPenandatanganAtasanPROD(inputPenandatangan) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatanganNotaDinas).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatanganNotaDinas).as('pilihPenandatangan')
        pilihPenandatangan.type(inputPenandatangan)
            .wait(2000)
            .type('{enter}')
    }

    pilihPemeriksa(inputanPemeriksa) {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksaNotaDinas).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksaNotaDinas).as('pilihPemeriksa2')
        pilihPemeriksa.type(inputanPemeriksa)
            .wait(5000)
            .type('{enter}')
    }

    pilihPemeriksaPROD(inputPemeriksa) {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksaNotaDinas).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksaNotaDinas).as('pilihPemeriksa2')
        pilihPemeriksa.type(inputPemeriksa, { force: true })
            .wait(5000)
            .type('{enter}')
    }

    inputPenandatanganDiriSendiri() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(4).should('have.value', 'DIRI_SENDIRI')
    }

    inputTembusanKoreksiPemeriksa1() {
        const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
        btnTambahTembusan.click()

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.type('KOREKSI PEMERIKSA 1')
            .wait(2000)
            .type('{enter}')
    }

    inputTembusanPerbaikiPemeriksa2() {
        const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
        btnTambahTembusan.click()

        const pilihTembusan4 = cy.get(kaki_surat.pilihTembusan4).as('pilihTembusan4')
        pilihTembusan4.type('PERBAIKI PEMERIKSA 2')
            .wait(2000)
            .type('{enter}')
    }

    clickSimpanSurat() {
        const buttonSimpanSurat = cy.get(kaki_surat.btnSimpanSurat).as('buttonSimpanSurat')
        buttonSimpanSurat.click()
    }

}
