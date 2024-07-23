import histori from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/histori"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class HistoriPage {

    goToHistori() {
        // Click Tab Histori
        const tab_histori = cy.get(histori.tab_histori).as('tab_histori')
        tab_histori.should('contain', 'Histori')
            .click()

        // Wait until page ready
        cy.wait(6000)
    }

    checkHistoryPenandatanganDiriSendiri() {
        cy.readFile(getPreviewData).then((object) => {
            // Assert Histori Konseptor
            const konseptorNameValue = object.konseptor[0].konseptor_name
            const konseptorPositionValue = object.konseptor[1].konseptor_position

            const card_konseptorName = cy.get(histori.card_konseptorName).as('card_konseptorName')
            card_konseptorName.should('contain', konseptorNameValue)

            const card_konseptorPosition = cy.get(histori.card_konseptorPosition).as('card_konseptorPosition')
            card_konseptorPosition.should('contain', konseptorPositionValue)

            // Assert Histori Penandatangan Diri Sendiri (Activity - background biru)
            const card_historiActivity00 = cy.get(histori.card_historiActivity00).as('card_historiActivity00')
            card_historiActivity00.should('contain', 'Membuat Draft')
                .and('have.class', 'card-activity rounded-lg p-3 gap-1 mt-2')

            // Assert Histori Penandatangan Diri Sendiri (Last activity - background kuning)
            const card_historiActivity10 = cy.get(histori.card_historiActivity10).as('card_historiActivity10')
            card_historiActivity10.should('contain', 'Menandatangani')
                .and('have.class', 'card-last-activity rounded-lg p-3 gap-1 mt-2')
        })
    }

    // Assert Histori Penandatangan di Kotak Keluar Konseptor (Belum Membaca)
    checkHistoriPenandatanganBefore() {
        cy.readFile(getPreviewData).then((object) => {
            // Assert Histori Penandatangan Atasan
            const penandatanganAtasanValue = object.penandatangan[1].penandatangan_atasan
            const arrAtasan = penandatanganAtasanValue.split('(')
            const arrPosition = arrAtasan[1].split(')')

            const card_penandatanganName0 = cy.get(histori.card_penandatanganName0).as('card_penandatanganName0')
            card_penandatanganName0.contains(arrAtasan[0], { matchCase: false })

            const card_penandatanganPosition0 = cy.get(histori.card_penandatanganPosition0).as('card_penandatanganPosition0')
            card_penandatanganPosition0.contains(arrPosition[0], { matchCase: false })

            const card_historiActivity01 = cy.get(histori.card_historiActivity01).as('card_historiActivity01')
            card_historiActivity01.should('contain', 'Belum Membaca')
                .and('have.class', 'card-temporary rounded-lg p-3 gap-1 mt-2')
        })
    }

    // Assert Histori Penandatangan di Kotak Masul Konseptor (Telah Membaca)
    checkHistoriPenandatanganAfter() {
        cy.readFile(getPreviewData).then((object) => {
            // Assert Histori Penandatangan Atasan
            const penandatanganAtasanValue = object.penandatangan[1].penandatangan_atasan
            const arrAtasan = penandatanganAtasanValue.split('(')
            const arrPosition = arrAtasan[1].split(')')

            const card_penandatanganName0 = cy.get(histori.card_penandatanganName0).as('card_penandatanganName0')
            card_penandatanganName0.contains(arrAtasan[0], { matchCase: false })

            const card_penandatanganPosition0 = cy.get(histori.card_penandatanganPosition0).as('card_penandatanganPosition0')
            card_penandatanganPosition0.contains(arrPosition[0], { matchCase: false })

            const card_historiActivity01 = cy.get(histori.card_historiActivity01).as('card_historiActivity01')
            card_historiActivity01.should('contain', 'Telah Membaca')
                .and('have.class', 'card-temporary rounded-lg p-3 gap-1 mt-2')
        })
    }

    // Assert Histori Penandatangan di Kotak Keluar Setelah Mengembalikan Naskah
    checkHistoryPenandatanganKembalikan() {
        cy.readFile(getPreviewData).then((object) => {
            // Assert Histori Penandatangan Atasan
            const penandatanganAtasanValue = object.penandatangan[1].penandatangan_atasan
            const arrAtasan = penandatanganAtasanValue.split('(')
            const arrPosition = arrAtasan[1].split(')')

            const card_penandatanganName0 = cy.get(histori.card_penandatanganName0).as('card_penandatanganName0')
            card_penandatanganName0.contains(arrAtasan[0], { matchCase: false })

            const card_penandatanganPosition0 = cy.get(histori.card_penandatanganPosition0).as('card_penandatanganPosition0')
            card_penandatanganPosition0.contains(arrPosition[0], { matchCase: false })

            const card_historiActivity01 = cy.get(histori.card_historiActivity01).as('card_historiActivity01')
            card_historiActivity01.should('contain', 'Mengembalikan Naskah')
                .and('have.class', 'card-last-activity rounded-lg p-3 gap-1 mt-2')
        })
    }

    // Assert Histori Konseptor di Kotak Keluar Penandatangan Status Dikembalikan (Belum Membaca)
    checkHistoriKonseptorBefore() {
        cy.readFile(getPreviewData).then((object) => {
            // Assert Histori Konseptor
            const konseptorNameValue = object.konseptor[0].konseptor_name
            const konseptorPositionValue = object.konseptor[1].konseptor_position

            const card_konseptorName = cy.get(histori.card_konseptorName).as('card_konseptorName')
            card_konseptorName.should('contain', konseptorNameValue)

            const card_konseptorPosition = cy.get(histori.card_konseptorPosition).as('card_konseptorPosition')
            card_konseptorPosition.should('contain', konseptorPositionValue)

            // Assert Histori Konseptor (Activity - background biru)
            const card_historiActivity00 = cy.get(histori.card_historiActivity00).as('card_historiActivity00')
            card_historiActivity00.should('contain', 'Membuat Draft')
                .and('have.class', 'card-activity rounded-lg p-3 gap-1 mt-2')

            // Assert Histori Konseptor (Activity - background biru)
            const card_historiActivity10 = cy.get(histori.card_historiActivity10).as('card_historiActivity10')
            card_historiActivity10.should('contain', 'Menandatangani')
                .and('have.class', 'card-activity rounded-lg p-3 gap-1 mt-2')

            // Assert Histori Konseptor (Last temporary - background abu)
            const card_historiActivity20 = cy.get(histori.card_historiActivity20).as('card_historiActivity20')
            card_historiActivity20.should('contain', 'Belum Membaca')
                .and('have.class', 'card-temporary rounded-lg p-3 gap-1 mt-2')
        })
    }

    // Assert Histori Konseptor di Kotak Masuk Konseptor Status Dikembalikan (Telah Membaca)
    checkHistoriKonseptorAfter() {
        cy.readFile(getPreviewData).then((object) => {
            // Assert Histori Konseptor
            const konseptorNameValue = object.konseptor[0].konseptor_name
            const konseptorPositionValue = object.konseptor[1].konseptor_position

            const card_konseptorName = cy.get(histori.card_konseptorName).as('card_konseptorName')
            card_konseptorName.should('contain', konseptorNameValue)

            const card_konseptorPosition = cy.get(histori.card_konseptorPosition).as('card_konseptorPosition')
            card_konseptorPosition.should('contain', konseptorPositionValue)

            // Assert Histori Konseptor (Activity - background biru)
            const card_historiActivity00 = cy.get(histori.card_historiActivity00).as('card_historiActivity00')
            card_historiActivity00.should('contain', 'Membuat Draft')
                .and('have.class', 'card-activity rounded-lg p-3 gap-1 mt-2')

            // Assert Histori Konseptor (Activity - background biru)
            const card_historiActivity10 = cy.get(histori.card_historiActivity10).as('card_historiActivity10')
            card_historiActivity10.should('contain', 'Menandatangani')
                .and('have.class', 'card-activity rounded-lg p-3 gap-1 mt-2')

            // Assert Histori Konseptor (Last temporary - background abu)
            const card_historiActivity20 = cy.get(histori.card_historiActivity20).as('card_historiActivity20')
            card_historiActivity20.should('contain', 'Telah Membaca')
                .and('have.class', 'card-temporary rounded-lg p-3 gap-1 mt-2')
        })
    }
}