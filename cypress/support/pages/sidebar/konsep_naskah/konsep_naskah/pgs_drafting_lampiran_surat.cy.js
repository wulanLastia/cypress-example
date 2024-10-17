import lampiran_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_lampiran_surat"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingLampiranSuratPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingLampiranSurat() {
        cy.wait(3000)

        const scrollPreview = cy.xpath(lampiran_surat.scrollPreview).as('scrollPreview')
        scrollPreview.scrollTo('bottom')

        const btnBuatLampiran = cy.get(lampiran_surat.btnBuatLampiran).as('btnBuatLampiran')
        btnBuatLampiran.should('contain', 'Buat Lampiran')
            .click({ force: true })
    }

    aksesFormEditingLampiranSurat2() {
        const scrollPreview = cy.xpath(lampiran_surat.scrollPreview).as('scrollPreview')
        scrollPreview.scrollTo('bottom')

        const btnBuatLampiran = cy.get(lampiran_surat.btnBuatLampiran).as('btnBuatLampiran')
        btnBuatLampiran.should('contain', 'Buat Lampiran')
            .click({ force: true })
    }

    checkDetail() {
        draftingKonsepNaskahPage.inputLampiranSurat()

        const titleLampiran = cy.get(lampiran_surat.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Lampiran')

        const subtitleLampiran = cy.get(lampiran_surat.subtitleLampiran).as('subtitleLampiran')
        subtitleLampiran.should('contain', 'Format Lampiran Halaman')

        const radio1 = cy.get(lampiran_surat.radio1).as('radio1')
        radio1.find('input').should('be.checked')

        const labelRadio1 = cy.get(lampiran_surat.labelRadio1).as('labelRadio1')
        labelRadio1.should('contain', 'Portrait')

        const titleIsi = cy.get(lampiran_surat.titleIsi).as('titleIsi')
        titleIsi.should('contain', 'Isi Lampiran')

        const iframeLampiran = cy.get(lampiran_surat.htmlLampiran).as('htmlLampiran')
        iframeLampiran.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')

        this.closeLampiran()
    }

    inputLampiranSurat(textToPaste) {
        draftingKonsepNaskahPage.inputLampiranSurat()

        cy.wait(8000)

        cy.window().then(win => {
            win.tinyMCE.activeEditor.setContent(textToPaste)
            win.tinyMCE.activeEditor.save()
        })
    }

    inputLampiranSurat2(textToPaste) {
        draftingKonsepNaskahPage.inputLampiranSurat2()

        cy.wait(8000)

        cy.window().then(win => {
            win.tinyMCE.activeEditor.setContent(textToPaste)
            win.tinyMCE.activeEditor.save()
        })
    }

    hapusLampiranSurat() {
        const scrollPreview = cy.xpath(lampiran_surat.scrollPreview).as('scrollPreview')
        scrollPreview.scrollTo('right')

        const btnHapusLampiran = cy.xpath(lampiran_surat.btnHapusLampiran).as('btnHapusLampiran')
        btnHapusLampiran.should('be.visible')
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

    closeLampiran() {
        const scrollLampiran = cy.xpath(lampiran_surat.scrollLampiran).as('scrollLampiran')
        scrollLampiran.scrollTo('top')

        const btnCloseLampiran = cy.get(lampiran_surat.btnCloseLampiran).as('btnCloseLampiran')
        btnCloseLampiran.scrollIntoView()
            .click()
    }

    scrollPreviewPage() {
        draftingKonsepNaskahPage.scrollPreviewPage()
    }

}