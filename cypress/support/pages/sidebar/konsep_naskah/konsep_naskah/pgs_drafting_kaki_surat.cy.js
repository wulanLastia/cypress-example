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
        .should('have.text', 'Pilih Format Penandatangan Atasan \n Atas nama\n \n Untuk beliau\n Diri sendiri')
    }

    leaveEmptyField() {
        this.closeKakiSurat()

        const btnKirim = cy.get(kaki_surat.btnKirim).as('btnKirim')
        btnKirim.should('contain', 'Kirim Naskah')
            .should('have.attr', 'disabled', 'disabled')
    }

    pilihPenandatanganDiriSendiri() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
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
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.type('HENING WIDIATMOKO')
            .wait(2000)
            .type('{enter}')
    }

    pilihPemeriksa() {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksa).as('pilihPemeriksa2')
        pilihPemeriksa.type('FAJAR LIBRIANTO', { force: true })
            .wait(5000)
            .type('{enter}')
    }

    pilihTembusan() {
        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.type('Tembusan 1')
            .wait(2000)
            .type('{enter}')

        const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
        btnTambahTembusan.click()

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.type('Tembusan 2')
            .wait(2000)
            .type('{enter}')
    }

    pilihTembusanSkenario1() {
        for (let i = 1; i <= 2; i++) {
            const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
            btnTambahTembusan.click()
        }

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.type('RIDWAN KAMIL')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.type('UU RUZHANUL')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.type('RIZKI HUSTINIASARI')
            .wait(3000)
            .type('{enter}')
    }

    pilihTembusanSkenario2() {
        for (let i = 1; i <= 2; i++) {
            const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
            btnTambahTembusan.click()
        }

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.type('Tembusan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.type('Tembusan Eksternal 2')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.type('Tembusan Eksternal 3')
            .wait(3000)
            .type('{enter}')
    }

    pilihTembusanSkenario3() {
        for (let i = 1; i <= 5; i++) {
            const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
            btnTambahTembusan.click()
        }

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.type('RIDWAN KAMIL')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.type('UU RUZHANUL')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.type('RIZKI HUSTINIASARI')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan4 = cy.get(kaki_surat.pilihTembusan4).as('pilihTembusan')
        pilihTembusan4.type('Tembusan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan5 = cy.get(kaki_surat.pilihTembusan5).as('pilihTembusan2')
        pilihTembusan5.type('Tembusan Eksternal 2')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan6 = cy.get(kaki_surat.pilihTembusan6).as('pilihTembusan3')
        pilihTembusan6.type('Tembusan Eksternal 3')
            .wait(3000)
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


        // Nanti fungsi dibawah dipindah
    clickSimpanSurat() {
        const buttonSimpanSurat = cy.get(kaki_surat.btnSimpanSurat).as('buttonSimpanSurat')
        buttonSimpanSurat.click()
    }


    pilihPenandatanganAtasanProd() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.type('SMOKE TEST DR. HENING')
            .wait(2000)
            .type('{enter}')
    }

    pilihPemeriksaProd() {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksa).as('pilihPemeriksa2')
        pilihPemeriksa.type('SMOKE TEST FAJAR LIBRIANTO', { force: true })
            .wait(5000)
            .type('{enter}')
    }

    pilihTembusanSkenario3Prod() {
        for (let i = 1; i <= 5; i++) {
            const btnTambahTembusan = cy.get(kaki_surat.btnTambahTembusan).as('btnTambahTembusan')
            btnTambahTembusan.click()
        }

        const pilihTembusan = cy.get(kaki_surat.pilihTembusan).as('pilihTembusan')
        pilihTembusan.type('SMOKE TEST DR. IKA MARDIAH')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan2 = cy.get(kaki_surat.pilihTembusan2).as('pilihTembusan2')
        pilihTembusan2.type('SMOKE TEST RIZKI HUSTINIASARI')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan3 = cy.get(kaki_surat.pilihTembusan3).as('pilihTembusan3')
        pilihTembusan3.type('SMOKE TEST ZUHARIN INSANA')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan4 = cy.get(kaki_surat.pilihTembusan4).as('pilihTembusan')
        pilihTembusan4.type('Tembusan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan5 = cy.get(kaki_surat.pilihTembusan5).as('pilihTembusan2')
        pilihTembusan5.type('Tembusan Eksternal 2')
            .wait(3000)
            .type('{enter}')

        const pilihTembusan6 = cy.get(kaki_surat.pilihTembusan6).as('pilihTembusan3')
        pilihTembusan6.type('Tembusan Eksternal 3')
            .wait(3000)
            .type('{enter}')
    }

}