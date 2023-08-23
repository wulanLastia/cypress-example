import setujui from "../../../selectors/sidebar/kotak_masuk/setujui"
import koreksi from "../../../selectors/sidebar/kotak_masuk/koreksi"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

const perihalNaskah = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

// const koreksiPage = new koreksi()
export class SetujuiPage {

    suratBelumDireview() {
        menuPage.goToKotakMasukReviewNaskah()
        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            const tableReviewSurat = cy.xpath(setujui.tableReviewSurat).as('tableReviewSurat')
            tableReviewSurat.contains('td', titlePerihalNaskah)
                .click()
        })
    }

    setujui() {
        const btnSetujui = cy.get(setujui.btnSetujui).as('btnSetujui')
        btnSetujui.should('contain', 'Setujui')
            .click()

        const popUpSetujui = cy.get(setujui.popUpSetujui).as('popUpSetujui')
        popUpSetujui.should('be.visible')

        const btnKirimNaskah = cy.xpath(setujui.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    doTandaTanganiSurat(passphrase) {
        cy.wait(10000)
        const TandaTanganiNaskah = cy.xpath(koreksi.btnTandaTanganiDraftSurat).as('TandaTanganiNaskah')
        TandaTanganiNaskah.click({force: true})
        cy.wait(3000)

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')
        cy.wait(3000)

        const inputPassphrase = cy.xpath(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.xpath(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }
}