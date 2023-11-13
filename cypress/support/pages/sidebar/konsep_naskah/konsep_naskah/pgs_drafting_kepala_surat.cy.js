import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kepala_surat"
import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const filename = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"

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

    validateTanggal(val) {
        if (val === 'Manual') {
            const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
            titleTanggal.should('contain', 'Tanggal Penomoran')

            const inputTanggal = cy.get(kepala_surat.inputTanggal).as('inputTanggal')
            inputTanggal.click()

            const getpopupPenomoran = cy.get(kepala_surat.getpopupPenomoran).as('getpopupPenomoran')
            getpopupPenomoran.should('be.visible')

            const gettitlePopupPenomoran = cy.get(kepala_surat.gettitlePopupPenomoran).as('gettitlePopupPenomoran')
            gettitlePopupPenomoran.should('contain', 'Penomoran Manual')

            const getsubtittlePopupPenomoran = cy.get(kepala_surat.getsubtittlePopupPenomoran).as('getsubtittlePopupPenomoran')
            getsubtittlePopupPenomoran.should('contain', 'Ingat, penomoran manual hanya digunakan untuk kasus khusus. Apakah Anda telah mendiskusikan dengan atasan dan yakin akan melanjutkan?')

            const btnkonfirmasiPopupPenomoran = cy.xpath(kepala_surat.btnkonfirmasiPopupPenomoran).as('btnkonfirmasiPopupPenomoran')
            btnkonfirmasiPopupPenomoran.should('be.visible')
                .click()

            const xpathTabelPenomoran1 = cy.xpath(kepala_surat.xpathTabelPenomoran1).as('xpathTabelPenomoran1')
            xpathTabelPenomoran1.invoke('val')
                .then((val) => {
                    cy.log(val)
                    if (val > 0) {
                        cy.log('masuk sini')
                    }
                });
        }
    }

    validateTujuan(inputanTujuan1) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
        inputTujuan.wait(1000)
            .type(inputanTujuan1, {
                delay: 500,
            })

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    inputTujuan.type('{enter}')
                }
            })

        /*cy.wait('@checkResponse').its('response.statusCode').should('eq', 200)
            .then(() => {
                inputTujuan.type('{enter}')
            })*/
    }

    validateLokasi(inputanLokasi) {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type(inputanLokasi)
    }

    validateLokasiNegatifTagScript() {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type("Test JS Script <script>alert('Executing JS')</script>")
    }

    validateLokasiNegatifHTMLScript() {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type("<blink>Hello World</blink>")
    }

    validateLokasiNegatifXSSScript() {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type("'-prompt()-'")
    }

    validateLokasiNegatifWhitespace() {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type("{shift}{enter}")
            .wait(3000)
            .blur()

    }

    validateKodeKlasifikasi(inputanKodeKlasifikasi) {
        cy.wait(3000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.click()
            .wait(3000)
            .type(inputanKodeKlasifikasi)
            .wait(3000)
            .type('{enter}')
    }

    validateKodeKlasifikasiNegatifWhitespace() {
        cy.wait(6000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.click()
            .wait(3000)
            .type("{shift}{enter}")
            .wait(3000)
            .trigger('blur')
    }

    validateUnitPengolah(inputanUnitPengolah) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type(inputanUnitPengolah)
    }

    validateUnitPengolahNegatifTagScript() {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type("Test JS Script <script>alert('Executing JS')</script>")
    }

    validateUnitPengolahNegatifHTMLScript() {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type("<blink>Hello World</blink>")
    }

    validateUnitPengolahNegatifXSSScript() {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type("'-prompt()-'")
    }

    validateUnitPengolahNegatifWhitespace() {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type("{shift}{enter}")
            .wait(3000)
            .blur()
    }

    validateSifatSurat(inputanSifatSurat) {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.click()
            .contains(inputanSifatSurat)
            .click()
    }

    deleteSifatSurat() {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.click()
    }

    whitespaceSifatSurat() {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const whitespaceSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('whitespaceSifatSurat')
        whitespaceSifatSurat.type("{shift}{enter}")
            .wait(3000)
            .trigger('blur')
    }

    validateUrgensiSurat(inputanUrgensiSurat) {
        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const selectUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('selectUrgensiSurat')
        selectUrgensiSurat.click()
            .wait(10000)
            .contains(inputanUrgensiSurat, { timeout: 10000 })
            .click()
    }

    whitespaceUrgensiSurat() {
        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const whitespaceUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('whitespaceUrgensiSurat')
        whitespaceUrgensiSurat.type("{shift}{enter}")
            .wait(3000)
            .trigger('blur')
    }

    validatePerihal(inputanPerihal) {
        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        inputPerihal.invoke('val')
            .then((val) => {
                if (val) {
                    const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    const perihal = `${inputanPerihal}`
                    inputPerihal.type(perihal)

                    const inputPerihalUpdate = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    inputPerihalUpdate.invoke('val')
                        .then((val) => {
                            cy.writeFile(filename, { titlePerihal: val })
                        })
                } else {
                    const uuid = () => Cypress._.random(0, 1e6)
                    const id = uuid()
                    const perihal = `Automation Testing ${id}${inputanPerihal}`

                    const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    inputPerihal.type(perihal)
                    cy.writeFile(filename, { titlePerihal: perihal })
                }
            })
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

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Testing up to prod')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 4; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Dra. Hj. I GUSTI AGUNG')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type('Tujuan Eksternal')
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type('Tujuan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario1(inputanTujuan1, inputanTujuan2, inputanTujuan3) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        this.inputTujuanSurat1(inputanTujuan1)

        cy.wait(3000)
        this.clickTambahTujuan()

        this.inputTujuanSurat2(inputanTujuan2)

        cy.wait(3000)
        this.clickTambahTujuan()

        this.inputTujuanSurat3(inputanTujuan3)
    }

    validateTujuanSkenario2(inputanTujuan1, inputanTujuan2, inputanTujuan3) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranSurat1(inputanTujuan1)

        cy.wait(3000)
        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSurat2(inputanTujuan2)

        cy.wait(3000)
        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSurat3(inputanTujuan3)

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

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran eksternal regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 2; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Tujuan Lampiran 1')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Tujuan Lampiran 2')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
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
        inputTujuan0.wait(5000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(5000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(5000)
            .type('Setiawan Wangsaatmaja')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        const uuid3 = () => Cypress._.random(0, 1e6)
        const id3 = uuid3()
        const tujuanEks3 = `Test Tujuan Eksternal Automation ${id3}`

        inputTujuan3.wait(5000)
            .type(tujuanEks3)
            .wait(3000)
            .type('{enter}')

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        const uuid4 = () => Cypress._.random(0, 1e6)
        const id4 = uuid4()
        const tujuanEks4 = `Test Tujuan Eksternal Automation ${id4}`

        inputTujuan4.wait(5000)
            .type(tujuanEks4)
            .wait(3000)
            .type('{enter}')

        const inputTujuan5 = cy.get(kepala_surat.inputTujuan5).as('inputTujuan5')
        const uuid5 = () => Cypress._.random(0, 1e6)
        const id5 = uuid5()
        const tujuanEks5 = `Test Tujuan Eksternal Automation ${id5}`

        inputTujuan5.wait(5000)
            .type(tujuanEks5)
            .wait(3000)
            .type('{enter}')
    }

    validateTujuanSkenario6() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran internal eksternal regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type('Dra. Hj. I GUSTI AGUNG')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type('Ridwan Kamil')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type('UU Ruzhanul')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type('Tujuan Eksternal 1')
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type('Tujuan Eksternal 2')
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type('Tujuan Eksternal 3')
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario7NegatifTagScript() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("1 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type("2 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type("3 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type("4 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type("5 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type("6 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type("7 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario8NegatifHTMLScript() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("<blink>Hello World 1</blink>")
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type("<blink>Hello World 2</blink>")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type("<blink>Hello World 3</blink>")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type("<blink>Hello World 4</blink>")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type("<blink>Hello World 5</blink>")
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type("<blink>Hello World 6</blink>")
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type("<blink>Hello World 7</blink>")
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario9NegatifXSSScript() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario10NegatifWhitespace() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
            addMoreTujuanLampiran.click()
        }

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()


        cy.wait(3000)

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()

        cy.wait(3000)

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()

        cy.wait(3000)

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type("{shift}{enter}")
            .wait(3000)
            .blur()

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario5Prod() {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        for (let i = 1; i <= 5; i++) {
            const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
            addMoreTujuan.click()
        }

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type('SMOKE TEST DR. IKA MARDIAH')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type('SMOKE TEST RIZKI HUSTINIASARI')
            .wait(3000)
            .type('{enter}')

        cy.wait(3000)

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type('SMOKE TEST ZUHARIN INSANA')
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

    clickTambahTujuan() {
        const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
        addMoreTujuan.click()
    }

    inputTujuanSurat1(inputanTujuan1) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
        inputTujuan.wait(1000)
            .type(inputanTujuan1)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan0 = cy.get(kepala_surat.suggestInputTujuan0).as('suggestInputTujuan0')
                    suggestInputTujuan0.contains(inputanTujuan1, { timeout: 10000 }).should('be.visible')

                    inputTujuan.type('{enter}')
                }
            })
    }

    inputTujuanSurat2(inputanTujuan2) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type(inputanTujuan2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan1 = cy.get(kepala_surat.suggestInputTujuan1).as('suggestInputTujuan1')
                    suggestInputTujuan1.contains(inputanTujuan2, { timeout: 10000 }).should('be.visible')

                    inputTujuan2.type('{enter}')
                }
            })
    }

    inputTujuanSurat3(inputanTujuan3) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan3')
        inputTujuan3.wait(1000)
            .type(inputanTujuan3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan2 = cy.get(kepala_surat.suggestInputTujuan2).as('suggestInputTujuan2')
                    suggestInputTujuan2.contains(inputanTujuan3, { timeout: 10000 }).should('be.visible')

                    inputTujuan3.type('{enter}')
                }
            })
    }

    clickTambahTujuanLampiran() {
        const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
        addMoreTujuanLampiran.click()
    }

    inputTujuanLampiranSurat1(inputanTujuan1) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type(inputanTujuan1)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiran0 = cy.get(kepala_surat.suggestTujuanLampiran0).as('suggestTujuanLampiran0')
                    suggestTujuanLampiran0.contains(inputanTujuan1, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran0.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSurat2(inputanTujuan2) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type(inputanTujuan2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiran1 = cy.get(kepala_surat.suggestTujuanLampiran1).as('suggestTujuanLampiran1')
                    suggestTujuanLampiran1.contains(inputanTujuan2, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran1.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSurat3(inputanTujuan3) {
        cy.intercept('POST', 'https://office-service-v2.staging.digitalservice.id/graphql').as('checkResponse')

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type(inputanTujuan3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiran2 = cy.get(kepala_surat.suggestTujuanLampiran2).as('suggestTujuanLampiran2')
                    suggestTujuanLampiran2.contains(inputanTujuan3, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran2.type('{enter}')
                }
            })
    }

}