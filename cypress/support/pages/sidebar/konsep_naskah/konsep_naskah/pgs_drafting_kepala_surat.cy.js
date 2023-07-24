import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kepala_surat"
import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const filename = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

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
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
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
                previewTempat.should('contain', tempatPenulisan)
            });
    }

    validateTanggal() {
        const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
        titleTanggal.should('contain', 'Tanggal Penomoran')

        /*const inputTanggal = cy.get(kepala_surat.inputTanggal).as('inputTanggal')
        inputTanggal.find('input')
            .should('have.attr', 'disabled', 'disabled')
            .invoke('val')
            .then(text => {
                const tanggalNaskah = text;
                const previewTempat = cy.xpath(kepala_surat.previewTempat).as('previewTempat')
                previewTempat.should('contain', tanggalNaskah)
            })*/
    }

    validateTujuan() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
        inputTujuan.wait(1000)
            .type('Ika Mardiah')
            .wait(3000)
            .type('{enter}')
    }

    validateLokasi() {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type('Tempat')
    }

    validateKodeKlasifikasi() {
        cy.wait(6000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.click()
            .wait(3000)
            .type('SK (Semua Klasifikasi)')
            .wait(6000)
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

    validatePerihal(hal) {
        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        //const perihal = 'Lampiran - All Internal 3 + Tembusan'
        const perihal = `Automation Testing ${id} ${hal}`

        inputPerihal.type(perihal)
        cy.writeFile(filename, { titlePerihal: perihal })
    }

    validateTujuanInternal() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 4; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type('Setiawan Wangsaatmaja')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        inputTujuan3.wait(1000)
            .type('Rizki Hustiniasari')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        inputTujuan4.wait(1000)
            .type('Ika Mardiah')
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanEksternal() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 4; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        const uuid0 = () => Cypress._.random(0, 1e6)
        const id0 = uuid0()
        const tujuanEks0 = `Test Tujuan Eksternal Automation ${id0}`

        inputTujuan0.type(tujuanEks0)
            .wait(3000)
            .type('{enter}')

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        const uuid1 = () => Cypress._.random(0, 1e6)
        const id1 = uuid1()
        const tujuanEks1 = `Test Tujuan Eksternal Automation ${id1}`

        inputTujuan1.type(tujuanEks1)
            .wait(3000)
            .type('{enter}')

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        const uuid2 = () => Cypress._.random(0, 1e6)
        const id2 = uuid2()
        const tujuanEks2 = `Test Tujuan Eksternal Automation ${id2}`

        inputTujuan2.type(tujuanEks2)
            .wait(3000)
            .type('{enter}')

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        const uuid3 = () => Cypress._.random(0, 1e6)
        const id3 = uuid3()
        const tujuanEks3 = `Test Tujuan Eksternal Automation ${id3}`

        inputTujuan3.type(tujuanEks3)
            .wait(3000)
            .type('{enter}')

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        const uuid4 = () => Cypress._.random(0, 1e6)
        const id4 = uuid4()
        const tujuanEks4 = `Test Tujuan Eksternal Automation ${id4}`

        inputTujuan4.type(tujuanEks4)
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanInternalEksternal() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 4; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type('Setiawan Wangsaatmaja')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        const uuid3 = () => Cypress._.random(0, 1e6)
        const id3 = uuid3()
        const tujuanEks3 = `Test Tujuan Eksternal Automation ${id3}`

        inputTujuan3.type(tujuanEks3)
            .wait(3000)
            .type('{enter}')

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        const uuid4 = () => Cypress._.random(0, 1e6)
        const id4 = uuid4()
        const tujuanEks4 = `Test Tujuan Eksternal Automation ${id4}`

        inputTujuan4.type(tujuanEks4)
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanProd() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.xpath(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.xpath(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Testing up to prod')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.xpath(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click(180, 260)

        for (let i = 1; i <= 4; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.xpath(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Hening Widiatmoko')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.xpath(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.xpath(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.xpath(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type('Tujuan Eksternal')
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.xpath(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type('Tujuan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario1() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 2; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type('Setiawan Wangsaatmaja')
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanSkenario2() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.xpath(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.xpath(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.xpath(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click(180, 260)

        for (let i = 1; i <= 2; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.xpath(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Hening Widiatmoko')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.xpath(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.xpath(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario3() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 2; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type('Tujuan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type('Tujuan Eksternal 2')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type('Tujuan Eksternal 3')
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanSkenario4() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.xpath(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.xpath(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran eksternal regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.xpath(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click(180, 260)

        for (let i = 1; i <= 2; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.xpath(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Tujuan Lampiran 1')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.xpath(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Tujuan Lampiran 2')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.xpath(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type('Tujuan Lampiran 3')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario5() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type('Setiawan Wangsaatmaja')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        const uuid3 = () => Cypress._.random(0, 1e6)
        const id3 = uuid3()
        const tujuanEks3 = `Test Tujuan Eksternal Automation ${id3}`

        inputTujuan3.type(tujuanEks3)
            .wait(3000)
            .type('{enter}')

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        const uuid4 = () => Cypress._.random(0, 1e6)
        const id4 = uuid4()
        const tujuanEks4 = `Test Tujuan Eksternal Automation ${id4}`

        inputTujuan4.type(tujuanEks4)
            .wait(3000)
            .type('{enter}')

        const inputTujuan5 = cy.get(kepala_surat.inputTujuan5).as('inputTujuan5')
        const uuid5 = () => Cypress._.random(0, 1e6)
        const id5 = uuid5()
        const tujuanEks5 = `Test Tujuan Eksternal Automation ${id5}`

        inputTujuan5.type(tujuanEks5)
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanSkenario6() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.xpath(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.xpath(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran internal eksternal regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.xpath(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click(180, 260)

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.xpath(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Hening Widiatmoko')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.xpath(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.xpath(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.xpath(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type('Tujuan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.xpath(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type('Tujuan Eksternal 2')
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran5 = cy.xpath(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type('Tujuan Eksternal 3')
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

}