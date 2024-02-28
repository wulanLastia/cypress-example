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

        if (tujuanKe === '0') {
            if (inputTujuan) {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                                select_inputTujuanSuggest0.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan0.type('{enter}')
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan0.type('{enter}')
                            }
                        })
                }
            } else {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
            }
        } else if (tujuanKe === '1') {
            if (inputTujuan) {
                const select_inputTujuan1 = cy.get(tab_registrasi.select_inputTujuan1).as('select_inputTujuan1')
                select_inputTujuan1.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest1 = cy.get(tab_registrasi.select_inputTujuanSuggest1).as('select_inputTujuanSuggest1')
                                select_inputTujuanSuggest1.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan1.type('{enter}')
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan1.type('{enter}')
                            }
                        })
                }
            } else {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
            }
        } else if (tujuanKe === '2') {
            if (inputTujuan) {
                const select_inputTujuan2 = cy.get(tab_registrasi.select_inputTujuan2).as('select_inputTujuan2')
                select_inputTujuan2.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest2 = cy.get(tab_registrasi.select_inputTujuanSuggest2).as('select_inputTujuanSuggest2')
                                select_inputTujuanSuggest2.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan2.type('{enter}')
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan2.type('{enter}')
                            }
                        })
                }
            } else {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
            }
        } else if (tujuanKe === '3') {
            if (inputTujuan) {
                const select_inputTujuan3 = cy.get(tab_registrasi.select_inputTujuan3).as('select_inputTujuan3')
                select_inputTujuan3.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest3 = cy.get(tab_registrasi.select_inputTujuanSuggest3).as('select_inputTujuanSuggest3')
                                select_inputTujuanSuggest3.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan3.type('{enter}')
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan3.type('{enter}')
                            }
                        })
                }
            } else {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
            }
        } else if (tujuanKe === '4') {
            if (inputTujuan) {
                const select_inputTujuan4 = cy.get(tab_registrasi.select_inputTujuan4).as('select_inputTujuan4')
                select_inputTujuan4.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest4 = cy.get(tab_registrasi.select_inputTujuanSuggest4).as('select_inputTujuanSuggest4')
                                select_inputTujuanSuggest4.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan4.type('{enter}')
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan4.type('{enter}')
                            }
                        })
                }
            } else {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
            }
        } else if (tujuanKe === '5') {
            if (inputTujuan) {
                const select_inputTujuan5 = cy.get(tab_registrasi.select_inputTujuan5).as('select_inputTujuan5')
                select_inputTujuan5.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest5 = cy.get(tab_registrasi.select_inputTujuanSuggest5).as('select_inputTujuanSuggest5')
                                select_inputTujuanSuggest5.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan5.type('{enter}')
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')

                                select_inputTujuan5.type('{enter}')
                            }
                        })
                }
            } else {
                const select_inputTujuan0 = cy.get(tab_registrasi.select_inputTujuan0).as('select_inputTujuan0')
                select_inputTujuan0.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
            }
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
}