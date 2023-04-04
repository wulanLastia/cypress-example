import badan_naskah from "../../../selectors/sidebar/konsep_naskah/drafting_badan_naskah"
import konsep_naskah from "../../../selectors/sidebar/konsep_naskah/konsep_naskah"

import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingBadanNaskahPage {

    checkKonsepNaskah() {
        const titleKonsepNaskah = cy.xpath(badan_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(badan_naskah.subTitleKonsepNaskah).as('subTitleKonsepNaskah')
        subTitleKonsepNaskah.should('contain', 'TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.xpath(badan_naskah.suratBiasa).as('suratBiasa')
        suratBiasa.should('be.visible')
            .click()
    }

    aksesBadanNaskah() {
        this.checkKonsepNaskah()

        cy.wait(3000)

        const previewBadan = cy.xpath(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360)

        const titleBadan = cy.xpath(badan_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    checkPreviewTextBold() {
        cy.wait(6000)

        const setTextBold = cy.xpath(badan_naskah.setTextBold).as('setTextBold')
        setTextBold.click()

        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Ditujukan kepada anggota JDS untuk hadir di acara Townhall bulan Maret 2023 dengan tema')
            .find('strong')
            .should('contain', 'Ditujukan kepada anggota JDS untuk hadir di acara Townhall bulan Maret 2023 dengan tema')
    }

    checkPreviewTextItalic() {
        const setTextBold = cy.xpath(badan_naskah.setTextBold).as('setTextBold')
        setTextBold.click()

        const setTextItalic = cy.xpath(badan_naskah.setTextItalic).as('setTextItalic')
        setTextItalic.click()

        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type(' Around The World.')
            .find('em')
            .should('contain', ' Around The World.')
    }

    checkPreviewTextNumeric() {
        const setTextItalic = cy.xpath(badan_naskah.setTextItalic).as('setTextItalic')
        setTextItalic.click()

        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{enter}Diharapkan kepada seluruh anggota dapat mengikuti acara tersebut dan mempersiapkan diri sebaik mungkin dengan{enter}')

        const setTextNumericList = cy.xpath(badan_naskah.setTextNumericList).as('setTextNumericList')
        setTextNumericList.click()

        const iframeBadan1 = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan1.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Memakai pakaian bebas dengan tema Around The World{enter}Membawa makanan dengan huruf awal sesuai abjad awal nama masing-masing')
            .find('ol')
            .should('contain', 'Memakai pakaian bebas dengan tema Around The World')
    }

    insertNewParagraph() {
        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{enter}{enter}Makanan yang dibawa oleh peserta dapat berupa{enter}')
    }

    checkPreviewTextBullet() {
        const setTextNumericList = cy.xpath(badan_naskah.setTextNumericList).as('setTextNumericList')
        setTextNumericList.click()

        const setTextBulletList = cy.xpath(badan_naskah.setTextBulletList).as('setTextNumericList')
        setTextBulletList.click()

        const iframeBadan1 = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan1.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Makanan berat{enter}Makanan ringan{enter}Snack')
            .find('ul')
            .should('contain', 'Makanan berat')
    }

    insertTable() {
        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{enter}{enter}Yuk rayakan townhall pada:{enter}')

        const scrollTable = cy.xpath(badan_naskah.scrollTable).as('scrollTable')
        scrollTable.scrollTo(0, 500)

        const btnTable = cy.xpath(badan_naskah.btnTable).as('btnTable')
        btnTable.click()

        const pilihTable = cy.xpath(badan_naskah.pilihTable).as('pilihTable')
        pilihTable.click()

        const sizeTable = cy.xpath(badan_naskah.sizeTable).as('sizeTable')
        sizeTable.should('be.visible')
            .click()
    }

    insertTable() {
        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{enter}{enter}Yuk rayakan townhall pada:{enter}')

        const scrollTable = cy.xpath(badan_naskah.scrollTable).as('scrollTable')
        scrollTable.scrollTo(0, 500)

        const btnTable = cy.xpath(badan_naskah.btnTable).as('btnTable')
        btnTable.click()

        const pilihTable = cy.xpath(badan_naskah.pilihTable).as('pilihTable')
        pilihTable.click()

        const sizeTable = cy.xpath(badan_naskah.sizeTable).as('sizeTable')
        sizeTable.should('be.visible')
            .click()
    }

    insertImage() {
        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{downArrow}{downArrow}{downArrow}{enter}')

        const popupImage = cy.xpath(badan_naskah.popupImage).as('popupImage')
        popupImage.should('be.visible')

        const fileUploadSingleFile = 'kurma.jpg'

        cy.wait(3000)

        const insertImage = cy.xpath(badan_naskah.insertImage).as('insertImage')
        insertImage.attachFile(fileUploadSingleFile).trigger('click', { force: true })
    }

    closeBadanNaskah() {
        const closeBadanNaskah = cy.xpath(badan_naskah.closeBadanNaskah).as('closeBadanNaskah')
        closeBadanNaskah.click()

        const editFormDefault = cy.xpath(konsep_naskah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')
    }

    leaveEmptyForm() {
        const previewBadan = cy.xpath(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360)

        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .clear()

        this.closeBadanNaskah()

        const btnKirim = cy.get(badan_naskah.btnKirim).as('btnKirim')
        btnKirim.should('have.class', 'flex gap-4 margin-start')

        menuPage.goToKotakMasukReviewNaskah()
    }
}