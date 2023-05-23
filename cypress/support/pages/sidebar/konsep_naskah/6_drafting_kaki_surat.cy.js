import kaki_surat from "../../../selectors/sidebar/konsep_naskah/drafting_kaki_surat"
import { DraftingKonsepNaskahPage } from "./2_drafting_surat_biasa.cy"

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
        const titleKaki = cy.xpath(kaki_surat.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')

        const labelPenandatangan = cy.xpath(kaki_surat.labelPenandatangan).as('labelPenandatangan')
        labelPenandatangan.should('contain', 'Penandatangan')

        const selectPenandatangan = cy.xpath(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.find('option:selected').should('have.text', 'Pilih Format Penandatangan')

        const pilihPenandatangan = cy.xpath(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.should('have.attr', 'placeholder', ' Pilih Penandatangan')

        const labelPemeriksa = cy.xpath(kaki_surat.labelPemeriksa).as('labelPemeriksa')
        labelPemeriksa.should('contain', 'Pemeriksa')

        const pilihPemeriksa = cy.xpath(kaki_surat.pilihPemeriksa).as('pilihPemeriksa')
        pilihPemeriksa.should('have.attr', 'placeholder', ' Pilih/ketik nama pemeriksa naskah')

        const btnTambahPemeriksa = cy.xpath(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.should('be.visible')
            .should('contain', 'Tambahkan Pemeriksa')

        const labelTembusan = cy.xpath(kaki_surat.labelTembusan).as('labelTembusan')
        labelTembusan.should('contain', 'Tembusan')

        const subLabelTembusan = cy.xpath(kaki_surat.subLabelTembusan).as('subLabelTembusan')
        subLabelTembusan.should('contain', 'Tujuan tembusan maksimal 10 orang')

        const pilihTembusan = cy.xpath(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.should('have.attr', 'placeholder', ' Pilih/ketik tembusan naskah')

        const btnTambahTembusan = cy.xpath(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
        btnTambahTembusan.should('be.visible')
            .should('contain', 'Tambahkan Tembusan')
    }

    closeKakiSurat() {
        const closeKaki = cy.xpath(kaki_surat.closeKaki).as('closeKaki')
        closeKaki.should('be.visible')
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

    checkDropdownPenandatangan() {
        const selectPenandatangan = cy.xpath(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(0).should('have.text', 'Pilih Format Penandatangan Atasan Atas nama Untuk beliau Diri sendiri')
    }

    leaveEmptyField() {
        this.closeKakiSurat()

        const btnKirim = cy.get(kaki_surat.btnKirim).as('btnKirim')
        btnKirim.should('contain', 'Kirim Naskah')
            .should('have.attr', 'disabled', 'disabled')
    }

    pilihPenandatanganDiriSendiri() {
        const selectPenandatangan = cy.xpath(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(4).should('have.value', 'DIRI_SENDIRI')

        const selectedPenandatangan = cy.xpath(kaki_surat.selectedPenandatangan).as('selectedPenandatangan')
        selectedPenandatangan.should('contain', 'VITA PUTRI UTAMI, S.Sos., M.I.Kom')
            .invoke('val')
            .then(text => {
                const Penandatangan = text;
                const profileName = cy.xpath(kaki_surat.profileName).as('profileName')
                profileName.should('contain', Penandatangan)
            })
    }

    pilihPenandatanganAtasan() {
        const selectPenandatangan = cy.xpath(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        const pilihPenandatangan = cy.xpath(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.type('Hening')
            .wait(2000)
            .type('{enter}')
    }

    pilihPemeriksa() {
        const pilihPemeriksa = cy.xpath(kaki_surat.pilihPemeriksa).as('pilihPemeriksa')
        pilihPemeriksa.type('Hening')
            .wait(2000)
            .type('{enter}')

        const btnTambahPemeriksa = cy.xpath(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        const pilihPemeriksa2 = cy.xpath(kaki_surat.pilihPemeriksa2).as('pilihPemeriksa2')
        pilihPemeriksa2.type('Fajar')
            .wait(2000)
            .type('{enter}')
    }

}