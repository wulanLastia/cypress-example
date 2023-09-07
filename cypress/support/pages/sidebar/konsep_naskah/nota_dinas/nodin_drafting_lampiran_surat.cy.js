import lampiran_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_lampiran_surat"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

const getJSONRequestFileCreateNotaDinas = "cypress/fixtures/JSON/1_internal/create/untuk-create-data-nota_dinas.json"

export class DraftingLampiranSuratPage {

    aksesFormEditingLampiranSurat() {
        const scrollPreview = cy.xpath(lampiran_surat.scrollPreview).as('scrollPreview')
        scrollPreview.scrollTo('bottom')

        const btnBuatLampiran = cy.xpath(lampiran_surat.btnBuatLampiran).as('btnBuatLampiran')
        btnBuatLampiran.should('contain', 'Buat Lampiran')
            .click({ force: true })
    }

    aksesFormEditingLampiranSuratke2() {
        const scrollPreview = cy.xpath(lampiran_surat.scrollPreview).as('scrollPreview')
        scrollPreview.scrollTo('bottom')

        const btnBuatLampiran2 = cy.xpath(lampiran_surat.btnBuatLampiran2).as('btnBuatLampiran2')
        btnBuatLampiran2.should('contain', 'Buat Lampiran')
            .click()
    }

    checkDetail() {
        draftingKonsepNaskahPage.inputLampiranSuratNotaDinas()
        cy.wait(3000)

        const subtitleLampiran = cy.get(lampiran_surat.subtitleLampiranNotaDinas).as('subtitleLampiran')
        subtitleLampiran.should('contain', 'Format Lampiran Halaman')

        const radio1 = cy.xpath(lampiran_surat.radio1NotaDinas).as('radio1')
        radio1.should('be.checked')

        const labelRadio1 = cy.xpath(lampiran_surat.labelRadio1).as('labelRadio1')
        labelRadio1.should('contain', 'Portrait')

        const titleIsi = cy.xpath(lampiran_surat.titleIsi).as('titleIsi')
        titleIsi.should('contain', 'Isi Lampiran')

        const iframeLampiran = cy.xpath(lampiran_surat.htmlLampiran).as('htmlLampiran')
        iframeLampiran.its('0.contentDocument.body')
            .should('be.visible')

        this.closeLampiran()
    }

    checkDetail2() {
        draftingKonsepNaskahPage.inputLampiran2SuratNotaDinas()
        cy.wait(3000)

        const subtitleLampiran = cy.xpath(lampiran_surat.subtitleLampiran).as('subtitleLampiran')
        subtitleLampiran.should('contain', 'Format Lampiran Halaman')

        const radio1 = cy.xpath(lampiran_surat.radio1).as('radio1')
        radio1.should('be.checked')

        const labelRadio1 = cy.xpath(lampiran_surat.labelRadio1).as('labelRadio1')
        labelRadio1.should('contain', 'Portrait')

        const titleIsi = cy.xpath(lampiran_surat.titleIsi).as('titleIsi')
        titleIsi.should('contain', 'Isi Lampiran')

        const iframeLampiran = cy.xpath(lampiran_surat.htmlLampiran).as('htmlLampiran')
        iframeLampiran.its('0.contentDocument.body')
            .should('be.visible')

        this.closeLampiran()
    }





    // ACTIONS

    // LAMPIRAN SURAT
    // Input Lampiran Surat
    inputLampiranSurat() {
        draftingKonsepNaskahPage.inputLampiranSuratNotaDinas()

        const iframeLampiran = cy.get(lampiran_surat.htmlLampiranNotaDinas).as('htmlLampiran')
        iframeLampiran.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Lampiran 1{enter}{enter}')
            .type('Cras non odio diam. Nulla ex urna, scelerisque sed pretium in, facilisis ut sapien. Donec et orci nisl. Integer egestas finibus est eu pellentesque. Sed nisi eros, consectetur at est sed, posuere consequat velit. Curabitur ac rhoncus quam. In porttitor aliquam porttitor. Phasellus ultrices vehicula magna, nec faucibus ex rutrum et. Nam eget orci sed neque mollis tempor. Mauris vitae pellentesque eros. Nullam nec felis lobortis risus ornare sagittis.Nullam egestas in nibh sit amet sodales.Maecenas ut mauris ut massa sodales pretium.Integer nulla arcu, feugiat ut ante id, dictum sodales nunc.Etiam vitae lorem laoreet, tincidunt arcu euismod, auctor justo.In commodo nec ipsum in aliquam.Praesent porttitor nunc sit amet sapien eleifend, vel imperdiet ligula facilisis.Donec eget viverra lorem.Maecenas suscipit dolor elit, in volutpat purus luctus non.Aenean elit libero, dapibus non velit id, molestie ultrices eros.Etiam tempus metus urna, ut condimentum purus lobortis vel.')

            cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
                // If there's no Lampiran_Surat entry, initialize one
                if (!data.Lampiran_Surat) {
                    data.Lampiran_Surat = [];
                }
                
                // Input data into fields
                const scrappingLampiran1 = cy.get(lampiran_surat.scrappingWordsLampiran1).as('scrappingLampiran1')
                scrappingLampiran1.wait(1000)
                    .invoke('text')  // Extract the value of the input
                    .then((inputValuesLampiran1) => { 
                        // Check if there's already a Tembusan object
                        let lampiranExists = data.Lampiran_Surat.some(item => 'Lampiran1' in item);
                        
                        if (lampiranExists) {
                            // Update existing Tembusan object
                            data.Lampiran_Surat.find(item => 'Lampiran1' in item).Lampiran1 = inputValuesLampiran1;
                        } else {
                            // Or add a new Tembusan object
                            const createLampiran1 = { Lampiran1: inputValuesLampiran1 };
                            data.Lampiran_Surat.push(createLampiran1);
                        }
                        
                        // Write data back to the JSON file
                        cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                    })
            });
    
    }



    
    inputLampiranSurat2() {
        draftingKonsepNaskahPage.inputLampiranSurat2()

        const iframeLampiran = cy.get(lampiran_surat.htmlLampiranNotaDinas).as('htmlLampiran')
        iframeLampiran.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Lampiran 2{enter}{enter}')
            .type('Cras non odio diam. Nulla ex urna, scelerisque sed pretium in, facilisis ut sapien. Donec et orci nisl. Integer egestas finibus est eu pellentesque. Sed nisi eros, consectetur at est sed, posuere consequat velit. Curabitur ac rhoncus quam. In porttitor aliquam porttitor. Phasellus ultrices vehicula magna, nec faucibus ex rutrum et. Nam eget orci sed neque mollis tempor. Mauris vitae pellentesque eros. Nullam nec felis lobortis risus ornare sagittis.Nullam egestas in nibh sit amet sodales.Maecenas ut mauris ut massa sodales pretium.Integer nulla arcu, feugiat ut ante id, dictum sodales nunc.Etiam vitae lorem laoreet, tincidunt arcu euismod, auctor justo.In commodo nec ipsum in aliquam.Praesent porttitor nunc sit amet sapien eleifend, vel imperdiet ligula facilisis.Donec eget viverra lorem.Maecenas suscipit dolor elit, in volutpat purus luctus non.Aenean elit libero, dapibus non velit id, molestie ultrices eros.Etiam tempus metus urna, ut condimentum purus lobortis vel.')



        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Lampiran_Surat entry, initialize one
            if (!data.Lampiran_Surat) {
                data.Lampiran_Surat = [];
            }
            
            // Input data into fields
            const scrappingLampiran1 = cy.get(lampiran_surat.scrappingWordsLampiran1).as('scrappingLampiran1')
            scrappingLampiran1.wait(1000)
                .invoke('text')  // Extract the value of the input
                .then((inputValuesLampiran1) => { 
                    // Check if there's already a Tembusan object
                    let lampiranExists = data.Lampiran_Surat.some(item => 'Lampiran1' in item);
                    
                    if (lampiranExists) {
                        // Update existing Tembusan object
                        data.Lampiran_Surat.find(item => 'Lampiran1' in item).Lampiran1 = inputValuesLampiran1;
                    } else {
                        // Or add a new Tembusan object
                        const createLampiran1 = { Lampiran1: inputValuesLampiran1 };
                        data.Lampiran_Surat.push(createLampiran1);
                    }
                    
                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });
        
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
            .click()
    }

    scrollPreviewPage() {
        draftingKonsepNaskahPage.scrollPreviewPage()
    }


}