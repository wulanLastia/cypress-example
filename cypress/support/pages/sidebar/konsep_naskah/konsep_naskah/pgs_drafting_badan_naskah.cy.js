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
        const previewBadan = cy.xpath(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360)

        const titleBadan = cy.get(badan_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    inputBadanNaskah() {
        const previewBadan = cy.xpath(badan_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 420)

        const titleBadan = cy.get(badan_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    checkPreviewTextBold() {
        cy.wait(3000)

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
        cy.wait(3000)

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
        cy.wait(3000)

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
            .type('Memakai pakaian bebas dengan tema Around The World{enter}Membawa makanan dengan huruf awal sesuai abjad awal nama masing-masing{enter}')
            .find('ol')
            .should('contain', 'Memakai pakaian bebas dengan tema Around The World')
    }

    insertNewParagraph() {
        cy.wait(3000)

        const setTextNumericList = cy.xpath(badan_naskah.setTextNumericList).as('setTextNumericList')
        setTextNumericList.click()

        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Makanan yang dibawa oleh peserta dapat berupa{enter}')
    }

    checkPreviewTextBullet() {
        cy.wait(3000)

        const setTextNumericList = cy.xpath(badan_naskah.setTextNumericList).as('setTextNumericList')
        setTextNumericList.click()

        const setTextBulletList = cy.xpath(badan_naskah.setTextBulletList).as('setTextNumericList')
        setTextBulletList.click()

        const iframeBadan1 = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan1.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Makanan berat{enter}Makanan ringan{enter}Snack{enter}')
            .find('ul')
            .should('contain', 'Makanan berat')
    }

    insertTable() {
        cy.wait(3000)

        const setTextBulletList = cy.xpath(badan_naskah.setTextBulletList).as('setTextNumericList')
        setTextBulletList.click()

        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Yuk rayakan townhall pada:{enter}')

        const scrollTable = cy.xpath(badan_naskah.scrollTable).as('scrollTable')
        scrollTable.scrollTo(0, 500)

        const btnTable = cy.xpath(badan_naskah.btnTable).as('btnTable')
        btnTable.click()

        cy.wait(3000)

        const pilihTable = cy.xpath(badan_naskah.pilihTable).as('pilihTable')
        pilihTable.click()

        cy.wait(3000)

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
        const closeBadanNaskah = cy.get(badan_naskah.closeBadanNaskah).as('closeBadanNaskah')
        closeBadanNaskah.click()

        draftingKonsepNaskahPage.validateFormDefault()
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
        btnKirim.should('have.attr', 'disabled', 'disabled')

        menuPage.goToKotakMasukReviewNaskah()
    }

    insertDataPDF() {
        const iframeBadan = cy.xpath(badan_naskah.htmlBadan).as('htmlBadan')
        iframeBadan.its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna risus, auctor id fermentum nec, tristique sed nulla. Aliquam quis risus turpis. Nam aliquet eros erat, eget ornare mi gravida vel. Nunc id fermentum mauris. Vivamus ornare turpis vel luctus lobortis. Ut et tellus pellentesque, faucibus erat in, semper mauris. Quisque id purus non dolor pharetra pellentesque. Aliquam a est ultricies, pretium ante at, faucibus quam. Sed lorem nulla, gravida quis convallis eget, fermentum ac augue. Nulla fermentum laoreet urna vitae venenatis. Morbi pellentesque gravida lectus nec fringilla.{enter}Nunc et turpis vel quam volutpat gravida eget non erat.Cras lacinia nec mauris et interdum.Mauris ut finibus mauris.Duis blandit nibh sit amet sapien malesuada, sit amet fermentum neque vulputate.Mauris eu tristique odio, tincidunt eleifend libero.Morbi porta nulla ex, ut pretium lectus sollicitudin nec.Nulla ultrices a arcu eu porta.In a diam suscipit, volutpat ante a, consequat augue.Integer ornare massa eu nunc fringilla, non feugiat neque euismod.Ut quis neque at diam pretium fringilla.Quisque mi ante, lacinia pulvinar mi in, laoreet elementum massa.Aenean eget massa id nulla vestibulum porttitor.Mauris mollis tincidunt metus, et luctus sapien eleifend id.Nullam volutpat ut dui at fringilla.{enter}Maecenas lacinia et nibh et suscipit.Integer eget nulla eget ex commodo fringilla ut tristique lacus.Fusce auctor lectus ut augue imperdiet, ut bibendum orci pellentesque.Nulla sollicitudin elit pharetra ex convallis, sed aliquam ipsum iaculis.Pellentesque scelerisque ipsum eget nibh ornare, at rutrum erat aliquet.Nunc tempus, nulla at volutpat elementum, libero diam fermentum velit, dignissim ornare velit elit nec justo.Donec nec est laoreet, tincidunt est vitae, scelerisque nibh.Curabitur gravida ac mauris sed porta.Proin a velit vel elit dignissim tincidunt vel ut tortor.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Suspendisse suscipit vestibulum purus, ut mollis magna pellentesque non.{enter}')
            .type('{enter}{enter}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna risus, auctor id fermentum nec, tristique sed nulla. Aliquam quis risus turpis. Nam aliquet eros erat, eget ornare mi gravida vel. Nunc id fermentum mauris. Vivamus ornare turpis vel luctus lobortis. Ut et tellus pellentesque, faucibus erat in, semper mauris. Quisque id purus non dolor pharetra pellentesque. Aliquam a est ultricies, pretium ante at, faucibus quam. Sed lorem nulla, gravida quis convallis eget, fermentum ac augue. Nulla fermentum laoreet urna vitae venenatis. Morbi pellentesque gravida lectus nec fringilla.{enter}Nunc et turpis vel quam volutpat gravida eget non erat.Cras lacinia nec mauris et interdum.Mauris ut finibus mauris.Duis blandit nibh sit amet sapien malesuada, sit amet fermentum neque vulputate.Mauris eu tristique odio, tincidunt eleifend libero.Morbi porta nulla ex, ut pretium lectus sollicitudin nec.Nulla ultrices a arcu eu porta.In a diam suscipit, volutpat ante a, consequat augue.Integer ornare massa eu nunc fringilla, non feugiat neque euismod.Ut quis neque at diam pretium fringilla.Quisque mi ante, lacinia pulvinar mi in, laoreet elementum massa.Aenean eget massa id nulla vestibulum porttitor.Mauris mollis tincidunt metus, et luctus sapien eleifend id.Nullam volutpat ut dui at fringilla.{enter}Maecenas lacinia et nibh et suscipit.Integer eget nulla eget ex commodo fringilla ut tristique lacus.Fusce auctor lectus ut augue imperdiet, ut bibendum orci pellentesque.Nulla sollicitudin elit pharetra ex convallis, sed aliquam ipsum iaculis.Pellentesque scelerisque ipsum eget nibh ornare, at rutrum erat aliquet.Nunc tempus, nulla at volutpat elementum, libero diam fermentum velit, dignissim ornare velit elit nec justo.Donec nec est laoreet, tincidunt est vitae, scelerisque nibh.Curabitur gravida ac mauris sed porta.Proin a velit vel elit dignissim tincidunt vel ut tortor.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Suspendisse suscipit vestibulum purus, ut mollis magna pellentesque non.{enter}')
            .type('{enter}{enter}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna risus, auctor id fermentum nec, tristique sed nulla. Aliquam quis risus turpis. Nam aliquet eros erat, eget ornare mi gravida vel. Nunc id fermentum mauris. Vivamus ornare turpis vel luctus lobortis. Ut et tellus pellentesque, faucibus erat in, semper mauris. Quisque id purus non dolor pharetra pellentesque. Aliquam a est ultricies, pretium ante at, faucibus quam. Sed lorem nulla, gravida quis convallis eget, fermentum ac augue. Nulla fermentum laoreet urna vitae venenatis. Morbi pellentesque gravida lectus nec fringilla.{enter}Nunc et turpis vel quam volutpat gravida eget non erat.Cras lacinia nec mauris et interdum.Mauris ut finibus mauris.Duis blandit nibh sit amet sapien malesuada, sit amet fermentum neque vulputate.Mauris eu tristique odio, tincidunt eleifend libero.Morbi porta nulla ex, ut pretium lectus sollicitudin nec.Nulla ultrices a arcu eu porta.In a diam suscipit, volutpat ante a, consequat augue.Integer ornare massa eu nunc fringilla, non feugiat neque euismod.Ut quis neque at diam pretium fringilla.Quisque mi ante, lacinia pulvinar mi in, laoreet elementum massa.Aenean eget massa id nulla vestibulum porttitor.Mauris mollis tincidunt metus, et luctus sapien eleifend id.Nullam volutpat ut dui at fringilla.')
    }
}