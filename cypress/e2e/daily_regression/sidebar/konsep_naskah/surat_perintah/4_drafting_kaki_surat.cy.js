import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { DraftingKakiSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kaki_surat.cy"
import { DraftingSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"

let draftingKakiSuratPerintahPage = new DraftingKakiSuratPerintahPage()
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let loginPage = new LoginPage()
let user
let testKakiPositive

before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Jika terdapat error 'uncaught:exception' pada Headless Mode
        if (err.message.includes('postMessage')) {
            return false; // return false digunakan untuk skip error pada Headless Mode
        }

        // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
        throw err;
    });

    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr/ }, { log: false })

    cy.overrideFeatureToggle({
        'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': false,
        'SIDEBAR-V1-LOGIN-CAPTCHA': true
    })
})

before(() => {
    cy.fixture('non_cred/surat_perintah/kaki_surat/positive/kaki_surat_super_positive.json').then((data) => {
        testKakiPositive = data
    })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()

    cy.wait(1000)
    draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()

    cy.wait(3999)
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting Kaki Surat Skenario', { testIsolation: false }, () => {
    qase(1762,
        it('Akses form editing kaki surat', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.aksesFormEditingKakiSurat()
        })
    )

    qase([1763, 1909],
        it('Detail check kaki surat editing form', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkDetail()
        })
    )

    qase(1909,
        it('Check field tanggal penomoran (hidden)', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkTanggalPenomoran()
        })
    )

    qase(1764,
        it('Check penandatangan dropdown list', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkDropdownPenandatangan()
        })
    )

    qase([1765, 1767, 1768, 1780],
        it('Check on preview page after select penandatangan & Delete penandatangan', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasan(testKakiPositive.Penandatangan.Penandatangan_Atasan[0].Daftar_Atasan[0].nama1)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasNama(testKakiPositive.Penandatangan.Penandatangan_Atas_Nama[0].Daftar_Atasan[0].nama2)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganDiriSendiri()
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganUntukBeliau(testKakiPositive.Penandatangan.Penandatangan_Untuk_Beliau[0].Daftar_Atasan[0].nama3)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()

        })
    )

    qase([1771, 1769, 1788, 1780],
        it('Check on preview page after select penandatangan Diri Sendiri', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganDiriSendiri()
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkPemeriksanDiriSendiri(testKakiPositive.Penandatangan.Penandatangan_Untuk_Diri_Sendiri[0].Data_Penandatangan[0].nama1)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()

        })
    )

    qase([1787, 1769, 1788, 1780],
        it('Check on preview page after select penandatangan Untuk Beliau', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganUntukBeliau(testKakiPositive.Penandatangan.Penandatangan_Untuk_Beliau[0].Daftar_Atasan[0].nama6)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkPemeriksaUntukBeliau(testKakiPositive.Pemeriksa.Daftar_Pemeriksa_Naskah[0].nama3)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()

        })
    )

    qase([1786, 1769, 1788, 1780],
        it('Check on preview page after select penandatangan Atas Nama', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasNama(testKakiPositive.Penandatangan.Penandatangan_Atas_Nama[0].Daftar_Atasan[0].nama2)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkPemeriksaAtasNama(testKakiPositive.Pemeriksa.Daftar_Pemeriksa_Naskah[0].nama2)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()

        })
    )

    qase([1785, 1769, 1788, 1780],
        it('Check on preview page after select penandatangan Atasan', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasan(testKakiPositive.Penandatangan.Penandatangan_Atasan[0].Daftar_Atasan[0].nama1)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkPemeriksaAtasan(testKakiPositive.Pemeriksa.Daftar_Pemeriksa_Naskah[0].nama1)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()

        })
    )

    qase([1789, 1786, 1769, 1788, 1780],
        it('Check field pemeriksa after user edit penandatangan', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasNama(testKakiPositive.Penandatangan.Penandatangan_Atas_Nama[0].Daftar_Atasan[0].nama2)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasNama(testKakiPositive.Penandatangan.Penandatangan_Atas_Nama[0].Daftar_Atasan[0].nama3)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.checkDifferentPemeriksa(testKakiPositive.Pemeriksa.Daftar_Pemeriksa_Naskah[0].nama2)
            cy.wait(3000)
            draftingKakiSuratPerintahPage.clearPenandaTangan()

        })
    )
})
