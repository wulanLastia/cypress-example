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

    inputLampiranSurat() {
        draftingKonsepNaskahPage.inputLampiranSurat()

        const iframeLampiran = cy.get(lampiran_surat.htmlLampiran).as('htmlLampiran')
        iframeLampiran.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Lampiran 1{enter}{enter}')
            .type('Cras non odio diam. Nulla ex urna, scelerisque sed pretium in, facilisis ut sapien. Donec et orci nisl. Integer egestas finibus est eu pellentesque. Sed nisi eros, consectetur at est sed, posuere consequat velit. Curabitur ac rhoncus quam. In porttitor aliquam porttitor. Phasellus ultrices vehicula magna, nec faucibus ex rutrum et. Nam eget orci sed neque mollis tempor. Mauris vitae pellentesque eros. Nullam nec felis lobortis risus ornare sagittis.Nullam egestas in nibh sit amet sodales.Maecenas ut mauris ut massa sodales pretium.Integer nulla arcu, feugiat ut ante id, dictum sodales nunc.Etiam vitae lorem laoreet, tincidunt arcu euismod, auctor justo.In commodo nec ipsum in aliquam.Praesent porttitor nunc sit amet sapien eleifend, vel imperdiet ligula facilisis.Donec eget viverra lorem.Maecenas suscipit dolor elit, in volutpat purus luctus non.Aenean elit libero, dapibus non velit id, molestie ultrices eros.Etiam tempus metus urna, ut condimentum purus lobortis vel.')
    }

    inputLampiranSurat2() {
        draftingKonsepNaskahPage.inputLampiranSurat2()

        const iframeLampiran = cy.get(lampiran_surat.htmlLampiran).as('htmlLampiran')
        iframeLampiran.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Lampiran 2{enter}{enter}')
            .type('Cras non odio diam. Nulla ex urna, scelerisque sed pretium in, facilisis ut sapien. Donec et orci nisl. Integer egestas finibus est eu pellentesque. Sed nisi eros, consectetur at est sed, posuere consequat velit. Curabitur ac rhoncus quam. In porttitor aliquam porttitor. Phasellus ultrices vehicula magna, nec faucibus ex rutrum et. Nam eget orci sed neque mollis tempor. Mauris vitae pellentesque eros. Nullam nec felis lobortis risus ornare sagittis.Nullam egestas in nibh sit amet sodales.Maecenas ut mauris ut massa sodales pretium.Integer nulla arcu, feugiat ut ante id, dictum sodales nunc.Etiam vitae lorem laoreet, tincidunt arcu euismod, auctor justo.In commodo nec ipsum in aliquam.Praesent porttitor nunc sit amet sapien eleifend, vel imperdiet ligula facilisis.Donec eget viverra lorem.Maecenas suscipit dolor elit, in volutpat purus luctus non.Aenean elit libero, dapibus non velit id, molestie ultrices eros.Etiam tempus metus urna, ut condimentum purus lobortis vel.')
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
        btnCloseLampiran.should('be.visible')
            .click({ force: true })
    }

    scrollPreviewPage() {
        draftingKonsepNaskahPage.scrollPreviewPage()
    }

}