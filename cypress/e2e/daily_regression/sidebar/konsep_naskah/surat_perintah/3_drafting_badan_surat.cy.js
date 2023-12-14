import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../../../support/pages/sidebar/menu/menu.cy"
import { DraftingBadanSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/super_drafting_badan_surat.cy"
import { DraftingSuratPerintahPage } from "../../../../../support/pages/sidebar/konsep_naskah/surat_perintah/pgs_drafting_surat_perintah.cy"

let draftingBadanSuratPerintahPage = new DraftingBadanSuratPerintahPage()
let draftingSuratPerintahPage = new DraftingSuratPerintahPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user
let testBadanPositive
let testBadanNegative



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


    cy.fixture('non_cred/surat_perintah/badan_surat/negative/badan_surat_super_negative.json').then((data) => {
        testBadanNegative = data
        })


    cy.fixture('non_cred/surat_perintah/badan_surat/positive/badan_surat_super_positive.json').then((data) => {
        testBadanPositive = data
        })

    })
    cy.intercept({ resourceType: /xhr/ }, { log: false })
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



describe('Drafting Badan Surat Skenario', { testIsolation: false }, () => {
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
            draftingBadanSuratPerintahPage.dragAndDropFirstToSecondASNandNonASN()
        })
    )

    qase(1911,
        it('Cek hapus tujuan penerima ASN', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.deletePenerima2Field()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.clearPenerima1Field()
        })
    )

    qase([1758, 1760],
        it('Cek preview tujuan jika penerima Non ASN, Cek perubahan urutan tujuan penerima Non ASN', () => {
            const nonASNData1 = testBadanPositive.Penerima_Non_ASN.Daftar_Non_ASN[0].nama1[0];
            const nonASNData2 = testBadanPositive.Penerima_Non_ASN.Daftar_Non_ASN[1].nama2[0];

            cy.wait(3000)
            draftingBadanSuratPerintahPage.toggleASNandNonASN1()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldNonASN1st(nonASNData1.Nama, nonASNData1.Pangkat_or_Golongan, nonASNData1.Nomor_Induk_Pegawai, nonASNData1.Jabatan);
            cy.wait(3000)
            draftingBadanSuratPerintahPage.addmoreDataTujuanSurat()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.toggleASNandNonASN2()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputandcheckFieldNonASN2nd(nonASNData2.Nama, nonASNData2.Pangkat_or_Golongan, nonASNData2.Nomor_Induk_Pegawai, nonASNData2.Jabatan);
            cy.wait(3000)
            draftingBadanSuratPerintahPage.dragAndDropFirstToSecondASNandNonASN()
        })
    )

    qase(1912,
        it('Cek hapus tujuan penerima non ASN', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.deletePenerima2Field()
            cy.wait(3000)
            draftingBadanSuratPerintahPage.toggleASNandNonASN1()
        })
    )



    qase(1740,
        it('Check indent of paragraph (minimal x spacing)', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputXSpacing(testBadanNegative.Space[2].Untuk_Free_Text)
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )

    qase(1741,
        it('Input Text Bold on Untuk Field', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputBoldTextOnUntuk(testBadanPositive.Untuk[0].Untuk_Bold)
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )

    qase(1742,
        it('Input Text Italic on Untuk Field', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputItalicTextOnUntuk(testBadanPositive.Untuk[1].Untuk_Italic)
            draftingBadanSuratPerintahPage.clearUntukField()
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
            cy.wait(3000);
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )

    qase(1744,
        it('Input Text Bullet List on Untuk Field', () => {
            cy.wait(3000);
            draftingBadanSuratPerintahPage.inputBulletListTextOnUntuk(
                testBadanPositive.Untuk[3].Untuk_Bullet_List1, 
                testBadanPositive.Untuk[3].Untuk_Bullet_List2, 
                testBadanPositive.Untuk[3].Untuk_Bullet_List3
            );
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )
    
    qase(1745,
        it('Paste some text from another platform', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.pasteFreeTextOnUntuk(testBadanPositive.Untuk[4].Untuk_Paste)
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )

    qase(1746,
        it('Insert a table', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputTableOnUntuk()
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )
    
    qase(1747,
        it('Insert a image', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputImageOnUntuk()
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )

    qase(1756,
        it('Input only whitespace', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.inputWhitespaceOnTextInUntuk(
                "{selectall}{backspace}{shift}{enter}" 
                + testBadanPositive.Untuk[2].Untuk_Numeric_List1 
                + "{enter}{enter}" 
                + testBadanPositive.Untuk[2].Untuk_Numeric_List2 
                + "{shift}{enter}")
            draftingBadanSuratPerintahPage.clearUntukField()
        })
    )


    qase(1750,
        it('Menutup form editing badan naskah', () => {
            cy.wait(3000)
            draftingBadanSuratPerintahPage.closeBadanSurat()
        })
    )


})
