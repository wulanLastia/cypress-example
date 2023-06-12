import login from "../../selectors/login"
import navbar from "../../selectors/navbar"

export class LoginPage {

    navigateLoginPage() {
        cy.visit(Cypress.env('base_url'))

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.click()

        const titleSso = cy.xpath(navbar.titleSimulasi)
        titleSso.should('contain', 'Simulasi login di Sidebar v1')
    }

    navigateLoginPageV1() {
        cy.visit(Cypress.env('base_url_v1'))
        //cy.visit(Cypress.env('base_url_prod_v2'))
    }

    enterNip(nip) {
        const nips = cy.xpath(login.inputNip)

        nips.clear()
        nips.should('be.visible')
        nips.should('have.attr', 'type', 'number')
        nips.type(nip)
    }

    clickBtnMasuk() {
        const btnMasuk = cy.xpath(login.btnMasuk)

        btnMasuk.should('be.visible')
        btnMasuk.contains('Login')
        btnMasuk.click()
    }

    logoutV2() {
        const btnProfile = cy.xpath(navbar.btnProfile).as('btnProfile')

        btnProfile.should('be.visible')
        btnProfile.click()

        const popupProfile = cy.xpath(navbar.popupProfile).as('popupProfile')
        popupProfile.should('be.visible')

        const btnKeluar = cy.xpath(navbar.btnKeluar).as('btnKeluar')
        btnKeluar.should('be.visible').and('contain', 'Log Out')
        btnKeluar.click()

        cy.url().should('eq', Cypress.env('base_url') + '/login?logout=true')
    }

    alertFailedNipKurang() {
        const alert = cy.xpath(navbar.responseNip)

        alert.should('be.visible')
            .and('contain', '{"nip":"Isian nip harus minimal 18 karakter."}')
    }

    alertFailedNipKosong() {
        const alert = cy.xpath(navbar.responseNip)

        alert.should('be.visible')
            .and('contain', '{"nip":"Isian nip tidak boleh string kosong."}')
    }

    navigateLoginPageV2() {
        cy.visit(Cypress.env('base_url'))
    }

    navigateLoginPageV2() {
        cy.visit(Cypress.env('base_url'))
    }

    closePopupLandingPage() {
        const closePopup = cy.xpath(login.closePopupLandingPage).as('closePopupLandingPage')
        closePopup.then($popup => {
            if ($popup.is(':visible')) {
                closePopup.click()
            }
        })
    }

    loginViaV1(nip, passwordv1) {
        this.navigateLoginPageV1()

        const username = cy.xpath(login.username).as('username')
        username.type(nip)

        const password = cy.xpath(login.password).as('password')
        password.type(passwordv1)

        const hiddenCaptcha = cy.xpath(login.hiddenCaptcha).as('hiddenCaptcha')
        hiddenCaptcha.invoke('val')
            .then((val) => {
                const captchaType = cy.xpath(login.captcha).as('captcha')
                captchaType.type(val)
            })

        const btnLogin = cy.xpath(login.btnLogin).as('btnLogin')
        btnLogin.should('contain', 'Login')
            .click()

        cy.wait(3000)
    }

    directLogin() {
        const closePopupLandingPageV1 = cy.xpath(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
        closePopupLandingPageV1.click()

        const goToV2 = cy.xpath(login.goToV2).as('goToV2')
        goToV2.should('contain', 'LOGIN TO V2')
            .click()

        cy.wait(3000)

        this.closePopupLandingPage()
    }

    logout() {
        const closePopupLandingPageV1 = cy.xpath(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
        closePopupLandingPageV1.click()

        cy.wait(3000)

        const profileUser = cy.xpath(login.profileUser).as('profileUser')
        profileUser.should('be.visible')
            .click()

        const btnKeluar = cy.xpath(login.btnKeluar).as('btnKeluar')
        btnKeluar.should('contain', 'Keluar')
            .click()
    }

    backToV1() {
        const backToV1 = cy.xpath(login.backToV1).as('backToV1')
        backToV1.should('contain', 'SIDEBAR V1')
            .click()
    }

    alertGagalLogin() {
        const alertSalah = cy.xpath(login.alertSalah).as('alertSalah')
        alertSalah.should('be.visible')
            .should('contain', 'Username dan password salah !')
    }

    directLoginUK() {
        cy.get("div.modal-footer > button").click();
        cy.get("li:nth-of-type(26) > a").click();

        cy.wait(3000)

        this.closePopupLandingPage()
    }

    directDeployPreview() {
        cy.visit(Cypress.env('base_url_deploy_preview'))

        cy.wait(3000)

        this.closePopupLandingPage()

        cy.wait(3000)
    }

}