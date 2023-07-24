import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/nota_dinas/drafting_kepala_surat"
import { DraftingNotaDinasPage } from "../nota_dinas/pgs_drafting_nota_dinas.cy"

const draftingNotaDinasPage = new DraftingNotaDinasPage()

const filename = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

export class DraftingKepalaSuratNotaDinasPage {

    aksesFormEditingKepalaSurat() {
        draftingNotaDinasPage.aksesFormKepalaSurat()
    }

    checkDetailPreview() {
        const titlePreviewKepalaSurat = cy.get(kepala_surat.titlePreviewKepalaSurat).as('titlePreviewKepalaSurat')
        titlePreviewKepalaSurat.should('contain', 'NOTA DINAS')
            .and('be.visible')

        const previewKepalaLampiran = cy.get(kepala_surat.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.should('contain', 'Yth.')
    }

    checkDetail() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const titleKepalaSurat = cy.get(kepala_surat.titleKepalaSurat).as('titleKepalaSurat')
        titleKepalaSurat.should('contain', 'Kepala Surat')
            .and('be.visible')

        // Penempatan Tujuan Surat 
        const penempatanTujuanSurat = cy.get(kepala_surat.penempatanTujuanSurat).as('penempatanTujuanSurat')
        penempatanTujuanSurat.should('contain', 'Penempatan daftar tujuan surat')
            .and('be.visible')

        const radio1 = cy.xpath(kepala_surat.radio1).as('radio1')
        radio1.should('be.visible')
            .click()

        const labelRadio1 = cy.xpath(kepala_surat.labelRadio1).as('labelRadio1')
        labelRadio1.should('contain', 'Kepala Surat')
            .and('be.visible')

        const radio2 = cy.xpath(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.xpath(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')
            .and('be.visible')

        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.should('have.attr', 'placeholder', 'Pilih/ketik tujuan surat')

        const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
        addMoreTujuan.should('contain', 'Tambah Tujuan Surat')

        const labelTembusan = cy.get(kepala_surat.labelTembusan).as('labelTembusan')
        labelTembusan.should('contain', 'Tembusan')

        const inputTembusan0 = cy.get(kepala_surat.inputTembusan0).as('inputTembusan0')
        inputTembusan0.should('have.attr', 'placeholder', 'Pilih atau ketik tujuan tembusan nota dinas')

        const addMoreTembusan = cy.get(kepala_surat.addMoreTembusan).as('addMoreTembusan')
        addMoreTembusan.should('contain', 'Tambah Tembusan')

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.find('input')
            .should('have.attr', 'placeholder', 'Pilih kode klasifikasi')

        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.should('have.attr', 'placeholder', 'ketik unit pengolah')

        const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
        titleTanggal.should('contain', 'Tanggal Penomoran')

        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.find('input')
            .should('have.attr', 'placeholder', 'Pilih sifat surat nota dinas')

        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const selectUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('selectUrgensiSurat')
        selectUrgensiSurat.find('input')
            .should('have.attr', 'placeholder', 'Pilih urgensi nota dinas')

        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        inputPerihal.should('have.attr', 'placeholder', 'ketik perihal surat')

    }

    closeKepalaSurat() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const closeKepalaSurat = cy.get(kepala_surat.closeKepalaSurat).as('closeKepalaSurat')
        closeKepalaSurat.should('be.visible')
            .click()

        draftingNotaDinasPage.validateFormDefault()
    }

}