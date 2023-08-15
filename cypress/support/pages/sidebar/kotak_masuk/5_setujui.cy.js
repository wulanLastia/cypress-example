import setujui from "../../../selectors/sidebar/kotak_masuk/setujui"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

const perihalNaskah = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

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
}