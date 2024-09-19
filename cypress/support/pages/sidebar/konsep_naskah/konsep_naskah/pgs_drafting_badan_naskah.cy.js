import badan_naskah from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_badan_naskah"
import { MenuPage } from "../../menu/menu.cy"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const menuPage = new MenuPage()
const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingBadanNaskahPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingBadanNaskah() {
        const previewBadan = cy.get(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360, { force: true })

        cy.wait(6000)

        const titleBadan = cy.get(badan_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    inputBadanNaskah() {
        const previewBadan = cy.get(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 420, { force: true })

        cy.wait(6000)

        const titleBadan = cy.get(badan_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    inputBadanNaskahProd() {
        const previewBadan = cy.get(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 320, { force: true })

        cy.wait(6000)

        const titleBadan = cy.get(badan_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    checkPreviewTextBold() {
        cy.wait(3000)

        const setTextBold = cy.get(badan_naskah.htmlBadan).as('htmlSetTextBold')
        setTextBold.find('button[title="Bold"]')
            .click()

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Ditujukan kepada anggota JDS untuk hadir di acara Townhall bulan Juni 2023 dengan tema')
            .find('strong')
            .should('contain', 'Ditujukan kepada anggota JDS untuk hadir di acara Townhall bulan Juni 2023 dengan tema')
    }

    checkPreviewTextItalic() {
        cy.wait(3000)

        const setTextBold = cy.get(badan_naskah.htmlBadan).as('htmlSetTextBold')
        setTextBold.find('button[title="Bold"]')
            .click()

        cy.wait(2000)

        const setTextItalic = cy.get(badan_naskah.htmlBadan).as('htmlSetTextItalic')
        setTextItalic.find('button[title="Italic"]')
            .click()

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type(' Around The World.')
            .find('em')
            .should('contain', ' Around The World.')
    }

    checkPreviewTextNumeric() {
        cy.wait(3000)

        const setTextItalic = cy.get(badan_naskah.htmlBadan).as('htmlSetTextItalic')
        setTextItalic.find('button[title="Italic"]')
            .click()

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{enter}Diharapkan kepada seluruh anggota dapat mengikuti acara tersebut dan mempersiapkan diri sebaik mungkin dengan{enter}')

        const setTextNumericList = cy.get(badan_naskah.htmlBadan).as('htmlSetTextNumericList')
        setTextNumericList.find('div[title="Numbered list"]')
            .click()

        const iframeBadan1 = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan1.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Memakai pakaian bebas dengan tema Around The World{enter}Membawa makanan dengan huruf awal sesuai abjad awal nama masing-masing{enter}')
            .find('ol')
            .should('contain', 'Memakai pakaian bebas dengan tema Around The World')
    }

    insertNewParagraph() {
        cy.wait(3000)

        const setTextNumericList = cy.get(badan_naskah.htmlBadan).as('htmlSetTextNumericList')
        setTextNumericList.find('div[title="Numbered list"]')
            .click()

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Makanan yang dibawa oleh peserta dapat berupa{enter}')
    }

    checkPreviewTextBullet() {
        cy.wait(3000)

        const setTextNumericList = cy.get(badan_naskah.htmlBadan).as('htmlSetTextNumericList')
        setTextNumericList.find('div[title="Numbered list"]')
            .click()

        cy.wait(2000)

        const setTextBulletList = cy.get(badan_naskah.htmlBadan).as('htmlSetTextBulletList')
        setTextBulletList.find('button[title="Bullet list"]')
            .click()

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Makanan berat{enter}Makanan ringan{enter}Snack{enter}')
            .find('ul')
            .should('contain', 'Makanan berat')
    }

    insertTable() {
        cy.wait(3000)

        const setTextBulletList = cy.get(badan_naskah.htmlBadan).as('htmlSetTextBulletList')
        setTextBulletList.find('button[title="Bullet list"]')
            .click()

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Yuk rayakan townhall pada:{enter}')

        const scrollTable = cy.get(badan_naskah.htmlBadan).as('htmlScrollTable')
        scrollTable.find('div[class="tox-toolbar tox-toolbar--scrolling"]')
            .scrollTo(0, 500)

        const btnTable = cy.get(badan_naskah.htmlBadan).as('htmlBtnTable')
        btnTable.find('button[title="Table"]')
            .click()

        cy.wait(3000)

        const pilihTable = cy.get(badan_naskah.htmlBadan).as('htmlPilihTable')
        pilihTable.find('div[class="tox tox-silver-sink tox-tinymce-aux"]')
            .find('div[title="Table"]')
            .click()

        cy.wait(3000)

        const sizeTable = cy.get(badan_naskah.sizeTable).as('sizeTable')
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
        const closeBadanNaskah = cy.get(badan_naskah.closeBadanNaskah).as('closeBadanNaskah')
        closeBadanNaskah.scrollIntoView()
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

    leaveEmptyForm() {
        const previewBadan = cy.get(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360, { force: true })

        const iframeBadan = cy.get(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .clear()

        this.closeBadanNaskah()

        const btnKirim = cy.get(badan_naskah.btnKirim).as('btnKirim')
        btnKirim.should('have.attr', 'disabled', 'disabled')

        menuPage.goToKotakMasukReviewNaskah()
    }

    insertData(textToPaste) {
        cy.wait(6000)

        cy.window().then(win => {
            win.tinyMCE.activeEditor.setContent(textToPaste)
            win.tinyMCE.activeEditor.save()
        })
    }

    insertDataProd(textToPaste) {
        cy.wait(6000)

        cy.window().then(win => {
            win.tinyMCE.activeEditor.setContent(textToPaste)
            win.tinyMCE.activeEditor.save()
        })
    }

}