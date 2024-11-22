import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { MenuPage } from "@pages/sidebar/menu/menu.cy"
import { DraftingKakiSuratPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kaki_surat.cy"

let draftingKakiSuratPage = new DraftingKakiSuratPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let data_temp

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

describe('Drafting Kaki Surat Skenario', { testIsolation: false }, () => {

    qase(150,
        it('Access kaki surat editing form', () => {
            draftingKakiSuratPage.aksesKonsepNaskahSuratBiasa()
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
        })
    )

    qase(151,
        it('Detail check kaki surat editing form', () => {
            draftingKakiSuratPage.checkDetail()
        })
    )

    qase(154,
        it('Check penandatangan dropdown list', () => {
            draftingKakiSuratPage.checkDropdownPenandatangan()
        })
    )

    qase(159,
        it('Leave the field empty when submitting the form', () => {
            draftingKakiSuratPage.leaveEmptyField()
        })
    )

    qase(164,
        it('Check dropdown list if user select diri sendiri', () => {
            draftingKakiSuratPage.aksesFormEditingKakiSurat()
            draftingKakiSuratPage.pilihPenandatanganDiriSendiri(data_temp.kaki_surat[0].penandatangan_diri_sendiri)
        })
    )

    qase(161,
        it('Check dropdown list if user select atasan', () => {
            draftingKakiSuratPage.pilihPenandatanganAtasan(data_temp.env[0].staging, data_temp.kaki_surat[0].penandatangan_atasan1)
        })
    )

    qase(176,
        it('Check field if user select pemeriksa', () => {
            draftingKakiSuratPage.pilihPemeriksa(data_temp.env[0].staging, data_temp.kaki_surat[1].pemeriksa1)
        })
    )

    qase(287,
        it('Check on preview page after input tembusan', () => {
            draftingKakiSuratPage.pilihTembusan(data_temp.env[0].staging, data_temp.kaki_surat[2].tembusan_eksternal1, data_temp.kaki_surat[2].tembusan_eksternal2)
        })
    )

    qase(201,
        it('Batal mengisi kaki surat', () => {
            draftingKakiSuratPage.closeKakiSurat()
            menuPage.goToKotakMasukReviewNaskah()
        })
    )

}) 