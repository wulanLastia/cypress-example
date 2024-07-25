import perbaiki from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/perbaiki"


const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class PerbaikiPage {

    checkPoinPerbaikan() {
        cy.readFile(getPreviewData).then((object) => {
            // Assertion Poin Perbaikan
            const poinPerbaikanValue = object.perbaikan[0].poin_perbaikan

            const label_notePerbaikanTitle = cy.get(perbaiki.label_notePerbaikanTitle).as('label_notePerbaikanTitle')
            label_notePerbaikanTitle.should('contain', 'Poin Perbaikan')

            const label_notePerbaikanDescription = cy.get(perbaiki.label_notePerbaikanDescription).as('label_notePerbaikanDescription')
            label_notePerbaikanDescription.should('contain', poinPerbaikanValue)
        })
    }

    checkDataPemeriksa() {
        cy.readFile(getPreviewData).then((object) => {
            // Assertion Nama dan Jabatan Pemeriksa
            const pemeriksaNameValue = object.perbaikan[1].pemeriksa_name
            const pemeriksaPositionValue = object.perbaikan[2].pemeriksa_position

            const label_pemeriksaName = cy.get(perbaiki.label_pemeriksaName).as('label_pemeriksaName')
            label_pemeriksaName.contains(pemeriksaNameValue, { matchCase: false })

            const label_pemeriksaPosition = cy.get(perbaiki.label_pemeriksaPosition).as('label_pemeriksaPosition')
            label_pemeriksaPosition.contains(pemeriksaPositionValue, { matchCase: false })
        })
    }

    // Asumsi user menceklis semua checkbox poin perbaikan surat
    checkInputPerbaikanPerihal() {
        // Assertion perbaikan perihal
        const cb_inputPerihal = cy.get(perbaiki.cb_inputPerihal).as('cb_inputPerihal')
        cb_inputPerihal.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputPerihal = cy.get(perbaiki.label_inputPerihal).as('label_inputPerihal')
        label_inputPerihal.should('contain', 'Perihal')    
    }

    checkInputPerbaikanIsiNaskah() {
        // Assertion perbaikan isi naskah
        const cb_inputIsiNaskah = cy.get(perbaiki.cb_inputIsiNaskah).as('cb_inputIsiNaskah')
        cb_inputIsiNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputIsiNaskah = cy.get(perbaiki.label_inputIsiNaskah).as('label_inputIsiNaskah')
        label_inputIsiNaskah.should('contain', 'Isi naskah')    
    }

    checkInputPerbaikanLampiran() {
        // Assertion perbaikan lampiran
        const cb_inputLampiran = cy.get(perbaiki.cb_inputLampiran).as('cb_inputLampiran')
        cb_inputLampiran.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputLampiran = cy.get(perbaiki.label_inputLampiran).as('label_inputLampiran')
        label_inputLampiran.should('contain', 'Lampiran')    
    }

    checkInputPerbaikanTujuan() {
        // Assertion perbaikan tujuan naskah
        const cb_inputTujuanNaskah = cy.get(perbaiki.cb_inputTujuanNaskah).as('cb_inputTujuanNaskah')
        cb_inputTujuanNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputTujuanNaskah = cy.get(perbaiki.label_inputTujuanNaskah).as('label_inputTujuanNaskah')
        label_inputTujuanNaskah.should('contain', 'Tujuan naskah')    
    }

    checkInputPerbaikanAlamatNaskah() {
        // Assertion perbaikan alamat naskah
        const cb_inputAlamatNaskah = cy.get(perbaiki.cb_inputAlamatNaskah).as('cb_inputAlamatNaskah')
        cb_inputAlamatNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputAlamatNaskah = cy.get(perbaiki.label_inputAlamatNaskah).as('label_inputAlamatNaskah')
        label_inputAlamatNaskah.should('contain', 'Alamat naskah')   
    }

    checkInputPerbaikanTembusan() {
        // Assertion perbaikan tembusan
        const cb_inputTembusan = cy.get(perbaiki.cb_inputTembusan).as('cb_inputTembusan')
        cb_inputTembusan.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputTembusan = cy.get(perbaiki.label_inputTembusan).as('label_inputTembusan')
        label_inputTembusan.should('contain', 'Tembusan')   
    }

    checkInputPerbaikanUrgensi() {
        // Assertion perbaikan urgensi
        const cb_inputUrgensiNaskah = cy.get(perbaiki.cb_inputUrgensiNaskah).as('cb_inputUrgensiNaskah')
        cb_inputUrgensiNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputUrgensiNaskah = cy.get(perbaiki.label_inputUrgensiNaskah).as('label_inputUrgensiNaskah')
        label_inputUrgensiNaskah.should('contain', 'Urgensi naskah')   
    }

    checkInputPerbaikanSifatNaskah() {
        // Assertion perbaikan sifat naskah
        const cb_inputSifatNaskah = cy.get(perbaiki.cb_inputSifatNaskah).as('cb_inputSifatNaskah')
        cb_inputSifatNaskah.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputSifatNaskah = cy.get(perbaiki.label_inputSifatNaskah).as('label_inputSifatNaskah')
        label_inputSifatNaskah.should('contain', 'Sifat naskah')   
    }

    checkInputPerbaikanKodeKlasifikasi() {
        // Assertion perbaikan kode klasifikasi
        const cb_inputKodeKlasifikasi = cy.get(perbaiki.cb_inputKodeKlasifikasi).as('cb_inputKodeKlasifikasi')
        cb_inputKodeKlasifikasi.should('have.class', 'p-[1px] rounded-md bg-gray-200')

        const label_inputKodeKlasifikasi = cy.get(perbaiki.label_inputKodeKlasifikasi).as('label_inputKodeKlasifikasi')
        label_inputKodeKlasifikasi.should('contain', 'Kode klasifikasi')   
    }
}