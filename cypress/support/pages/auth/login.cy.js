import login from "../../selectors/login"
import navbar from "../../selectors/navbar"

export class LoginPage {

    navigateLoginPageV1() {
        cy.log(Cypress.env('base_url_v1'))
        cy.visit(Cypress.env('base_url_v1'), { failOnStatusCode: false })
    }

    navigateLoginPageV1Prod() {
        //cy.log(Cypress.env('base_url_prod_v1'))
        cy.visit(Cypress.env('base_url_prod_v1'), { failOnStatusCode: false })
    }

    navigateLoginPageV2() {
        cy.visit(Cypress.env('base_url'))

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.click()

        const titleSso = cy.xpath(navbar.titleSimulasi)
        titleSso.should('contain', 'Simulasi login di Sidebar v1')
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

    loginViaV1(nip, passwordv1) {
        cy.then(Cypress.session.clearCurrentSessionData)

        cy.wait(1500)

        // @TODO: Disable sementara karena menyebabkan error 500 
        // cy.overrideFeatureToggle({
        //     'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
        //     'SIDEBAR-V1-LOGIN-CAPTCHA': false
        // })

        cy.intercept('POST', Cypress.env('base_url_api_v1')).as('checkResponse')

        this.navigateLoginPageV1()
      
        const showInputLogin = cy.xpath(login.showInputLogin).as('showInputLogin')
        showInputLogin.scrollIntoView()
            .click({ force: true })

        const username = cy.get(login.username).as('username')
        username.scrollIntoView()
            .should('be.visible')
            .type(nip, { force: true })

        const password = cy.get(login.password).as('password')
        password.type(passwordv1, { force: true })

        // Disable sementara menyesuaikan dengan kebutuhan
        // const hiddenCaptcha = cy.get(login.hiddenCaptcha).as('hiddenCaptcha')
        // hiddenCaptcha.invoke('val')
        //     .then((val) => {
        //         const captchaType = cy.get(login.captcha).as('captcha')
        //         captchaType.type(val, { force: true })
        //     })

        const btnLogin = cy.get(login.btnLogin).as('btnLogin')
        btnLogin.should('contain', 'Login')
            .then(($btnLogin) => {
                if ($btnLogin.is(':enabled')) {
                    // If button is Enabled
                    cy.get('@btnLogin').click({ force: true });

                    cy.wait(3000)

                    cy.wait('@checkResponse', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response) {
                                const status = interception.response.statusCode;
                                const clientErrorStatusCodes = [400, 401, 403, 404, 405, 406, 408, 409, 410, 411, 412];
                                const serverErrorStatusCodes = [500, 501, 502, 503, 504];
                                const errorStatusCodes = [...clientErrorStatusCodes, ...serverErrorStatusCodes];

                                // Assert berupa message di Cypress E2E pada status code ketika gagal, bila status code tidak sesuai maka status dibawah akan memberhentikan untuk masuk ke skenario selanjutnya
                                if (errorStatusCodes.includes(status)) {
                                    expect(errorStatusCodes, `Request failed with status code: ${status}`).to.include(status);
                                }

                                const successStatusCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
                                const redirectStatusCodes = [300, 301, 302, 303, 307];
                                const acceptableStatusCodes = [...successStatusCodes, ...redirectStatusCodes];

                                // Assert berupa message di Cypress E2E pada status code ketika sukses
                                expect(acceptableStatusCodes, `Result of status code: ${status}`).to.include(status);
                            } else {
                                // Jika response tidak sesuai dengan status code diatas, makan akan throw error dengan assert message seperti dibawah
                                cy.log('No response received.');
                                throw new Error('No response received.');
                            }
                        });
                }
            })
    }

    loginViaV1Prod(nip, passwordv1) {
        cy.then(Cypress.session.clearCurrentSessionData)

        cy.wait(1500)

        this.navigateLoginPageV1Prod()

        // Check if popup notifier exists
        cy.get('body').then($body => {
            if ($body.find(login.alertPopUp).length > 0) {
                // Popup exists
                const alertPopUp = cy.get(login.alertPopUp).as('alertPopUp')
                alertPopUp.scrollIntoView()
                alertPopUp.click({ force: true })

                cy.wait(3000)

                const showInputLogin = cy.xpath(login.showInputLogin).as('showInputLogin')
                showInputLogin.scrollIntoView()
                    .click({ force: true })

                const username = cy.get(login.username).as('username')
                username.scrollIntoView()
                    .should('be.visible')
                    .type(nip, { force: true })

                const password = cy.get(login.password).as('password')
                password.type(passwordv1, { force: true })

                // const hiddenCaptcha = cy.get(login.hiddenCaptcha).as('hiddenCaptcha')
                // hiddenCaptcha.invoke('val')
                //     .then((val) => {
                //         const captchaType = cy.get(login.captcha).as('captcha')
                //         captchaType.type(val, { force: true })
                //     })

                const btnLogin = cy.get(login.btnLogin).as('btnLogin')
                btnLogin.should('contain', 'Login')
                    .click({ force: true })

                cy.wait(3000)
            } else {
                // No popup, proceed with login
                cy.wait(3000)

                const showInputLogin = cy.xpath(login.showInputLogin).as('showInputLogin')
                showInputLogin.scrollIntoView()
                    .click({ force: true })

                const username = cy.get(login.username).as('username')
                username.scrollIntoView()
                    .should('be.visible')
                    .type(nip, { force: true })

                const password = cy.get(login.password).as('password')
                password.type(passwordv1, { force: true })

                // const hiddenCaptcha = cy.get(login.hiddenCaptcha).as('hiddenCaptcha')
                // hiddenCaptcha.invoke('val')
                //     .then((val) => {
                //         const captchaType = cy.get(login.captcha).as('captcha')
                //         captchaType.type(val, { force: true })
                //     })

                const btnLogin = cy.get(login.btnLogin).as('btnLogin')
                btnLogin.should('contain', 'Login')
                    .click({ force: true })

                cy.wait(3000)
            }
        });
    }

    // REDIRECT LOGIN TO SIDEBAR V2

    directLogin() {
        // Check choose version
        cy.get('body').then($body => {
            if ($body.find(login.chooseVersion).length > 0) {
                // Choose version exists
                const chooseVersion = cy.get(login.chooseVersion).as('chooseVersion')
                chooseVersion.scrollIntoView()
                    .click()
            }else{
                // Check popup landing page v1
                cy.get('body').then($body => {
                    if ($body.find(login.closePopupLandingPageV1).length > 0) {
                        // Close popup landing page v1
                        const closePopupLandingPageV1 = cy.get(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
                        closePopupLandingPageV1.click()

                        // Go To Sidebar V2
                        const goToV2 = cy.get(login.goToV2).as('goToV2')
                        goToV2.click()
                            .should('contain', 'SIDEBAR BARU')
                    }
                })    
            }

            cy.wait(6000)

            // Close banner popup v2
            cy.get('body').then($body => {
                if ($body.find(login.btnClosePopupV2).length > 0) {
                    // Close banner popup v2
                    const btnClosePopupV2 = cy.get(login.btnClosePopupV2).as('btnClosePopupV2')
                    btnClosePopupV2.click({ force:true })
                }
            })

            cy.wait(6000)

            // Check onboarding
            cy.get('body').then($body => {
                if ($body.find(login.skipOnboarding).length > 0) {
                    // Skip onboarding
                    const skipOnboarding = cy.get(login.skipOnboarding).as('skipOnboarding')
                    skipOnboarding.click()
                }
            })

            cy.wait(6000)
        })
    }

    directDeployPreview() {
        cy.visit(Cypress.env('base_url_deploy_preview'))

        cy.wait(3000)
    }

    // LOGOUT 

    backToV1() {
        const backToV1 = cy.get(login.backToV1).as('backToV1')
        backToV1.should('contain', 'SIDEBAR V1')
            .click()
    }

    logout() {
        const closePopupLandingPageV1 = cy.xpath(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
        closePopupLandingPageV1.click()

        cy.wait(3000)

        const profileUser = cy.get(login.profileUser).as('profileUser')
        profileUser.should('be.visible')
            .click()

        const btnKeluar = cy.xpath(login.btnKeluar).as('btnKeluar')
        btnKeluar.should('contain', 'Keluar')
            .click()
    }

    logoutV2() {
        const btnProfile = cy.get(navbar.btnProfile).as('btnProfile')
        btnProfile.should('be.visible')
        btnProfile.click()

        const popupProfile = cy.get(navbar.popupProfile).as('popupProfile')
        popupProfile.should('be.visible')

        const btnKeluar = cy.get(navbar.btnKeluar).as('btnKeluar')
        btnKeluar.should('be.visible').and('contain', 'Log Out')
        btnKeluar.click()

        cy.url().should('eq', Cypress.env('base_url_v1'))
    }

    logoutV2step2() {
        // Show header if hidden
        cy.get(login.showHeaderNav).invoke('css', 'display', 'block');

        // Use the simpler selector
        const btnProfile = cy.get(login.getJQueryProfileV2).as('btnProfile');

        // Wait for element to be visible or force click if not
        btnProfile.scrollIntoView()
            .should('be.visible', { force: true })
            .click({ force: true });

        // I'm assuming the following popupProfile code remains unchanged 
        // as you didn't provide the selector.
        const popupProfile = cy.get(navbar.btnProfile).as('popupProfile');
        popupProfile.scrollIntoView()
            .should('be.visible', { force: true });

        const btnKeluar = cy.get(navbar.btnKeluar).as('btnKeluar');
        btnKeluar.scrollIntoView()
            .should('be.visible').and('contain', 'Log Out')
            .click({ force: true });

        cy.wait(8000)

        cy.url().should('eq', Cypress.env('base_url_v1'));
    }

    logoutV2step2PROD() {
        // Show header if hidden
        cy.get(login.showHeaderNav).invoke('css', 'display', 'block');

        cy.wait(3000)

        // Use the simpler selector
        const btnProfile = cy.get(login.getJQueryProfileV2).as('btnProfile');

        // Wait for element to be visible or force click if not
        btnProfile.scrollIntoView()
            .should('be.visible', { force: true })
            .click({ force: true });

        // I'm assuming the following popupProfile code remains unchanged 
        // as you didn't provide the selector.
        const popupProfile = cy.get(navbar.btnProfile).as('popupProfile');
        popupProfile.scrollIntoView()
            .should('be.visible', { force: true });

        const btnKeluar = cy.get(navbar.btnKeluar).as('btnKeluar');
        btnKeluar.scrollIntoView()
            .should('be.visible').and('contain', 'Log Out')
            .click({ force: true });

        cy.wait(8000)


        cy.url().should('eq', Cypress.env('base_url_prod_v1'));
    }

    // TODO : Diskusi dengan backend tekait login via sso
    loginSSOJabar() {
        // Clear current session
        cy.then(Cypress.session.clearCurrentSessionData)

        // Direct to url staging sidebar v1
        this.navigateLoginPageV1()

        // Go to login sso jabar
        const btnLoginSSO = cy.get(login.btnLoginSSO).as('btnLoginSSO')
        btnLoginSSO.scrollIntoView()
            .click({ force: true })
    }

    inputDataLoginSSO(nip, password) {
        // Input Username & Password
        const usernameSSO = cy.get(login.usernameSSO).as('usernameSSO')
        usernameSSO.scrollIntoView()
            .should('be.visible')
            .type(nip, { force: true })

        const passwordSSO = cy.get(login.passwordSSO).as('passwordSSO')
        passwordSSO.scrollIntoView()
            .should('be.visible')
            .type(password, { force: true })
            //.type('{enter}')

        // cy.url().then((url) => {
        //     cy.log('Current URL is: ' + url)
        //     cy.request('POST', url, {}).then(
        //         (response) => {
        //             cy.log(response)
        //         }
        //     )
        // })

        const formLoginSSO = cy.get(login.formLoginSSO).as('formLoginSSO')
        formLoginSSO.submit()

        // Click button masuk
        // const btnConfirmLoginSSO = cy.get(login.btnConfirmLoginSSO).as('btnConfirmLoginSSO')
        // btnConfirmLoginSSO.should('contain', 'Masuk')
        //     .click({ force: true })
        //     .then(() => {
        //         cy.request('POST', url, {}).then(
        //             (response) => {
        //                 cy.log('test')
        //             }
        //         )
        //     }) 

        cy.wait(3000)
    }

    loginSiapJabar() {
        // Clear current session
        cy.then(Cypress.session.clearCurrentSessionData)

        // Direct to url prod sidebar v1
        this.navigateLoginPageV1Prod()

        // Go to login sso jabar
        const btnLoginSiap = cy.get(login.btnLoginSiap).as('btnLoginSiap')
        btnLoginSiap.scrollIntoView()
            .click({ force: true })
    }

    inputDataLoginSiap(nip, password) {
        // Input Username & Password
        const usernameSiap = cy.xpath(login.usernameSiap).as('usernameSiap')
        usernameSiap.scrollIntoView()
            .should('be.visible')
            .type(nip, { force: true })

        const passwordSiap = cy.xpath(login.passwordSiap).as('passwordSiap')
        passwordSiap.scrollIntoView()
            .should('be.visible')
            .type(password, { force: true })

        // Click button masuk
        const btnConfirmSiap = cy.xpath(login.btnConfirmSiap).as('btnConfirmSiap')
        btnConfirmSiap.should('contain', 'Login')
            .click({ force: true })

        cy.wait(3000)

        // Choose version sidebar v2
        cy.get('body').then($body => {
            if ($body.find(login.chooseVersion).length > 0) {
                // Choose version exists
                const chooseVersion = cy.get(login.chooseVersion).as('chooseVersion')
                chooseVersion.scrollIntoView()
                    .click()

                cy.wait(3000)

                // Assertion Login Sidebar V2 - Siap Jabar
                cy.url().should('eq', Cypress.env('base_url_prod_v2') + 'konsep-naskah');
            }else{
                if ($body.find(login.closePopupLandingPageV1).length > 0) {
                    // Close popup landing page v1
                    const closePopupLandingPageV1 = cy.get(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
                    closePopupLandingPageV1.click()

                    // Go To Sidebar V2
                    const goToV2 = cy.get(login.goToV2).as('goToV2')
                    goToV2.click()
                        .should('contain', 'SIDEBAR BARU')
                }

                // Assertion Login Sidebar V2 - Siap Jabar
                cy.url().should('eq', Cypress.env('base_url_prod_v2') + 'konsep-naskah');
            }
        })
    }

    // ALERT
    alertGagalLogin() {
        cy.get('body').then($body => {
            if ($body.find(login.btnLogin).is(':disabled')) {
                // Alert error limiter
                const alertLimiter = cy.xpath(login.alertLimiter).as('alertLimiter')
                alertLimiter.should('be.visible')
                    .contains('Maaf, jumlah login sudah melewati batas. Silahkan coba lagi setelah 5 menit, atau gunakan metode login lain yang tersedia')
            }else{
                // Alert error username password
                const alertSalah = cy.get(login.alertSalah).as('alertSalah')
                alertSalah.should('be.visible')
                    .should('contain', 'Silakan login melalui akun SIAP / SSO Jabar Anda')
            }
        })
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

}
