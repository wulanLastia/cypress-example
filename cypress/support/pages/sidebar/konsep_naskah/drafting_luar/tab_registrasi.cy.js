import tab_registrasi from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/tab_registrasi"

export class TabRegistrasiPage {

    // BANK NOMOR //
    clickTabRegistrasi() {
        const btn_uploadFileTabRegistrasi = cy.get(tab_registrasi.btn_uploadFileTabRegistrasi).as('btn_uploadFileTabRegistrasi')
        btn_uploadFileTabRegistrasi.should('contain', 'Registrasi')
            .click()
    }

    checkFieldNomorUrut(bank_nomor) {

        if (bank_nomor === 'none') {
            const input_bankNomorNomorUrut = cy.get(tab_registrasi.input_bankNomorNomorUrut).as('input_bankNomorNomorUrut')
            input_bankNomorNomorUrut.find('input')
                .should('be.visible')
                .and('be.disabled')
        } else {
            // Input Bank Nomor
            const select_bankNomor = cy.get(tab_registrasi.select_bankNomor).first().as('select_bankNomor')
            select_bankNomor.should('be.visible')
                .click()

            const select_bankNomorlainnya = cy.get(tab_registrasi.select_bankNomorlainnya).as('select_bankNomorlainnya')
            select_bankNomorlainnya.should('be.visible')
                .click()

            // Input Nomor Urut
            const input_bankNomorNomorUrut = cy.get(tab_registrasi.input_bankNomorNomorUrut).as('input_bankNomorNomorUrut')
            input_bankNomorNomorUrut.should('have.attr', 'type', 'number')
                .and('be.visible')
        }
    }

    inputNomorUrut() {
        // Input Bank Nomor
        const select_bankNomor = cy.get(tab_registrasi.select_bankNomor).first().as('select_bankNomor')
        select_bankNomor.scrollIntoView()
            .should('be.visible')
            .click()

        const select_bankNomorUKDispusipda = cy.get(tab_registrasi.select_bankNomorUKDispusipda).as('select_bankNomorUKDispusipda')
        select_bankNomorUKDispusipda.should('be.visible')
            .click()

        // Input Nomor Urut
        const select_inputNomorUrut = cy.get(tab_registrasi.select_inputNomorUrut).first().as('select_inputNomorUrut')
        select_inputNomorUrut.should('be.visible')
            .click()

        const select_inputNomorUrut0 = cy.get(tab_registrasi.select_inputNomorUrut0).as('select_inputNomorUrut0')
        select_inputNomorUrut0.should('be.visible')
            .click()
    }

    checkBtnSubmit() {
        const btn_submitFormRegistrasi = cy.get(tab_registrasi.btn_submitFormRegistrasi).as('btn_submitFormRegistrasi')
        btn_submitFormRegistrasi.should('be.visible')
            .and('be.disabled')
    }

    searchKodeKlasifikasi(inputanKodeKlasifikasi) {
        const label_kodeKlasifikasi = cy.get(tab_registrasi.label_kodeKlasifikasi).as('label_kodeKlasifikasi')
        label_kodeKlasifikasi.should('contain', 'Kode klasifikasi')

        const select_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).first().as('select_inputKodeKlasifikasi')
        select_inputKodeKlasifikasi.click()
            .wait(3000)
            .type(inputanKodeKlasifikasi)
            .wait(3000)
            .type('{enter}')
    }

    batalKodeKlasifikasi() {
        const select_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).first().as('select_inputKodeKlasifikasi')
        select_inputKodeKlasifikasi.find('button')
            .should('have.attr', 'title', 'Clear Selected')
            .click()
    }

    checkKodeKlasifikasi(inputanKodeKlasifikasi) {
        // Assertion pemilihan kode klasifikasi
        const select_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).first().as('select_inputKodeKlasifikasi')
        select_inputKodeKlasifikasi.find('span')
            .should('contain', inputanKodeKlasifikasi)
    }

    inputUnitPengolah(inputUnitPengolah, assertionUnitPengolah) {
        const label_unitPengolah = cy.get(tab_registrasi.label_unitPengolah).as('label_unitPengolah')
        label_unitPengolah.should('contain', 'Unit pengolah')

        // Input unit pengolah
        const input_unitPengolah = cy.get(tab_registrasi.input_unitPengolah).first().as('input_unitPengolah')
        input_unitPengolah.clear()
            .type(inputUnitPengolah)

        // Assertion input unit pengolah
        const assert_unitPengolah = cy.get(tab_registrasi.input_unitPengolah).first().as('assert_unitPengolah')
        assert_unitPengolah.invoke('val')
            .then((val) => {
                expect(val).to.deep.equal(assertionUnitPengolah);
            })
    }

    // TUJUAN SURAT //
    activateToggleDistribusi() {
        const check_toggleDistribusi = cy.get(tab_registrasi.check_toggleDistribusi).as('check_toggleDistribusi')
        check_toggleDistribusi.click({ force: true })
    }

    inputTujuan(inputEnv, tujuanKe, tujuanInternalEksternal, inputTujuan) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        if (inputTujuan) {
            const select_inputTujuan = cy.get(tab_registrasi.select_inputTujuan + tujuanKe + '"').as('select_inputTujuan')
            select_inputTujuan.click()
                .wait(1000)
                .type(inputTujuan)

            if (tujuanInternalEksternal === 'internal') {
                cy.wait('@postRequest', { timeout: 5000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                            select_inputTujuanSuggest0.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                            select_inputTujuan.type('{enter}')
                        }
                    })
            } else {
                cy.wait('@postRequest', { timeout: 5000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                            input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                            select_inputTujuan.type('{enter}')
                        }
                    })
            }
        } else {
            const select_inputTujuan = cy.get(tab_registrasi.select_inputTujuan + tujuanKe + '"').as('select_inputTujuan')
            select_inputTujuan.click()

            const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
            select_inputTujuanSuggest0.wait(3000)
                .click()
        }
    }

    deleteTujuan() {
        const select_inputTujuanWrapper = cy.get(tab_registrasi.select_inputTujuanWrapper).as('select_inputTujuanWrapper')
        select_inputTujuanWrapper.find('button')
            .should('have.attr', 'title', 'Clear Selected')
            .click()
    }

    addMoreTujuan() {
        const btn_addMoreTujuan = cy.get(tab_registrasi.btn_addMoreTujuan).as('btn_addMoreTujuan')
        btn_addMoreTujuan.should('contain', 'Tambah Penerima')
            .click()
    }

    inputTembusan(inputEnv, tembusanKe, tujuanInternalEksternal, inputTembusan) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        if (inputTembusan) {
            const select_inputTembusan = cy.get(tab_registrasi.select_inputTembusan + tembusanKe + '"').as('select_inputTembusan')
            select_inputTembusan.click()
                .wait(1000)
                .type(inputTembusan)

            if (tujuanInternalEksternal === 'internal') {
                cy.wait('@postRequest', { timeout: 5000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const select_inputTembusanSuggest0 = cy.get(tab_registrasi.select_inputTembusanSuggest0).as('select_inputTembusanSuggest0')
                            select_inputTembusanSuggest0.contains(inputTembusan, { timeout: 10000 }).should('be.visible')

                            select_inputTembusan.type('{enter}')
                        }
                    })
            } else {
                cy.wait('@postRequest', { timeout: 5000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const input_inputTembusanEksternalSuggest = cy.get(tab_registrasi.input_inputTembusanEksternalSuggest).as('input_inputTembusanEksternalSuggest')
                            input_inputTembusanEksternalSuggest.contains(inputTembusan, { timeout: 10000 }).should('be.visible')

                            select_inputTembusan.type('{enter}')
                        }
                    })
            }
        } else {
            const select_inputTembusan = cy.get(tab_registrasi.select_inputTembusan + tembusanKe + '"').as('select_inputTembusan')
            select_inputTembusan.click()

            const select_inputTembusanSuggest0 = cy.get(tab_registrasi.select_inputTembusanSuggest0).as('select_inputTembusanSuggest0')
            select_inputTembusanSuggest0.wait(3000)
                .click()
        }
    }

    addMoreTembusan() {
        const btn_addMoreTembusan = cy.get(tab_registrasi.btn_addMoreTembusan).as('btn_addMoreTembusan')
        btn_addMoreTembusan.should('contain', 'Tambah Tembusan')
            .click()
    }

    deleteTembusan() {
        const btn_deleteTembusan1 = cy.get(tab_registrasi.btn_deleteTembusan1).as('btn_deleteTembusan1')
        btn_deleteTembusan1.parent().click()
    }

    inputPerihal(inputPerihal, assertionPerihal) {
        const label_perihal = cy.get(tab_registrasi.label_perihal).as('label_perihal')
        label_perihal.should('contain', 'Perihal')

        // Input perihal
        const input_perihal = cy.get(tab_registrasi.input_perihal).as('input_perihal')
        input_perihal.clear()
            .type(inputPerihal)

        // Assertion input unit pengolah
        const assert_perihal = cy.get(tab_registrasi.input_perihal).as('assert_perihal')
        assert_perihal.invoke('val')
            .then((val) => {
                expect(val).to.deep.equal(assertionPerihal);
            })
    }

    checkWarnaLabelUrgensi(inputanUrgensi, index) {
        // Label
        const label_urgensi = cy.get(tab_registrasi.label_urgensi).as('label_urgensi')
        label_urgensi.should('contain', 'Urgensi')

        // Input Urgensi
        const select_urgensi = cy.get(tab_registrasi.select_urgensi).first().as('select_urgensi')
        select_urgensi.click()

        const select_urgensiOption = cy.get(tab_registrasi.select_urgensiOption + index + '"').as('select_urgensiOption')
        select_urgensiOption.click()

        // Assertion warna
        if (inputanUrgensi === 'Amat Segera') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#FFEBEE]')
        } else if (inputanUrgensi === 'Biasa') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#E6F6EC]')
        } else if (inputanUrgensi === 'Penting') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#E3F2FD]')
        } else {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#FFF9E1]')
        }
    }

    inputSifat(indexSurat) {
        // Label
        const label_sifatSurat = cy.get(tab_registrasi.label_sifatSurat).as('label_sifatSurat')
        label_sifatSurat.should('contain', 'Sifat Surat')

        // Input Urgensi
        const select_sifatSurat = cy.get(tab_registrasi.select_sifatSurat).first().as('select_sifatSurat')
        select_sifatSurat.click()

        const select_sifatSuratOption = cy.get(tab_registrasi.select_sifatSuratOption + indexSurat + '"').as('select_sifatSuratOption')
        select_sifatSuratOption.click()
    }
}