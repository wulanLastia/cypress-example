import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let setujuiPage = new SetujuiPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let user
let dataNotaDinas

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_nota_dinas.json').then((jsonData) => {
        dataNotaDinas = jsonData  // Assign data from jsonData
    })
})

describe('Skenario Nota Dinas - Tujuan Kepala Internal 3, Tembusan Internal 3, Lampiran 2, Tandatangani Diri Sendiri', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Kepala Internal', () => {
            // LogIn Skenario Default
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            
            listNaskahSuratBiasaPage.goToKonsepNaskahNotaDinas() 
            cy.wait(3000)
            createNotaDinasPage.createKopSurat(dataNotaDinas.org[0].org1)
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1('Lampiran 1 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2('Lampiran 2 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createKakiSuratPenandatanganDiriSendiri()
            cy.wait(3000)
            createNotaDinasPage.createKepalaSurat(
                [dataNotaDinas.kepala_surat[0].tujuan4, dataNotaDinas.kepala_surat[0].tujuan5, dataNotaDinas.kepala_surat[0].tujuan6], 
                [dataNotaDinas.kepala_surat[1].tembusan1, dataNotaDinas.kepala_surat[1].tembusan2, dataNotaDinas.kepala_surat[1].tembusan3], 
                dataNotaDinas.kepala_surat[3].kode_klasifikasi, 
                dataNotaDinas.kepala_surat[4].unit_pengolah, 
                dataNotaDinas.kepala_surat[5].sifat_surat, 
                dataNotaDinas.kepala_surat[6].urgensi_surat, 
                dataNotaDinas.kepala_surat[7].perihal2
            )
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            setujuiPage.doTandaTanganiSurat('passphrase')
        })
    )
})