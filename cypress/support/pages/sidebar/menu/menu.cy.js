import login from "../../../selectors/login"
import navbar from "../../../selectors/navbar"
import menu from "../../../selectors/sidebar/menu/menu"

export class MenuPage {

    checkProfile(namaKonseptor, jabatan) {
        const profileName = cy.get(navbar.profileName).as('profileName')
        profileName.should('contain', namaKonseptor)

        const profilePosition = cy.get(navbar.profilePosition).as('profilePosition')
        profilePosition.should('contain', jabatan)
    }

    clickBtnHideMenu() {
        const hideMenu = cy.get(navbar.hideShowMenu).as('hideMenu')
        hideMenu.click()

        const sidebar = cy.xpath(menu.sidebarClass).as('sidebarClass')
        sidebar.should('have.class', 'flex h-[calc(100%-72px)] bg-white transition-[width] duration-500 w-[64px]')
    }

    clickBtnShowMenu() {
        const hideMenu = cy.get(navbar.hideShowMenu).as('hideMenu')
        hideMenu.click()

        const showMenu = cy.get(navbar.hideShowMenu).as('showMenu')
        showMenu.click()

        const sidebar = cy.xpath(menu.sidebarClass).as('sidebarClass')
        sidebar.should('have.class', 'flex h-[calc(100%-72px)] bg-white transition-[width] duration-500 w-[240px]')
    }

    checkMenu() {
        this.goToKonsepNaskah()

        this.goToKotakMasuk()

        const reviewNaskahKM = cy.get(menu.reviewNaskahKM).as('reviewNaskahKM')
        reviewNaskahKM.should('contain', 'Review Naskah')
            .and('be.visible')

        this.goToKotakKeluar()

        const reviewNaskahKK = cy.get(menu.reviewNaskahKK).as('reviewNaskahKK')
        reviewNaskahKK.should('contain', 'Review Naskah')
            .and('be.visible')
    }

    goToKotakMasuk() {
        const parentKotakMasuk = cy.get(menu.parentKotakMasuk).as('parentKotakMasuk')
        parentKotakMasuk.click()
    }

    goToKotakKeluar() {
        const parentKotakKeluar = cy.get(menu.parentKotakKeluar).as('parentKotakKeluar')
        parentKotakKeluar.click()
    }

    goToKonsepNaskah() {
        const konsepNaskahMenu = cy.get(menu.menuKonsepNaskah).as('konsepNaskah')

        konsepNaskahMenu.should('contain', 'Konsep Naskah')
        konsepNaskahMenu.click()

        /* Pengecekan dimatikan sementara karena menunggu desain terbaru up to prod
        const titleKonsepNaskah = cy.get(menu.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')

        const subTitleKonsepNaskah = cy.get(menu.subTitleKonsepNaskah).as('subTitleKonsepNaskah')
        subTitleKonsepNaskah.should('contain', 'TEMPLATE NASKAH')
            .and('be.visible')*/
    }

    goToKotakMasukReviewNaskah() {
        this.goToKotakMasuk()

        cy.wait(6000)

        cy.get('body').then($body => {
            if ($body.find(menu.reviewNaskahKM).length > 0) {
                // Click menu kotak masuk
                const reviewNaskahKM = cy.get(menu.reviewNaskahKM).as('reviewNaskahKM')
                reviewNaskahKM.should('be.visible')
                    .click()
            }else{
                this.goToKotakMasuk()

                // Click menu kotak masuk
                const reviewNaskahKM = cy.get(menu.reviewNaskahKM).as('reviewNaskahKM')
                reviewNaskahKM.should('be.visible')
                    .click()
            }
        })
    }

    goToKotakMasukTindakLanjut() {
        this.goToKotakMasuk()

        const tindakLanjutKM = cy.xpath(menu.tindakLanjutKM).as('tindakLanjutKM')
        tindakLanjutKM.should('contain', 'Tindak Lanjut')
            .and('be.visible')
            .click()
    }

    goToKotakKeluarReviewNaskah() {
        this.goToKotakKeluar()

        const reviewNaskahKK = cy.get(menu.reviewNaskahKK).as('reviewNaskahKK')
        reviewNaskahKK.should('contain', 'Review Naskah')
            .and('be.visible')
            .click()
    }

    goToKotakKeluarTindakLanjut() {
        this.goToKotakKeluar()

        const tindakLanjutKK = cy.xpath(menu.tindakLanjutKK).as('tindakLanjutKK')
        tindakLanjutKK.should('contain', 'Tindak Lanjut')
            .and('be.visible')
            .click()
    }

    navigateKonsepNaskahPage() {
        cy.visit(Cypress.env('base_url') + '/konsep-naskah')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakMasukReviewNaskahPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-masuk/review-naskah')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakMasukTindakLanjutPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-masuk/tindak-lanjut')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakKeluarReviewNaskahPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-keluar/review-naskah')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakKeluarTindakLanjutPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-keluar/tindak-lanjut')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    goToSidebarV1() {
        const sidebarv1Menu = cy.get(menu.sidebarv1Menu).as('sidebarv1Menu')
        sidebarv1Menu.should('contain', 'SIDEBAR V1')
            .click()

        cy.url().should('eq', Cypress.env('base_url_v1'))
    }

    goToKonsepNaskahKeluar() {
        const konsepNaskahMenu = cy.get(menu.menuKonsepNaskah).as('konsepNaskah')

        konsepNaskahMenu.should('contain', 'Konsep Naskah')
        konsepNaskahMenu.click()

        const titleNaskahKeluar = cy.get(menu.titleNaskahKeluar).as('titleNaskahKeluar')
        titleNaskahKeluar.should('contain', 'Naskah Keluar')
    }

    goToKotakMasukPenomoranDanDistribusi() {
        this.goToKotakMasuk()

        const penomoranDistribusi = cy.get(menu.penomoranDistribusi).as('penomoranDistribusi')
        penomoranDistribusi.should('contain', 'Penomoran & Distribusi')
            .and('be.visible')
            .click()
    }

    goToPengambilanNomor() {
        const menuPengambilanNomor = cy.get(menu.menuPengambilanNomor).as('menuPengambilanNomor')
        menuPengambilanNomor.should('contain', 'Pengambilan Nomor')
            .and('be.visible')
            .click()
    }

}