import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftingSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"
import { DraftingKopSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_kop_surat_perintah.cy"
import { DraftingKepalaSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kepala_surat.cy"
import { DraftingBadanSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_badan_surat.cy"
import { DraftingKakiSuratPerintahPage } from "@pages/sidebar/konsep_naskah/surat_perintah/super_drafting_kaki_surat.cy"
import { KoreksiSuratPage } from "@pages/sidebar/kotak_masuk/7_koreksi.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let draftingKopSuratPerintahPage = new DraftingKopSuratPerintahPage()
let draftingKepalaSuratPerintahPage = new DraftingKepalaSuratPerintahPage()
let draftingBadanSuratPerintahPage = new DraftingBadanSuratPerintahPage()
let draftingKakiSuratPerintahPage = new DraftingKakiSuratPerintahPage()
let koreksiSuratPage = new KoreksiSuratPage()

let user
let data_review
let testKepalaPositive
let testBadanPositive
let testKakiPositive

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip, user.password)
    loginPage.directLogin()

    cy.wait(1000)

    draftingSuratPerintahPage.gotoKonsepNaskahSuratPerintah()

    cy.wait(3999)
})

before(() => {
    cy.fixture('non_cred/surat_perintah/kepala_surat/positive/kepala_surat_super_positive.json').then((data) => {
        testKepalaPositive = data
    })

    cy.fixture('non_cred/surat_perintah/badan_surat/positive/badan_surat_super_positive.json').then((data) => {
        testBadanPositive = data
    })

    cy.fixture('non_cred/surat_perintah/kaki_surat/positive/kaki_surat_super_positive.json').then((data) => {
        testKakiPositive = data
    })

    cy.fixture('non_cred/surat_perintah/review_naskah.json').then((data) => {
        data_review = data
    })
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Drafting & Kirim Surat Perintah Penandatangan Atasan', { testIsolation: false }, () => {
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

    qase([1785, 1769, 1788, 1780],
        it('Check on preview page after select penandatangan Atasan', () => {
            cy.wait(3000)
            draftingKakiSuratPerintahPage.pilihPenandatanganAtasan(testKakiPositive.Penandatangan.Penandatangan_Atasan[0].Daftar_Atasan[0].nama2)
            cy.wait(5000)
            draftingKakiSuratPerintahPage.checkPemeriksaAtasan(testKakiPositive.Pemeriksa.Daftar_Pemeriksa_Naskah[0].nama2)
            cy.wait(3000)
        })
    )

    

    qase([1395, 1419],
        it('Akses form editing kop surat (drafting)', () => {
            draftingKopSuratPerintahPage.aksesFormEditingKopSurat()
            cy.wait(6000)
        })
    )

    qase([1417, 1732],
        it('Cek preview setelah memilih kop Dinas/Badan', () => {
            draftingKopSuratPerintahPage.checkPreviewDinas()
        })
    )

    qase(1416,
        it('Menutup form editing kop surat', () => {
            draftingKopSuratPerintahPage.closeKopSurat()
        })
    )



    qase(1423,
        it('Akses form editing kepala surat', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat()
        })
    )

    qase([1457, 1459],
        it('Cek Field Kode Klasifikasi', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputKodeKlasifikasi(testKepalaPositive.Kepala_Surat[0].Kode_Klasifikasi)
        })
    )

    qase(1737,
        it('Cek Field Unit Pengolah', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputUnitPengolah(testKepalaPositive.Kepala_Surat[1].Unit_Pengolah)
        })
    )

    qase(1739,
        it('Cek Dropdown Urgensi', () => {
            cy.wait(10000)
            draftingKepalaSuratPerintahPage.validateUrgensi(testKepalaPositive.Kepala_Surat[2].Urgensi_Surat_Perintah)
        })
    )

    qase(1739,
        it('Cek Dropdown Sifat Surat', () => {
            cy.wait(10000)
            draftingKepalaSuratPerintahPage.validateSifatSurat(testKepalaPositive.Kepala_Surat[3].Sifat_Surat_Perintah)
        })
    )

    qase([144, 735, 742],
        it('Cek Perihal Surat', () => {
            draftingKepalaSuratPerintahPage.inputPerihal(testKepalaPositive.Kepala_Surat[4].Perihal)
            cy.wait(3000)
        })
    )

    qase(721,
        it('Input Text Bold on Dasar Field', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.inputBoldTextOnDasar("{selectall}{backspace}" + testKepalaPositive.Dasar[0].Dasar_Bold)
        })
    )

    qase(1425,
        it('Menutup form kepala naskah', () => {
            cy.wait(3000)
            draftingKepalaSuratPerintahPage.closeKepalaSurat()
            cy.wait(3000)
        })
    )



    qase(1755,
        it('Akses form editing badan surat', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.aksesFormEditingBadanSurat()
        })
    )

    qase([1757, 1760],
        it('Cek preview tujuan jika penerima ASN, Cek perubahan urutan tujuan penerima ASN', () => {
            const ASNData = testBadanPositive.Penerima_ASN.Daftar_ASN[0];

            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldASN1st(ASNData.nama1)

            cy.wait(3000)
            draftingBadanSuratPerintahPage.addmoreDataTujuanSurat()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldASN2nd(ASNData.nama2)

            cy.wait(3000)
            draftingBadanSuratPerintahPage.addmoreDataTujuanSurat()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldASN3rd(ASNData.nama3)
            cy.wait(3000)

            draftingBadanSuratPerintahPage.dragAndDropFirstToSecondASNandNonASN()
        })
    )

    qase([1758, 1760],
        it('Cek preview tujuan jika penerima Non ASN, Cek perubahan urutan tujuan penerima Non ASN', () => {
            const nonASNData4 = testBadanPositive.Penerima_Non_ASN.Daftar_Non_ASN[3].nama4[0];
            const nonASNData5 = testBadanPositive.Penerima_Non_ASN.Daftar_Non_ASN[4].nama5[0];


            cy.wait(3000)
            draftingBadanSuratPerintahPage.addmoreDataTujuanSurat()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.toggleASNandNonASN4()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldNonASN4th(nonASNData4.Nama, nonASNData4.Pangkat_or_Golongan, nonASNData4.Nomor_Induk_Pegawai, nonASNData4.Jabatan);

            cy.wait(3000)
            draftingBadanSuratPerintahPage.addmoreDataTujuanSurat()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.toggleASNandNonASN5()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldNonASN5th(nonASNData5.Nama, nonASNData5.Pangkat_or_Golongan, nonASNData5.Nomor_Induk_Pegawai, nonASNData5.Jabatan);

            draftingBadanSuratPerintahPage.dragAndDropLastDataToFirstDataASNandNonASN()
        })
    )

    qase([1743, 1751],
        it('Input Text Numeric List on Untuk Field, Check on preview page if user create more than one page', () => {
            cy.wait(3000);
            draftingBadanSuratPerintahPage.inputNumericListTextOnUntuk(
                testBadanPositive.Untuk[2].Untuk_Numeric_List1,
                testBadanPositive.Untuk[2].Untuk_Numeric_List2,
                testBadanPositive.Untuk[2].Untuk_Numeric_List3
            );
        })
    )

    qase(1750,
        it('Menutup form editing badan naskah', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.closeBadanSurat()
        })
    )



    qase(1913,
        it('Kirim drafting naskah surat perintah', () => {
            cy.wait(3000)
            draftingSuratPerintahPage.kirimNaskah()
            cy.wait(3000)
            loginPage.logoutV2step2()
        })
    )

})




describe('Koreksi Tandatangani Naskah Skenario', { testIsolation: false }, () => {
    qase([2167, 2168, 2170, 2174],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nipPemeriksa2, user.password)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview()
            koreksiSuratPage.checkDetailKoreksiTandatangani()
            koreksiSuratPage.koreksiTandatanganiSuratPerintah(user.passphrase, data_review.koreksi[0].koreksi_tandatangani_perihal)
            cy.wait(10000)
        })
    )
}) 