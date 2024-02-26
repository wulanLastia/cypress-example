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
}