import navbar from "@selectors/navbar"
import konsep_naskah from "@selectors/sidebar/konsep_naskah/konsep_naskah"
import { MenuPage } from "../../menu/menu.cy"

const menuPage = new MenuPage()

export class KonsepNaskahPage {

    checkContainer() {
        menuPage.goToKonsepNaskah()

        const titleNaskahKeluar = cy.get(konsep_naskah.titleNaskahKeluar).as('titleNaskahKeluar')
        titleNaskahKeluar.should('contain', 'Naskah Keluar')
            .and('be.visible')

        const header = cy.xpath(navbar.header).as('header')
        header.should('be.visible')
    }

    checkDetailContainerKonsepNaskah() {
        this.checkContainer()

        menuPage.goToKotakMasukReviewNaskah()
    }

    checkDetailContainerNaskahKeluar() {
        menuPage.goToKonsepNaskahKeluar()

        this.checkContainer()

        const tableNaskahKeluar = cy.get(konsep_naskah.tableNaskahKeluar).as('tableNaskahKeluar')
        tableNaskahKeluar.should('be.visible')

        const kolomStatus = cy.get(konsep_naskah.kolomStatus).as('kolomStatus')
        kolomStatus.should('contain', 'Status')
            .and('be.visible')

        const kolomJenis = cy.get(konsep_naskah.kolomJenis).as('kolomJenis')
        kolomJenis.should('contain', 'Jenis')
            .and('be.visible')

        const kolomTujuan = cy.get(konsep_naskah.kolomTujuan).as('kolomTujuan')
        kolomTujuan.should('contain', 'Tujuan & Hal')
            .and('be.visible')

        const kolomUpdate = cy.get(konsep_naskah.kolomUpdate).as('kolomUpdate')
        kolomUpdate.should('contain', 'Update')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

    goToKonsepNaskahNotaDinas() {
        menuPage.goToKonsepNaskah()
    }

}