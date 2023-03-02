import navbar from "../../selectors/navbar"
import menu from "../../selectors/sidebar/menu"
import konsep_naskah from "../../selectors/sidebar/konsep_naskah"

export class KonsepNaskahPage {

    checkContainer() {
        const konsepNaskahMenu = cy.xpath(konsep_naskah.konsepNaskahMenu)
        
        konsepNaskahMenu.should('contain','Konsep Naskah')
        konsepNaskahMenu.click()

        const titleKonsepNaskah = cy.xpath(konsep_naskah.titleKonsepNaskah)
        titleKonsepNaskah.should('contain','Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(konsep_naskah.subTitleKonsepNaskah)
        subTitleKonsepNaskah.should('contain','TEMPLATE NASKAH')
            .and('be.visible')

        const titleNaskahKeluar = cy.xpath(konsep_naskah.titleNaskahKeluar)
        titleNaskahKeluar.should('contain','Naskah Keluar')
            .and('be.visible')

        const header = cy.xpath(navbar.header)
        header.should('be.visible')

        const parentKotakMasuk = cy.xpath(menu.parentKotakMasuk)
        parentKotakMasuk.click()

        const reviewNaskahKM = cy.xpath(menu.reviewNaskahKM)
        reviewNaskahKM.should('contain','Review Naskah')
            .and('be.visible')
            .click()
    }

}