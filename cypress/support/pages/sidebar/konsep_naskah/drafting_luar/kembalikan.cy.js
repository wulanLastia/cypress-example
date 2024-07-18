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

    inputPerbaikan(inputPerbaikanStatus, inputPerbaikan, assertInputPerbaikan) {
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
}