import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/surat_perintah/drafting_kepala_surat"
import { DraftingSuratPerintahPage } from "../surat_perintah/pgs_drafting_surat_perintah.cy"

const draftingSuratPerintahPage = new DraftingSuratPerintahPage()

const filename = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"
const getJSONRequestFileCreateSuratPerintah = "cypress/fixtures/non_cred/surat_perintah/preview_results_super.json"



export class DraftingKepalaSuratPerintahPage {

// Check 'Kepala Surat' Functions
    aksesFormEditingKepalaSurat() {
        draftingSuratPerintahPage.aksesFormKepalaSurat()
    }

    checkDetailPreview() {
        cy.wait(3000)

        const titlePreviewKepalaSurat = cy.get(kepala_surat.titlePreviewKepalaSurat).as('titlePreviewKepalaSurat')
        titlePreviewKepalaSurat.should('contain', 'SURAT PERINTAH')
            .and('be.visible')

        const previewKepalaLampiran = cy.get(kepala_surat.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.should('contain', 'DASAR')
    }

    checkDetail() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const titleKepalaSurat = cy.get(kepala_surat.titleKepalaSurat).as('titleKepalaSurat')
        titleKepalaSurat.should('contain', 'SURAT PERINTAH')
            .and('be.visible')

        // Penempatan Tujuan Surat 
        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.find('input')
            .should('have.attr', 'placeholder', 'Pilih kode klasifikasi')

        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.should('have.attr', 'placeholder', 'ketik unit pengolah')

        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const selectUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('selectUrgensiSurat')
        selectUrgensiSurat.find('input')
            .should('have.attr', 'placeholder', 'Pilih urgensi surat perintah')

        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        inputPerihal.should('have.attr', 'placeholder', 'ketik perihal surat')

        const fieldDasar = cy.get(kepala_surat.inputDasar).as('fieldDasar')
        fieldDasar.should('be.visible')
    }


    

    // ACTIONS

    // KEPALA SURAT
    // Field Kode Klasifikasi
    inputKodeKlasifikasi(Kode_Klasifikasi) {
        cy.wait(3000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        // Cara dibawah KHUSUS UNTUK FIELD DROPDOWN
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }
            
            // Check if there's already a Kode_Klasifikasi object
            let kodeklasifikasiExists = data.Kepala_Surat.some(item => 'Kode_Klasifikasi' in item);
            
            if (kodeklasifikasiExists) {
                // Update existing Kode_Klasifikasi object
                data.Kepala_Surat.find(item => 'Kode_Klasifikasi' in item).Kode_Klasifikasi = Kode_Klasifikasi;
            } else {
                // Or add a new Kode_Klasifikasi object
                const createKodeKlasifikasi = { Kode_Klasifikasi: Kode_Klasifikasi };
                data.Kepala_Surat.push(createKodeKlasifikasi);
            }
            
            // Write data back to the JSON file
            cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
    
            // Input data into fields
            const inputKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('inputKodeKlasifikasi')
            inputKodeKlasifikasi.wait(1000)
            .type(Kode_Klasifikasi);
        });
        
        const pilihKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('pilihKodeKlasifikasi')
        pilihKodeKlasifikasi.wait(6000)
            .type('{enter}')
    }

    deleteKlasifikasi() {
        cy.wait(3000)

        const deleteFieldKlasifikasi = cy.get(kepala_surat.btnDeleteKodeKlasifikasi).as('deleteFieldKlasifikasi')
        deleteFieldKlasifikasi.click({force: true})
    }
    

    // Field Unit Pengolah
    inputUnitPengolah(dataUnitPengolah) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }
            
            // Input data into fields
            const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
            inputUnitPengolah.wait(1000)
                .type(dataUnitPengolah)
                .invoke('val')  // Extract the value of the input
                .then((inputValueUnitPengolah) => { 
                    // Check if there's already a Tembusan object
                    let unitpengolahExists = data.Kepala_Surat.some(item => 'Unit_Pengolah' in item);
                    
                    if (unitpengolahExists) {
                        // Update existing Tembusan object
                        data.Kepala_Surat.find(item => 'Unit_Pengolah' in item).Unit_Pengolah = inputValueUnitPengolah;
                    } else {
                        // Or add a new Tembusan object
                        const createUnitPengolah = { Unit_Pengolah: inputValueUnitPengolah };
                        data.Kepala_Surat.push(createUnitPengolah);
                    }
                    
                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                })
        });
    }
    
    inputUnitPengolahLongText(dataUnitPengolahLongText) {            
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((object) => {
            const createDataToWrite = {
                Kepala_Surat: []
            }
            
            // Input data into fields
            const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
            inputUnitPengolah.wait(1000)
                .type(dataUnitPengolahLongText)
                .invoke('val')  // Extract the value of the input
                .then((inputValue1) => { // Use the actual value from the input
                    // Construct the sub-object
                    const createTujuan1 = {
                        Unit_Pengolah: inputValue1
                    }
                        
                    // Push the sub-object to the array
                    createDataToWrite.Kepala_Surat.push(createTujuan1)
                    
                    // Write data to the JSON file
                    cy.writeFile(getJSONRequestFileCreateSuratPerintah, createDataToWrite)
                })
            })
        
        const validateUnitPengolahMax150Char = cy.get(kepala_surat.previewUnitPengolah).as('validateUnitPengolahMax150Char')
        validateUnitPengolahMax150Char.wait(1000)
            .invoke('text')
            .then(text => text.trim())
            .should('have.length', 50); 

    }

    pasteUnitPengolahLongText(dataUnitPengolahLongText) {            
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((object) => {
            const createDataToWrite = {
                Kepala_Surat: []
            }
            
            // Input data into fields
            const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
            inputUnitPengolah.clear()
                // Simulating the paste action
                .invoke('val', dataUnitPengolahLongText)
                .trigger('input')  // Trigger input event to notify the application about the change
                .invoke('val')  // Extract the value of the input
                .then((inputValue1) => { // Use the actual value from the input
                    // Construct the sub-object
                    const createTujuan1 = {
                        Unit_Pengolah: inputValue1
                    }
                        
                    // Push the sub-object to the array
                    createDataToWrite.Kepala_Surat.push(createTujuan1)
                    
                    // Write data to the JSON file
                    cy.writeFile(getJSONRequestFileCreateSuratPerintah, createDataToWrite)
                })
            })
        
        const validateUnitPengolahMax150Char = cy.get(kepala_surat.previewUnitPengolah).as('validateUnitPengolahMax150Char')
        validateUnitPengolahMax150Char.click({force: true})
            .wait(1000)
            .invoke('text')
            .then(text => text.trim())
            .should('have.length', 50); 

    }


    // Dropdown Urgensi
    validateUrgensi(Urgensi_Nota_Dinas) {
        cy.wait(3000)

        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        // Cara dibawah KHUSUS UNTUK FIELD DROPDOWN TANPA FIELD TYPE
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }
            
            // Check if there's already a Urgensi_Nota_Dinas object
            let urgensiExists = data.Kepala_Surat.some(item => 'Urgensi_Nota_Dinas' in item);
            
            if (urgensiExists) {
                // Update existing Urgensi_Nota_Dinas object
                data.Kepala_Surat.find(item => 'Urgensi_Nota_Dinas' in item).Urgensi_Nota_Dinas = Urgensi_Nota_Dinas;
            } else {
                // Or add a new Kode_Klasifikasi object
                const createUrgensiSurat = { Urgensi_Nota_Dinas: Urgensi_Nota_Dinas };
                data.Kepala_Surat.push(createUrgensiSurat);
            }
            
            // Write data back to the JSON file
            cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
    
            // Input data into dropdown
            const inputUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('inputUrgensiSurat')
            inputUrgensiSurat.click()
            .wait(5000)
            .contains(Urgensi_Nota_Dinas)
            .click()
        });        
    }

    deleteUrgensi() {
        cy.wait(3000)

        const deleteUrgensiSurat = cy.get(kepala_surat.btnDeleteUrgensiSurat).as('deleteUrgensiSurat')
        deleteUrgensiSurat.click({force: true})
    }


    // Field Perihal
    inputPerihal(hal) {
        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')


        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        inputPerihal.invoke('val')
            .then((val) => {
                if (val) {
                    const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    const perihal = `${hal}`
                    inputPerihal.type(perihal)

                    const inputPerihalUpdate = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    inputPerihalUpdate.invoke('val')
                        .then((val) => {
                            cy.writeFile(filename, { titlePerihal: val })
                        })
                } else {
                    const uuid = () => Cypress._.random(0, 1e6)
                    const id = uuid()
                    const perihal = `Automation Testing ${id} ${hal}`

                    const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    inputPerihal.type(perihal)
                    cy.writeFile(filename, { titlePerihal: perihal })
                }
            })
        cy.wait(5000)
    }
    
    deletePerihal() {
        cy.wait(2000)

        const deletePerihal = cy.get(kepala_surat.inputPerihal).as('deletePerihal')
        deletePerihal.type("{selectall}{backspace}{esc}")
    }

    //Field Dasar
    inputTableOnDasar() {
        draftingSuratPerintahPage.aksesFormKepalaSurat()

        cy.wait(3000)

        const setTextBulletList = cy.get(kepala_surat.inputDasar).as('htmlSetTextBulletList')
        setTextBulletList.find('button[title="Bullet list"]')
            .click({ force: true })

        const iframeDasar = cy.get(kepala_surat.inputDasar).as('inputDasar')
        iframeDasar.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('Yuk rayakan townhall pada:{enter}')

        const scrollTable = cy.get(kepala_surat.inputDasar).as('htmlScrollTable')
        scrollTable.find('div[class="tox-toolbar tox-toolbar--scrolling"]')
            .scrollTo(0, 500)

        const btnTable = cy.get(kepala_surat.inputDasar).as('htmlBtnTable')
        btnTable.find('button[title="Table"]')
            .click()

        cy.wait(3000)

        const pilihTable = cy.get(kepala_surat.getTableTinyMCE).as('htmlPilihTable')
        pilihTable.click()

        cy.wait(3000)

        const sizeTable = cy.get(kepala_surat.sizeTable).as('sizeTable')
        sizeTable.should('be.visible')
            .click({ force: true })


        cy.wait(3000)
    }

    clearDasarField() {
        const clearallDasarField = cy.get(kepala_surat.inputDasar).as('clearallDasarField')
        clearallDasarField.find('iframe')
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap)
        .type('{ctrl}a{del}', { delay: 100 });    
    }


    inputBoldTextOnDasar(dataBoldText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Dasar' is a property on JSON data object
          if (!data.Dasar) {
            data.Dasar = [{}];
          }
      
          // Find and click the 'Bold' button
          const btnBoldFormat = cy.get(kepala_surat.inputDasar).scrollIntoView()
          .find('button[title="Bold"]').as('btnBoldFormat')
          btnBoldFormat.click();
      
          cy.wait(3000);
      
          // Find the iframe for input and switch context to it
          const iframeDasar = cy.get(kepala_surat.inputDasar).find('iframe').as('iframeDasar')

          iframeDasar.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataBoldText)
                .invoke('text')
                .then((boldText) => {
                  // Assign the boldText to the JSON data
                  data.Dasar[0].Dasar_Bold = boldText;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // Check the iframe for preview
  
            const checkPreviewDasar = cy.get(kepala_surat.previewDasar).as('checkPreviewDasar')
            .should('be.visible');

            // Assert that the strong tag within the preview contains the correct bold text
            checkPreviewDasar.find('strong')
            .should('have.text', data.Dasar[0].Dasar_Bold)
        })
    }


    inputItalicTextOnDasar(dataItalicText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Dasar' is a property on JSON data object
          if (!data.Dasar) {
            data.Dasar = [];
          }
      
          // Find and click the 'Italic' button
          const btnItalicFormat = cy.get(kepala_surat.inputDasar).scrollIntoView()
          .find('button[title="Italic"]').as('btnItalicFormat')
          btnItalicFormat.click();
      
          cy.wait(3000);
      
          // Find the iframe for input and switch context to it
          const iframeDasar = cy.get(kepala_surat.inputDasar).find('iframe').as('iframeDasar')

          iframeDasar.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataItalicText)
                .invoke('text')
                .then((italicText) => {
                // Ensure that the second item of 'Dasar' array is an object
                data.Dasar[1] = data.Dasar[1] || {}; // <-- This line ensures that data.Dasar[1] is an object
                // Assign the italicText to the JSON data
                data.Dasar[1].Dasar_Italic = italicText;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // Check the iframe for preview
  
            const checkPreviewDasar = cy.get(kepala_surat.previewDasar).as('checkPreviewDasar')
            .should('be.visible');

            // Assert that the italic tag within the preview contains the correct italic text
            checkPreviewDasar.find('em')
            .should('have.text', data.Dasar[1].Dasar_Italic)
        })
    }
     
    
    inputFreeTextOnDasar(dataFreeText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Dasar' is a property on JSON data object
          if (!data.Dasar) {
            data.Dasar = [];
          }
      
          cy.wait(1000);
      
          // Find the iframe for input and switch context to it
          const iframeDasar = cy.get(kepala_surat.inputDasar).find('iframe').as('iframeDasar')

          iframeDasar.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataFreeText)
                .invoke('text')
                .then((freeText) => {
                // Ensure that the second item of 'Dasar' array is an object
                data.Dasar[2] = data.Dasar[2] || {}; // <-- This line ensures that data.Dasar[1] is an object
                // Assign the freeText to the JSON data
                data.Dasar[2].Dasar_Free_Text = freeText;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // Check the iframe for preview
  
            const checkPreviewDasar = cy.get(kepala_surat.previewDasar).as('checkPreviewDasar')
            .should('be.visible');

            // Assert that the text within the preview contains the correct Free text
            checkPreviewDasar.invoke('text')
            .then((text) => {
              // Use trim to remove whitespace from the start and end of the text content
              const trimmedText = text.trim()
              // Now use the include assertion to check if the trimmed text includes the expected text
              expect(trimmedText).to.include(data.Dasar[2].Dasar_Free_Text.trim())
            })
        })
    }
        

    inputWhitespaceOnTextInDasar(dataWhitespaceText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Dasar' is a property on JSON data object
          if (!data.Dasar) {
            data.Dasar = [];
          }
      
          cy.wait(1000);
      
          // Find the iframe for input and switch context to it
          const iframeDasar = cy.get(kepala_surat.inputDasar).find('iframe').as('iframeDasar')

          iframeDasar.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataWhitespaceText)
                .invoke('text')
                .then((whitespaceText) => {
                // Ensure that the second item of 'Dasar' array is an object
                data.Dasar[3] = data.Dasar[3] || {}; // <-- This line ensures that data.Dasar[1] is an object
                // Assign the whitespaceText to the JSON data
                data.Dasar[3].Dasar_Whitespace_Text = whitespaceText;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        // Load the updated data and perform assertions
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            const previewDasarSelector = kepala_surat.previewDasar; // Replace with actual selector for the preview container
            cy.get(previewDasarSelector).should('be.visible').then(($preview) => {
                const previewText = $preview.text().trim();
                expect(previewText).to.include(data.Dasar[3].Dasar_Whitespace_Text.trim());

                // Check if the first <br> tag is present within the preview element
                const firstBr = $preview.find('br:first');
                if (firstBr.length) {
                    throw new Error('Unexpected first whitespace <br> tag found');
                }
            });
        });
    }

    

    


    // for After Functions
    closeKepalaSurat() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        cy.wait(2000)

        const closeKepalaSurat = cy.get(kepala_surat.closeKepalaSurat).as('closeKepalaSurat')
        closeKepalaSurat.should('be.visible')
            .click()

    draftingSuratPerintahPage.validateFormDefault()
    }

    closeLampiranKepalaSurat() {
        const btnLampiranKepalaSurat = cy.get(kepala_surat.closeLampiranKepalaSurat).as('btnLampiranKepalaSurat')
        btnLampiranKepalaSurat.scrollIntoView()
            .should('be.visible')
            .click()

    draftingSuratPerintahPage.validateFormDefault()
    }


}