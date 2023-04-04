import navbar from "../../../selectors/navbar"
import menu from "../../../selectors/sidebar/menu/menu"
import konsep_naskah from "../../../selectors/sidebar/konsep_naskah/konsep_naskah"

import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

export class KonsepNaskahPage {

    checkContainer() {
        const konsepNaskahMenu = cy.xpath(konsep_naskah.konsepNaskahMenu).as('konsepNaskahMenu')

        konsepNaskahMenu.should('contain', 'Konsep Naskah')
        konsepNaskahMenu.click()

        const titleKonsepNaskah = cy.xpath(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(konsep_naskah.subTitleKonsepNaskah).as('subTitleKonsepNaskah')
        subTitleKonsepNaskah.should('contain', 'TEMPLATE NASKAH')
            .and('be.visible')

        const titleNaskahKeluar = cy.xpath(konsep_naskah.titleNaskahKeluar).as('titleNaskahKeluar')
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

        const tableNaskahKeluar = cy.xpath(konsep_naskah.tableNaskahKeluar).as('tableNaskahKeluar')
        tableNaskahKeluar.should('be.visible')

        const kolomStatus = cy.xpath(konsep_naskah.kolomStatus).as('kolomStatus')
        kolomStatus.should('contain', 'Status')
            .and('be.visible')

        const kolomJenis = cy.xpath(konsep_naskah.kolomJenis).as('kolomJenis')
        kolomJenis.should('contain', 'Jenis')
            .and('be.visible')

        const kolomTujuan = cy.xpath(konsep_naskah.kolomTujuan).as('kolomTujuan')
        kolomTujuan.should('contain', 'Tujuan & Hal')
            .and('be.visible')

        const kolomUpdate = cy.xpath(konsep_naskah.kolomUpdate).as('kolomUpdate')
        kolomUpdate.should('contain', 'Update')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

}