import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kepala_surat"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingKepalaSuratPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingKepalaSurat() {
        draftingKonsepNaskahPage.aksesFormKepalaSurat()
    }

    checkDetail() {
        const titleKepalaSurat = cy.get(kepala_surat.titleKepalaSurat).as('titleKop')
        titleKepalaSurat.should('contain', 'Kepala Surat')
            .and('be.visible')
    }

    closeKepalaSurat() {
        const scrollForm = cy.xpath(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const closeKepalaSurat = cy.get(kepala_surat.closeKepalaSurat).as('closeKepalaSurat')
        closeKepalaSurat.should('be.visible')
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

    validateTempat() {
        const titleTempatPenulisan = cy.get(kepala_surat.titleTempatPenulisan).as('titleTempatPenulisan')
        titleTempatPenulisan.should('contain', 'Tempat Penulisan Surat')

        const inputTempatPenulisan = cy.get(kepala_surat.inputTempatPenulisan).as('inputTempatPenulisan')
        inputTempatPenulisan.invoke('val')
            .then(text => {
                const tempatPenulisan = text;
                const previewTempat = cy.xpath(kepala_surat.previewTempat).as('previewTempat')
                previewTempat.should('contain', tempatPenulisan);
            });
    }

    validateTanggal() {
        const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
        titleTanggal.should('contain', 'Tanggal Naskah')

        const inputTanggal = cy.get(kepala_surat.inputTanggal).as('inputTanggal')
        inputTanggal.find('input')
            .should('have.attr', 'disabled', 'disabled')
            .invoke('val')
            .then(text => {
                const tanggalNaskah = text;
                const previewTempat = cy.xpath(kepala_surat.previewTempat).as('previewTempat')
                previewTempat.should('contain', tanggalNaskah)
            })
    }

    validateTujuan() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        //const selectTujuan = cy.get(kepala_surat.selectTujuan).as('selectTujuan')
        //selectTujuan.click()

        const inputTujuan = cy.get(kepala_surat.inputTujuan).as('inputTujuan')
        inputTujuan.type('Ika Mardiah')
            .wait(3000)
            .type('{enter}')
    }

    validateLokasi() {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.xpath(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type('Tempat')
    }

    validateKodeKlasifikasi() {
        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.click()
            .type('AR (Kearsipan)')
            .wait(3000)
            .type('{enter}')
    }

    validateUnitPengolah() {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type('PAD')
    }

    validateSifatSurat() {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.click()
            .contains('Penting')
            .click()
    }

    validateUrgensiSurat() {
        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const selectUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('selectUrgensiSurat')
        selectUrgensiSurat.click()
            .contains('Amat Segera')
            .click()
    }

    validatePerihal() {
        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const perihal = `Automation Testing ${id}`

        inputPerihal.type(perihal)
    }

}