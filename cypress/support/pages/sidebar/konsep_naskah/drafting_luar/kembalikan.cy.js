import kembalikan from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/kembalikan"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class KembalikanPage {

    checkPopupKembalikanNaskah() {
        // Click btn kembalikan naskah
        const btn_kembalikanNavbar = cy.get(kembalikan.btn_kembalikanNavbar).as('btn_kembalikanNavbar')
        btn_kembalikanNavbar.should('contain', 'Kembalikan')
            .click()
            .wait(3000)

        // Assertion
        const dialog_popupKembalikan = cy.get(kembalikan.dialog_popupKembalikan).as('dialog_popupKembalikan')
        dialog_popupKembalikan.should('be.visible')
    }

    checkBtnKembalikan() {
        // Check btn confirm kembalikan naskah
        const btn_confirmKembalikanNaskah = cy.get(kembalikan.btn_confirmKembalikanNaskah).as('btn_confirmKembalikanNaskah')
        btn_confirmKembalikanNaskah.should('be.disabled')   
    }

    inputPoinPerbaikan(inputPerbaikanStatus, inputPerbaikan, assertInputPerbaikan) {
        // Check status perbaikan
        if(inputPerbaikanStatus === 'negatif'){
            // Input perbaikan
            const input_perbaikan = cy.get(kembalikan.input_perbaikan).as('input_perbaikan')
            input_perbaikan.clear()
                .type(inputPerbaikan)
                .should('have.value', assertInputPerbaikan)
        } else {
            // Input perbaikan
            const input_perbaikan = cy.get(kembalikan.input_perbaikan).as('input_perbaikan')
            input_perbaikan.clear()
                .type(inputPerbaikan)
                .should('have.value', inputPerbaikan)
        }
    }

    batalKembalikan() {
        // Click btn batal perbaikan
        const btn_batalKembalikanNaskah = cy.get(kembalikan.btn_batalKembalikanNaskah).as('btn_batalKembalikanNaskah')
        btn_batalKembalikanNaskah.scrollIntoView()
                .click()

        // Assertion
        const label_reviewNaskah = cy.get(kembalikan.label_reviewNaskah).as('label_reviewNaskah')
        label_reviewNaskah.should('contain', 'Review Naskah')
            .and('be.visible')
    }

    inputPerbaikanPerihal() {
        // Check checkbox perihal
        const cb_inputPerihal = cy.get(kembalikan.cb_inputPerihal).as('cb_inputPerihal')
        cb_inputPerihal.scrollIntoView()
                .check()

        // Assertion
        const label_inputPerihal = cy.get(kembalikan.label_inputPerihal).as('label_inputPerihal')
        label_inputPerihal.should('contain', 'Perihal')
            .and('be.visible')

        const cb_inputPerihalChecked = cy.get(kembalikan.cb_inputPerihal).as('cb_inputPerihalChecked')
        cb_inputPerihalChecked.should('be.checked')
    }

    inputPerbaikanIsiNaskah() {
        // Check checkbox isi naskah
        const cb_inputIsiNaskah = cy.get(kembalikan.cb_inputIsiNaskah).as('cb_inputIsiNaskah')
        cb_inputIsiNaskah.scrollIntoView()
                .check()

        // Assertion
        const label_inputIsiNaskah = cy.get(kembalikan.label_inputIsiNaskah).as('label_inputIsiNaskah')
        label_inputIsiNaskah.should('contain', 'Isi naskah')
            .and('be.visible')

        const cb_inputIsiNaskahChecked = cy.get(kembalikan.cb_inputIsiNaskah).as('cb_inputIsiNaskahChecked')
        cb_inputIsiNaskahChecked.should('be.checked')
    }

    inputPerbaikanLampiran() {
        // Check checkbox lampiran
        const cb_inputLampiran = cy.get(kembalikan.cb_inputLampiran).as('cb_inputLampiran')
        cb_inputLampiran.scrollIntoView()
                .check()

        // Assertion
        const label_inputLampiran = cy.get(kembalikan.label_inputLampiran).as('label_inputLampiran')
        label_inputLampiran.should('contain', 'Lampiran')
            .and('be.visible')

        const cb_inputLampiranChecked = cy.get(kembalikan.cb_inputLampiran).as('cb_inputLampiranChecked')
        cb_inputLampiranChecked.should('be.checked')
    }

    inputPerbaikanTujuanNaskah() {
        // Check checkbox tujuan naskah
        const cb_inputTujuanNaskah = cy.get(kembalikan.cb_inputTujuanNaskah).as('cb_inputTujuanNaskah')
        cb_inputTujuanNaskah.scrollIntoView()
                .check()

        // Assertion
        const label_inputTujuanNaskah = cy.get(kembalikan.label_inputTujuanNaskah).as('label_inputTujuanNaskah')
        label_inputTujuanNaskah.should('contain', 'Tujuan naskah')
            .and('be.visible')

        const cb_inputTujuanNaskahChecked = cy.get(kembalikan.cb_inputTujuanNaskah).as('cb_inputTujuanNaskahChecked')
        cb_inputTujuanNaskahChecked.should('be.checked')
    }

    inputPerbaikanAlamatNaskah() {
        // Check checkbox alamat naskah
        const cb_inputAlamatNaskah = cy.get(kembalikan.cb_inputAlamatNaskah).as('cb_inputAlamatNaskah')
        cb_inputAlamatNaskah.scrollIntoView()
                .check()

        // Assertion
        const label_inputAlamatNaskah = cy.get(kembalikan.label_inputAlamatNaskah).as('label_inputAlamatNaskah')
        label_inputAlamatNaskah.should('contain', 'Alamat naskah')
            .and('be.visible')

        const cb_inputAlamatNaskahChecked = cy.get(kembalikan.cb_inputAlamatNaskah).as('cb_inputAlamatNaskahChecked')
        cb_inputAlamatNaskahChecked.should('be.checked')
    }

    inputPerbaikanTembusan() {
        // Check checkbox tembusan
        const cb_inputTembusan = cy.get(kembalikan.cb_inputTembusan).as('cb_inputTembusan')
        cb_inputTembusan.scrollIntoView()
                .check()

        // Assertion
        const label_inputTembusan = cy.get(kembalikan.label_inputTembusan).as('label_inputTembusan')
        label_inputTembusan.should('contain', 'Tembusan')
            .and('be.visible')

        const cb_inputTembusanChecked = cy.get(kembalikan.cb_inputTembusan).as('cb_inputTembusanChecked')
        cb_inputTembusanChecked.should('be.checked')
    }

    inputPerbaikanUrgensiNaskah() {
        // Check checkbox urgensi naskah
        const cb_inputUrgensiNaskah = cy.get(kembalikan.cb_inputUrgensiNaskah).as('cb_inputUrgensiNaskah')
        cb_inputUrgensiNaskah.scrollIntoView()
                .check()

        // Assertion
        const label_inputUrgensiNaskah = cy.get(kembalikan.label_inputUrgensiNaskah).as('label_inputUrgensiNaskah')
        label_inputUrgensiNaskah.should('contain', 'Urgensi naskah')
            .and('be.visible')

        const cb_inputUrgensiNaskahChecked = cy.get(kembalikan.cb_inputUrgensiNaskah).as('cb_inputUrgensiNaskahChecked')
        cb_inputUrgensiNaskahChecked.should('be.checked')
    }

    inputPerbaikanSifatNaskah() {
        // Check checkbox sifat naskah
        const cb_inputSifatNaskah = cy.get(kembalikan.cb_inputSifatNaskah).as('cb_inputSifatNaskah')
        cb_inputSifatNaskah.scrollIntoView()
                .check()

        // Assertion
        const label_inputSifatNaskah = cy.get(kembalikan.label_inputSifatNaskah).as('label_inputSifatNaskah')
        label_inputSifatNaskah.should('contain', 'Sifat naskah')
            .and('be.visible')

        const cb_inputSifatNaskahChecked = cy.get(kembalikan.cb_inputSifatNaskah).as('cb_inputSifatNaskahChecked')
        cb_inputSifatNaskahChecked.should('be.checked')
    }

    inputPerbaikanKodeKlasifikasi() {
        // Check checkbox kode kasifikasi
        const cb_inputKodeKlasifikasi = cy.get(kembalikan.cb_inputKodeKlasifikasi).as('cb_inputKodeKlasifikasi')
        cb_inputKodeKlasifikasi.scrollIntoView()
                .check()

        // Assertion
        const label_inputKodeKlasifikasi = cy.get(kembalikan.label_inputKodeKlasifikasi).as('label_inputKodeKlasifikasi')
        label_inputKodeKlasifikasi.should('contain', 'Kode klasifikasi')
            .and('be.visible')

        const cb_inputKodeKlasifikasiChecked = cy.get(kembalikan.cb_inputKodeKlasifikasi).as('cb_inputKodeKlasifikasiChecked')
        cb_inputKodeKlasifikasiChecked.should('be.checked')
    }

    confirmKembalikanNaskah() {
        // Click btn confirm kembalikan naskah
        const btn_confirmKembalikanNaskah = cy.get(kembalikan.btn_confirmKembalikanNaskah).as('btn_confirmKembalikanNaskah')
        btn_confirmKembalikanNaskah.scrollIntoView()
            .should('contain', 'Kembalikan')
            .click()
    }

    uncheckPerbaikan() {
        // Check checkbox kode kasifikasi
        const cb_inputKodeKlasifikasi = cy.get(kembalikan.cb_inputKodeKlasifikasi).as('cb_inputKodeKlasifikasi')
        cb_inputKodeKlasifikasi.scrollIntoView()
                .uncheck()
    }
}