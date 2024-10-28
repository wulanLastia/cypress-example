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
        sidebar.should('have.class', 'flex h-full bg-white transition-[width] duration-500 w-[64px]')
    }

    clickBtnShowMenu() {
        const showMenu = cy.get(navbar.hideShowMenu).as('showMenu')
        showMenu.click()

        const sidebar = cy.xpath(menu.sidebarClass).as('sidebarClass')
        sidebar.should('have.class', 'flex h-full bg-white transition-[width] duration-500 w-[240px]')
    }

    checkMenu() {
        this.goToKonsepNaskah()

        this.goToKotakMasuk()

        // Assert sub menu TTE & Review
        const reviewNaskahKM = cy.get(menu.reviewNaskahKM).as('reviewNaskahKM')
        reviewNaskahKM.should('contain', 'TTE & Review')
            .and('be.visible')

        this.goToKotakKeluar()

        // Assert sub menu TTE & Review
        const reviewNaskahKK = cy.get(menu.reviewNaskahKK).as('reviewNaskahKK')
        reviewNaskahKK.should('contain', 'TTE & Review')
            .and('be.visible')
    }

    goToKotakMasuk() {
        const parentKotakMasuk = cy.get(menu.parentKotakMasuk).as('parentKotakMasuk')
        parentKotakMasuk.click()
    }

    goToKotakKeluar() {
        const parentKotakKeluar = cy.get(menu.parentKotakKeluar).as('parentKotakKeluar')
        parentKotakKeluar.click({force: true})
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
            if ($body.find(menu.reviewNaskahKM).parent().parent().css('display') !== 'none') {
                // Click menu kotak masuk
                const reviewNaskahKM = cy.get(menu.reviewNaskahKM).as('reviewNaskahKM')
                reviewNaskahKM.should('be.visible')
                    .click({force:true})
            }else{
                this.goToKotakMasuk()

                // Click menu kotak masuk
                const reviewNaskahKM = cy.get(menu.reviewNaskahKM).as('reviewNaskahKM')
                reviewNaskahKM.should('be.visible')
                    .click({force:true})
            }
        })

        cy.wait(30000)
    }

    goToKotakMasukTindakLanjut() {
        const tindakLanjutKM = cy.get(menu.tindakLanjutKM).as('tindakLanjutKM')
        tindakLanjutKM.should('contain', 'Tindak Lanjut')
            .and('be.visible')
            .click()
    }

    goToKotakKeluarReviewNaskah() {
        // Click menu kotak keluar
        this.goToKotakKeluar()

        // Click sub menu TTE & Review
        const reviewNaskahKK = cy.get(menu.reviewNaskahKK).as('reviewNaskahKK')
        reviewNaskahKK.should('contain', 'TTE & Review')
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

    checkIconSE(inputStatus) {
        if(inputStatus == 'Aktif'){
            const icon_se = cy.get(menu.icon_se).as('icon_se')
            icon_se.should('be.visible')
                .find('svg')
                .and('have.attr', 'style', 'color: rgb(33, 150, 243);')
                .click()
        }else {
            const icon_se = cy.get(menu.icon_se).as('icon_se')
            icon_se.should('be.visible')
                .find('svg')
                .and('have.attr', 'style', 'color: rgb(255, 200, 0);')
                .click()
        }
    }

    checkHoverIconSE(inputStatus) {
        if(inputStatus == 'Aktif'){
            // Click icon se
            const icon_se = cy.get(menu.icon_se).as('icon_se')
            icon_se.realHover()

            // Assert check popup hover se
            const popup_hoverSE = cy.get(menu.popup_hoverSE).as('popup_hoverSE')
            popup_hoverSE.should('be.visible')
                .and('contain', 'Sertifikat Elektronik aktif')
        } else {
            // Click icon se
            const icon_se = cy.get(menu.icon_se).as('icon_se')
            icon_se.realHover()

            // Assert check popup hover se
            const popup_hoverSE = cy.get(menu.popup_hoverSE).as('popup_hoverSE')
            popup_hoverSE.should('be.visible')
                .and('contain', 'Sertifikat Elektronik non aktif, untuk mengaktifkan sertifikat elektronik anda dapat menghubungi admin SIDEBAR')
        }
    }

    checkIconBSRE(inputStatus) {
        if(inputStatus == 'Aktif'){
            const icon_bsre = cy.get(menu.icon_bsre).as('icon_bsre')
            icon_bsre.should('be.visible')
                .find('svg')
                .and('have.attr', 'style', 'color: rgb(33, 150, 243);')
                .click()
        }else {
            const icon_bsre = cy.get(menu.icon_bsre).as('icon_bsre')
            icon_bsre.should('be.visible')
                .find('svg')
                .and('have.attr', 'style', 'color: rgb(255, 200, 0);')
                .click()
        }
    }

    checkHoverIconBSRE(inputStatus) {
        if(inputStatus == 'Aktif'){
            // Click icon bsre
            const icon_bsre = cy.get(menu.icon_bsre).as('icon_bsre')
            icon_bsre.realHover()

            // Assert check popup hover bsre
            const popup_hoverBSRE = cy.get(menu.popup_hoverBSRE).as('popup_hoverBSRE')
            popup_hoverBSRE.should('be.visible')
                .and('contain', 'BSRE aktif')
        } else {
            // Click icon bsre
            const icon_bsre = cy.get(menu.icon_bsre).as('icon_bsre')
            icon_bsre.realHover()

            // Assert check popup hover bsre
            const popup_hoverBSRE = cy.get(menu.popup_hoverBSRE).as('popup_hoverBSRE')
            popup_hoverBSRE.should('be.visible')
                .and('contain', 'Mohon maaf BSRE sedang mengalami kendala, mohon dicek secara berkala')
        }
    }

    checkBtnTandatangani(inputStatus) {
        if(inputStatus == 'SE tidak aktif'){
            const btnTandatangani = cy.get(menu.btnTandatangani).as('btnTandatangani')
            btnTandatangani.should('be.disabled')
        } else {
            const btnTandatangani = cy.get(menu.btnTandatangani).as('btnTandatangani')
            btnTandatangani.should('be.disabled')
        }
    }

    checkHoverBtnTandatangani(inputStatus) {
        if(inputStatus == 'SE tidak aktif'){
            // Click btn tandatangani
            const btnTandatangani = cy.get(menu.btnTandatangani).as('btnTandatangani')
            btnTandatangani.realHover()

            // Assert check popup hover tte
            const popup_hoverTTE = cy.get(menu.popup_hoverTTE).as('popup_hoverTTE')
            popup_hoverTTE.should('be.visible')
            .and('contain', 'Sertifikat Elektronik non aktif, untuk mengaktifkan sertifikat elektronik anda dapat menghubungi admin SIDEBAR')
        } else {
            // Click btn tandatangani
            const btnTandatangani = cy.get(menu.btnTandatangani).as('btnTandatangani')
            btnTandatangani.realHover()

            // Assert check popup hover tte
            const popup_hoverTTE = cy.get(menu.popup_hoverTTE).as('popup_hoverTTE')
            popup_hoverTTE.should('be.visible')
            .and('contain', 'Mohon maaf BSRE sedang mengalami kendala, mohon dicek secara berkala')
        }
    }

    goToNaskahKeluar() {
        const menu_naskahKeluar = cy.get(menu.menu_naskahKeluar).as('menu_naskahKeluar')
        menu_naskahKeluar.should('contain', 'Naskah Keluar')
            .click()

        // Assertion
        cy.url().should('eq', Cypress.env('base_url') + 'registrasi-keluar')

        const label_naskahKeluarTitle = cy.get(menu.label_naskahKeluarTitle).as('label_naskahKeluarTitle')
        label_naskahKeluarTitle.should('contain', 'Naskah Keluar')
    }
}