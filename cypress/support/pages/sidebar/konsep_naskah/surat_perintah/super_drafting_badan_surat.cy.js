import badan_surat from "@selectors/sidebar/konsep_naskah/surat_perintah/drafting_badan_surat.js"
import { DraftingSuratPerintahPage } from "../surat_perintah/pgs_drafting_surat_perintah.cy"

const draftingSuratPerintahPage = new DraftingSuratPerintahPage()

const filename = "cypress/fixtures/non_cred/badan_surat/badan_surat_temp_data.json"
const getJSONRequestFileCreateSuratPerintah = "cypress/fixtures/non_cred/surat_perintah/preview_results_super.json"



export class DraftingBadanSuratPerintahPage {
    // Check 'Badan Surat' Functions
    aksesFormEditingBadanSurat() {
        draftingSuratPerintahPage.aksesBadanNaskah()
    }


    // Untuk Field
    inputXSpacing(dataXSpacing) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Untuk' is a property on JSON data object
          if (!data.Untuk) {
            data.Untuk = [{}];
          }
      
          cy.wait(1000);
      
          // Find the iframe for input and switch context to it
          const iframeUntuk = cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')

          iframeUntuk.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataXSpacing)
                .invoke('text')
                .then((xSpacing) => {
                // Assign the boldText to the JSON data
                data.Untuk[0].Indent_of_Paragraph_X_Spacing = xSpacing;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // Check the iframe for preview
  
            const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk')
            .should('be.visible');

            // Assert that the text within the preview contains the correct Free text
            checkPreviewUntuk.invoke('text')
            .then((text) => {
              // Use trim to remove whitespace from the start and end of the text content
              const trimmedText = text.trim()
              // Now use the include assertion to check if the trimmed text includes the expected text
              expect(trimmedText).to.include(data.Untuk[0].Indent_of_Paragraph_X_Spacing.trim())
            })
        })
    }


    inputBoldTextOnUntuk(dataBoldText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Untuk' is a property on JSON data object
          if (!data.Untuk) {
            data.Untuk = [];
          }
      
          // Find and click the 'Bold' button
          const btnBoldFormat = cy.get(badan_surat.inputUntuk).scrollIntoView()
          .find('button[title="Bold"]').as('btnBoldFormat')
          btnBoldFormat.click();
      
          cy.wait(3000);
      
        // Type into the iframe
        cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')
        .then($iframe => {
            const doc = $iframe[0].contentDocument;
            const body = doc.body;
            cy.wrap(body).as('iframeBody')
                .type(dataBoldText);

            // Assign the bold text to the JSON data
            data.Untuk[1] = data.Untuk[1] || {};
            data.Untuk[1].Untuk_Bold = dataBoldText; // Assigning dataBoldText directly

            // Write the updated data object back to the file
            cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            })
        })
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // Check the iframe for preview
  
            const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk')
            .should('be.visible');

            // Assert that the strong tag within the preview contains the correct bold text
            checkPreviewUntuk.find('strong')
            .should('have.text', data.Untuk[1].Untuk_Bold)
        })
    }


    inputItalicTextOnUntuk(dataItalicText) {
      cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
        // 'Untuk' is a property on JSON data object
        if (!data.Untuk) {
          data.Untuk = [];
        }
    
        // Find and click the 'Italic' button
        const btnItalicFormat = cy.get(badan_surat.inputUntuk).scrollIntoView()
        .find('button[title="Italic"]').as('btnItalicFormat')
        btnItalicFormat.click();
    
        cy.wait(3000);
    
      // Type into the iframe
      cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')
      .then($iframe => {
          const doc = $iframe[0].contentDocument;
          const body = doc.body;
          cy.wrap(body).as('iframeBody')
              .type(dataItalicText);

          // Assign the italic text to the JSON data
          data.Untuk[2] = data.Untuk[2] || {};
          data.Untuk[2].Untuk_Italic = dataItalicText; // Assigning dataItalicText directly

          // Write the updated data object back to the file
          cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
          })
      })
    
      // check the preview
      cy.wait(5000); // Wait for any asynchronous processes to complete
    
      cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // Check the iframe for preview

          const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk')
          .should('be.visible');

          // Assert that the strong tag within the preview contains the correct italic text
          checkPreviewUntuk.find('em')
          .should('have.text', data.Untuk[2].Untuk_Italic)
      })
  }


  inputNumericListTextOnUntuk(dataNumericListText1, dataNumericListText2, dataNumericListText3) {
    cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
        if (!data.Untuk) {
            data.Untuk = [];
        }

        const btnNumericListFormat = cy.get(badan_surat.inputUntuk).scrollIntoView()
            .find('div[title="Numbered list"] span.tox-icon').as('btnNumericListFormat');
        btnNumericListFormat.click({ force: true });

        cy.wait(3000);

        cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')
            .then($iframe => {
                const doc = $iframe[0].contentDocument;
                const body = doc.body;
                cy.wrap(body).as('iframeBody')
                    .type(dataNumericListText1)
                    .type('{enter}')
                    .type(dataNumericListText2)
                    .type('{enter}')
                    .type(dataNumericListText3);

                data.Untuk[3] = { 
                    "Untuk_Numeric_List1": dataNumericListText1, 
                    "Untuk_Numeric_List2": dataNumericListText2, 
                    "Untuk_Numeric_List3": dataNumericListText3 
                };

                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            });
    });

    // Check the preview
    cy.wait(5000);

    cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
        const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk')
            .should('be.visible');

        // Assert that the numeric list in the preview matches the expected text
        checkPreviewUntuk.find('ol').within(() => {
            cy.get('li').eq(0).should('contain', data.Untuk[3].Untuk_Numeric_List1);
            cy.get('li').eq(1).should('contain', data.Untuk[3].Untuk_Numeric_List2);
            cy.get('li').eq(2).should('contain', data.Untuk[3].Untuk_Numeric_List3);
        });
    });
 }


    inputBulletListTextOnUntuk(dataBulletListText1, dataBulletListText2, dataBulletListText3) {
    cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
        if (!data.Untuk) {
            data.Untuk = [];
        }

        const btnBulletListFormat = cy.get(badan_surat.inputUntuk).scrollIntoView()
            .find('button[title="Bullet list"]').as('btnBulletListFormat');
        btnBulletListFormat.click({ force: true });

        cy.wait(3000);

        cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')
            .then($iframe => {
                const doc = $iframe[0].contentDocument;
                const body = doc.body;
                cy.wrap(body).as('iframeBody')
                    .type(dataBulletListText1)
                    .type('{enter}')
                    .type(dataBulletListText2)
                    .type('{enter}')
                    .type(dataBulletListText3);

                data.Untuk[4] = { 
                    "Untuk_Bullet_List1": dataBulletListText1, 
                    "Untuk_Bullet_List2": dataBulletListText2, 
                    "Untuk_Bullet_List3": dataBulletListText3 
                };

                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            });
            });

        // Check the preview
        cy.wait(5000);

        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk')
                .should('be.visible');

            // Assert that the bullet list in the preview matches the expected text
            checkPreviewUntuk.find('ul').within(() => {
                cy.get('li').eq(0).should('contain', data.Untuk[4].Untuk_Bullet_List1);
                cy.get('li').eq(1).should('contain', data.Untuk[4].Untuk_Bullet_List2);
                cy.get('li').eq(2).should('contain', data.Untuk[4].Untuk_Bullet_List3);
            });
        });
    }


    inputShortFreeTextOnUntuk(dataFreeText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Untuk' is a property on JSON data object
          if (!data.Untuk) {
            data.Untuk = [];
          }
      
          cy.wait(1000);
      
          // Find the iframe for input and switch context to it
          const iframeUntuk = cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')

          iframeUntuk.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataFreeText)
                .invoke('text')
                .then((freeText) => {
                // Assign the boldText to the JSON data
                data.Untuk[0].Indent_of_Paragraph_X_Spacing = freeText;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // Check the iframe for preview
  
            const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk')
            .should('be.visible');

            // Assert that the text within the preview contains the correct Free text
            checkPreviewUntuk.invoke('text')
            .then((text) => {
              // Use trim to remove whitespace from the start and end of the text content
              const trimmedText = text.trim()
              // Now use the include assertion to check if the trimmed text includes the expected text
              expect(trimmedText).to.include(data.Untuk[0].Indent_of_Paragraph_X_Spacing.trim())
            })
        })
    }

    
    pasteFreeTextOnUntuk(pasteFreeText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Untuk' is a property on JSON data object
          if (!data.Untuk) {
            data.Untuk = [];
          }
      
          cy.wait(1000);
      
          // Find the iframe for input and switch context to it
          const iframeUntuk = cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk');

          iframeUntuk.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .then($body => {
                    $body[0].innerHTML = pasteFreeText; // Set the text directly
                    $body.trigger('input'); // Trigger input event
                    $body.trigger('change'); // Additional triggers
                    $body.trigger('keyup');
                });
  
              // Assign the pasted text to the JSON data
              data.Untuk[5] = data.Untuk[5] || {};
              data.Untuk[5].Untuk_Paste1 = pasteFreeText;
  
              // Write the updated data object back to the file
              cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            });
            cy.wait(3000)
      });
      
        // Triggering a click outside the iframe to ensure the application updates
        cy.get(badan_surat.fieldPenerimaASN1).focus({ force: true }).click()

        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            const checkPreviewUntuk = cy.get(badan_surat.previewUntuk).as('checkPreviewUntuk');
            checkPreviewUntuk
                .wait(1000)
                .should('be.visible')
                .click()
                .should('have.text', data.Untuk[5].Untuk_Paste1);
        });  
    }


    inputTableOnUntuk() {
        const iframeUntuk = cy.get(badan_surat.inputUntuk).as('inputUntuk')
        iframeUntuk.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)

        const scrollTable = cy.get(badan_surat.inputUntuk).as('htmlScrollTable')
        scrollTable.find('div[class="tox-toolbar tox-toolbar--scrolling"]')
            .scrollTo(0, 500)

        const btnTable = cy.get(badan_surat.inputUntuk).as('htmlBtnTable')
        btnTable.find('button[title="Table"]')
            .click({ force: true })

        cy.wait(3000)

        const pilihTable = cy.get(badan_surat.getTableTinyMCE).as('htmlPilihTable')
        pilihTable.click()

        cy.wait(3000)

        const sizeTable = cy.get(badan_surat.sizeTable).as('sizeTable')
        sizeTable.should('be.visible')
            .click({ force: true })


        cy.wait(3000)
    }


    inputImageOnUntuk() {
        // Focus on the inputUntuk field and type something to trigger the pop-up
        cy.get(badan_surat.inputUntuk).find('iframe').then(($iframe) => {
            const doc = $iframe.contents();
            doc.find('body').click();
    
            // Wait for the image button to be visible in the pop-up dialog
            cy.wait(3000); // Adjust this wait time as needed
    
            // Now click the image button
            cy.get('button[title="Insert image"]').should('be.visible').click();
    
            // Assuming TinyMCE opens a file dialog, you would handle it like this:
            const imagePath = 'non_cred/images/image_example.jpg';
            cy.get('input[type="file"]').attachFile(imagePath); // Choose & Upload the File
        });
    }
    
    
    inputWhitespaceOnTextInUntuk(dataWhitespaceText) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
          // 'Untuk' is a property on JSON data object
          if (!data.Untuk) {
            data.Untuk = [];
          }
      
          cy.wait(1000);
      
          // Find the iframe for input and switch context to it
          const iframeUntuk = cy.get(badan_surat.inputUntuk).find('iframe').as('iframeUntuk')

          iframeUntuk.then($iframe => {
              const doc = $iframe[0].contentDocument;
              const body = doc.body;
              cy.wrap(body).as('iframeBody')
                .clear()
                .type(dataWhitespaceText)
                .invoke('text')
                .then((whitespaceText) => {
                // Ensure that the second item of 'Untuk' array is an object
                data.Untuk[6] = data.Untuk[6] || {}; // <-- This line ensures that data.Untuk[6] is an object
                // Assign the whitespaceText to the JSON data
                data.Untuk[6].Untuk_Whitespace_Text = whitespaceText;
      
                  // Write the updated data object back to the file
                  cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                });
            });
        });
      
        // check the preview
        cy.wait(5000); // Wait for any asynchronous processes to complete
      
        // Load the updated data and perform assertions
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            const previewUntukSelector = badan_surat.previewUntuk; // Replace with actual selector for the preview container
            cy.get(previewUntukSelector).should('be.visible').then(($preview) => {
                const previewText = $preview.text().trim();
                expect(previewText).to.include(data.Untuk[6].Untuk_Whitespace_Text.trim());

            // Check if the first <br> tag is present within the preview element
            const firstBr = $preview.find('br:first');
            if (firstBr.length) {
                cy.log('Note: First <br> tag found in the preview.');
            } else {
                cy.log('No <br> tags found in the preview.');
            }
            });
        });
    }


    clearUntukField() {
        const clearallUntukField = cy.get(badan_surat.inputUntuk).as('clearallUntukField')
        clearallUntukField.find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)
            .type('{ctrl}a{del}', {force: true});    
    }
    // End of Untuk Field



    // ASN Field
     inputandcheckFieldASN1st(dataASN1) {
        const titleFieldASN = cy.get(badan_surat.titlePenerima1).as('titleFieldASN');
        titleFieldASN.should('contain', 'Penerima 1');
            
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_ASN) {
                data.Penerima_ASN = { Preview_ASN: [] }; // Initialize the structure correctly
            }
    
        const inputPenerimaASN1 = cy.get(badan_surat.fieldPenerimaASN1).as('inputPenerimaASN1');
        inputPenerimaASN1
            .focus()  // Ensure the field is focused
            .type(dataASN1) // Add a delay to ensure the application registers each keystroke
            .wait(3000)
            .type('{enter}')
            .wait(6000) // Separate enter keystroke
            .then(() => {
                // Scraping preview data
                cy.get(badan_surat.namaASN1).invoke('text').then((nama) => {
                    cy.get(badan_surat.jabatanASN1).invoke('text').then((jabatan) => {
                        const asnData = {
                            "Nama": nama.trim(),
                            "Jabatan": jabatan.trim()
                            };

                                // Check if 'nama1' exists and update or add new data
                                const nama1Index = data.Penerima_ASN.Preview_ASN.findIndex(asn => asn.hasOwnProperty('nama1'));
                                if (nama1Index !== -1) {
                                    data.Penerima_ASN.Preview_ASN[nama1Index].nama1 = [asnData];
                                } else {
                                    data.Penerima_ASN.Preview_ASN.push({ "nama1": [asnData] });
                                }

                                // Write the updated data object back to the JSON file
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data); 
                    });
                });
            });
        });        

        
        // Check the preview
        cy.wait(5000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            const ASNData1 = previewData.Penerima_ASN.Preview_ASN[0].nama1[0];
        
            // Assertions for preview content based on JSON data
            const namaASN1Preview = cy.get(badan_surat.namaASN1).as('namaASN1Preview');
            namaASN1Preview.should('contain', ASNData1.Nama);
    
            const jabatanASN1Preview = cy.get(badan_surat.jabatanASN1).as('jabatanASN1Preview');
            jabatanASN1Preview.should('contain', ASNData1.Jabatan);
        });
    }


    addmoreDataTujuanSurat() {
        const btnTambahTujuanSurat = cy.get(badan_surat.addTujuanBadan).as('btnTambahTujuanSurat');
        btnTambahTujuanSurat.click()
    }


    inputandcheckFieldASN2nd(dataASN2) {
        const titleFieldASN = cy.get(badan_surat.titlePenerima2).as('titleFieldASN');
        titleFieldASN.should('contain', 'Penerima 2');

        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_ASN) {
                data.Penerima_ASN = { Preview_ASN: [] }; // Initialize the structure correctly
            }
    
        const inputPenerimaASN2 = cy.get(badan_surat.fieldPenerimaASN2).as('inputPenerimaASN2');
        inputPenerimaASN2
            .focus()  // Ensure the field is focused
            .type(dataASN2) // Add a delay to ensure the application registers each keystroke
            .wait(3000)
            .type('{enter}')
            .wait(6000) // Separate enter keystroke
            .then(() => {
                // Scraping preview data
                cy.get(badan_surat.namaASN2).invoke('text').then((nama) => {
                    cy.get(badan_surat.jabatanASN2).invoke('text').then((jabatan) => {
                        const asnData = {
                            "Nama": nama.trim(),
                            "Jabatan": jabatan.trim()
                        };

                        // Check if 'nama2' exists and update or add new data
                        const nama2Index = data.Penerima_ASN.Preview_ASN.findIndex(asn => asn.hasOwnProperty('nama2'));
                        if (nama2Index !== -1) {
                            data.Penerima_ASN.Preview_ASN[nama2Index].nama2 = [asnData];
                        } else {
                            data.Penerima_ASN.Preview_ASN.push({ "nama2": [asnData] });
                        }

                        // Write the updated data object back to the JSON file
                        cy.writeFile(getJSONRequestFileCreateSuratPerintah, data); 
                    });
                });
            });
        });

    
    // Check the preview
    cy.wait(5000);

    // Read from the JSON file for preview check
    cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
        const ASNData2 = previewData.Penerima_ASN.Preview_ASN[1].nama2[0];
    
        // Assertions for preview content based on JSON data
        const namaASN2Preview = cy.get(badan_surat.namaASN2).as('namaASN2Preview');
        namaASN2Preview.should('contain', ASNData2.Nama);

        const jabatanASN2Preview = cy.get(badan_surat.jabatanASN2).as('jabatanASN2Preview');
        jabatanASN2Preview.should('contain', ASNData2.Jabatan);
        });
    }


    inputandcheckFieldASN3rd(dataASN3) {
        const titleFieldASN = cy.get(badan_surat.titlePenerima3).as('titleFieldASN');
        titleFieldASN.should('contain', 'Penerima 3');

        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_ASN) {
                data.Penerima_ASN = { Preview_ASN: [] }; // Initialize the structure correctly
            }
    
        const inputPenerimaASN3 = cy.get(badan_surat.fieldPenerimaASN3).as('inputPenerimaASN3');
        inputPenerimaASN3
            .focus()  // Ensure the field is focused
            .type(dataASN3) // Add a delay to ensure the application registers each keystroke
            .wait(3000)
            .type('{enter}')
            .wait(6000) // Separate enter keystroke
            .then(() => {
                // Scraping preview data
                cy.get(badan_surat.namaASN3).invoke('text').then((nama) => {
                    cy.get(badan_surat.jabatanASN3).invoke('text').then((jabatan) => {
                        const asnData = {
                            "Nama": nama.trim(),
                            "Jabatan": jabatan.trim()
                        };

                        // Check if 'nama3' exists and update or add new data
                        const nama3Index = data.Penerima_ASN.Preview_ASN.findIndex(asn => asn.hasOwnProperty('nama3'));
                        if (nama3Index !== -1) {
                            data.Penerima_ASN.Preview_ASN[nama3Index].nama3 = [asnData];
                        } else {
                            data.Penerima_ASN.Preview_ASN.push({ "nama3": [asnData] });
                        }

                        // Write the updated data object back to the JSON file
                        cy.writeFile(getJSONRequestFileCreateSuratPerintah, data); 
                    });
                });
            });
        });

    
    // Check the preview
    cy.wait(5000);

    // Read from the JSON file for preview check
    cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
        const ASNData3 = previewData.Penerima_ASN.Preview_ASN[2].nama3[0];
    
        // Assertions for preview content based on JSON data
        const namaASN3Preview = cy.get(badan_surat.namaASN3).as('namaASN3Preview');
        namaASN3Preview.should('contain', ASNData3.Nama);

        const jabatanASN3Preview = cy.get(badan_surat.jabatanASN3).as('jabatanASN3Preview');
        jabatanASN3Preview.should('contain', ASNData3.Jabatan);
        });
    }


    dragAndDropFirstToSecondASNandNonASN() {
        const draggableNama1toNama2 = cy.get(badan_surat.dragndropASN1).as('draggableNama1toNama2');

        draggableNama1toNama2.drag(badan_surat.dragndropASN2)
    }


    dragAndDropLastDataToFirstDataASNandNonASN() {
        const draggableLastDataToFirstData = cy.get(badan_surat.dragndropASN5).as('draggableLastDataToFirstData');

        draggableLastDataToFirstData.drag(badan_surat.dragndropASN1)
    }


    toggleASNandNonASN1() {
        const toggleSwitchtoNonASN = cy.get(badan_surat.toggleASN1).as('toggleSwitchtoNonASN');
        toggleSwitchtoNonASN.scrollIntoView()
        .click({ force: true })
    }


    toggleASNandNonASN2() {
        const toggleSwitchtoNonASN2 = cy.get(badan_surat.toggleASN2).as('toggleSwitchtoNonASN2');
        toggleSwitchtoNonASN2.scrollIntoView()
        .click({ force: true })
    }


    toggleASNandNonASN3() {
        const toggleSwitchtoNonASN3 = cy.get(badan_surat.toggleASN3).as('toggleSwitchtoNonASN3');
        toggleSwitchtoNonASN3.scrollIntoView()
        .click({ force: true })
    }

    toggleASNandNonASN4() {
        const toggleSwitchtoNonASN4 = cy.get(badan_surat.toggleASN4).as('toggleSwitchtoNonASN4');
        toggleSwitchtoNonASN4.scrollIntoView()
        .click({ force: true })
    }


    toggleASNandNonASN5() {
        const toggleSwitchtoNonASN5 = cy.get(badan_surat.toggleASN5).as('toggleSwitchtoNonASN5');
        toggleSwitchtoNonASN5.scrollIntoView()
        .click({ force: true })
    }


    toggleASNandNonASN6() {
        const toggleSwitchtoNonASN6 = cy.get(badan_surat.toggleASN6).as('toggleSwitchtoNonASN6');
        toggleSwitchtoNonASN6.scrollIntoView()
        .click({ force: true })
    }
    // End of ASN Field



    // Non- ASN Field    
    inputandcheckFieldNonASN1st(nonASN_Nama, nonASN_PangkatorGolongan, nonASN_NIP, nonASN_Jabatan) {
        const titleFieldNonASN = cy.get(badan_surat.titlePenerima1).as('titleFieldNonASN');
        titleFieldNonASN.should('contain', 'Penerima 1');
    
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_Non_ASN) {
                data.Penerima_Non_ASN = [{}]; // Initialize as an empty array
            }
    
            cy.get(badan_surat.fieldNamaPenerima1).type(nonASN_Nama, { delay: 100 }).as('inputNama');
            cy.get(badan_surat.fieldPangkatGolongan1).type(nonASN_PangkatorGolongan, { delay: 100 }).as('inputPangkatGolongan');
            cy.get(badan_surat.fieldNIP1).type(nonASN_NIP, { delay: 100 }).as('inputNIP');
            cy.get(badan_surat.fieldJabatan1).type(nonASN_Jabatan, { delay: 100 }).then(() => {
                cy.get(badan_surat.namaASN1).invoke('text').then((nama) => {
                    cy.get(badan_surat.pangkatgolonganASN1).invoke('text').then((golongan) => {
                        cy.get(badan_surat.nipASN1).invoke('text').then((nip) => {
                            cy.get(badan_surat.jabatanASN1).invoke('text').then((jabatan) => {
                                const nonASNData = {
                                    "Nama": nama.trim(),
                                    "Pangkat_or_Golongan": golongan.trim(),
                                    "Nomor_Induk_Pegawai": nip.trim(),
                                    "Jabatan": jabatan.trim()
                                };
    
                                const nama1Index = data.Penerima_Non_ASN.findIndex(non_asn => non_asn.hasOwnProperty('nama1'));
                                if (nama1Index !== -1) {
                                    data.Penerima_Non_ASN[nama1Index].nama1 = [nonASNData];
                                } else {
                                    data.Penerima_Non_ASN.push({ "nama1": [nonASNData] });
                                }
    
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                            });
                        });
                    });
                });
            });
        });        
        
        // // Check the preview
        cy.wait(5000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            // Assertions for preview content based on JSON data
            const namaNonASN1Preview = cy.get(badan_surat.namaASN1).as('namaNonASN1Preview');
            namaNonASN1Preview.should('contain', previewData.Penerima_Non_ASN[0].nama1[0].Nama);
    
            const pangkatgolonganNonASN1Preview = cy.get(badan_surat.pangkatgolonganASN1).as('pangkatgolonganNonASN1Preview');
            pangkatgolonganNonASN1Preview.should('contain', previewData.Penerima_Non_ASN[0].nama1[0].Pangkat_or_Golongan);
    
            const nipNonASN1Preview = cy.get(badan_surat.nipASN1).as('nipNonASN1Preview');
            nipNonASN1Preview.should('contain', previewData.Penerima_Non_ASN[0].nama1[0].Nomor_Induk_Pegawai);
    
            const jabatanNonASN1Preview = cy.get(badan_surat.jabatanASN1).as('jabatanNonASN1Preview');
            jabatanNonASN1Preview.should('contain', previewData.Penerima_Non_ASN[0].nama1[0].Jabatan);
        });
    }


    inputandcheckFieldNonASN2nd(nonASN_Nama2, nonASN_PangkatorGolongan2, nonASN_NIP2, nonASN_Jabatan2) {
        const titleFieldNonASN = cy.get(badan_surat.titlePenerima2).as('titleFieldNonASN');
        titleFieldNonASN.should('contain', 'Penerima 2');
    
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_Non_ASN) {
                data.Penerima_Non_ASN = []; // Initialize as an empty array
            }
    
            cy.get(badan_surat.fieldNamaPenerima2).type(nonASN_Nama2, { delay: 100 }).as('inputNama2');
            cy.get(badan_surat.fieldPangkatGolongan2).type(nonASN_PangkatorGolongan2, { delay: 100 }).as('inputPangkatGolongan2');
            cy.get(badan_surat.fieldNIP2).type(nonASN_NIP2, { delay: 100 }).as('inputNIP2');
            cy.get(badan_surat.fieldJabatan2).type(nonASN_Jabatan2, { delay: 100 }).then(() => {
                cy.get(badan_surat.namaASN2).invoke('text').then((nama) => {
                    cy.get(badan_surat.pangkatgolonganASN2).invoke('text').then((golongan) => {
                        cy.get(badan_surat.nipASN2).invoke('text').then((nip) => {
                            cy.get(badan_surat.jabatanASN2).invoke('text').then((jabatan) => {
                                const nonASNData2 = {
                                    "Nama": nama.trim(),
                                    "Pangkat_or_Golongan": golongan.trim(),
                                    "Nomor_Induk_Pegawai": nip.trim(),
                                    "Jabatan": jabatan.trim()
                                };
    
                                const nama2Index = data.Penerima_Non_ASN.findIndex(non_asn => non_asn.hasOwnProperty('nama2'));
                                if (nama2Index !== -1) {
                                    data.Penerima_Non_ASN[nama2Index].nama2 = [nonASNData2];
                                } else {
                                    data.Penerima_Non_ASN.push({ "nama2": [nonASNData2] });
                                }
    
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                            });
                        });
                    });
                });
            });
        });        
        
        // // Check the preview
        cy.wait(5000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            // Assertions for preview content based on JSON data
            const namaNonASN2Preview = cy.get(badan_surat.namaASN2).as('namaNonASN2Preview')
            namaNonASN2Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[1].nama2[0].Nama);
    
            const pangkatgolonganNonASN2Preview = cy.get(badan_surat.pangkatgolonganASN2).as('pangkatgolonganNonASN2Preview')
            pangkatgolonganNonASN2Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[1].nama2[0].Pangkat_or_Golongan)
    
            const nipNonASN2Preview = cy.get(badan_surat.nipASN2).as('nipNonASN2Preview')
            nipNonASN2Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[1].nama2[0].Nomor_Induk_Pegawai)
    
            const jabatanNonASN2Preview = cy.get(badan_surat.jabatanASN2).as('jabatanNonASN2Preview')
            jabatanNonASN2Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[1].nama2[0].Jabatan)
        });
    }


    inputandcheckFieldNonASN3rd(nonASN_Nama3, nonASN_PangkatorGolongan3, nonASN_NIP3, nonASN_Jabatan3) {
        const titleFieldNonASN = cy.get(badan_surat.titlePenerima3).as('titleFieldNonASN');
        titleFieldNonASN.should('contain', 'Penerima 3');
    
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_Non_ASN) {
                data.Penerima_Non_ASN = []; // Initialize as an empty array
            }
    
            cy.get(badan_surat.fieldNamaPenerima3).type(nonASN_Nama3, { delay: 100 }).as('inputNama3');
            cy.get(badan_surat.fieldPangkatGolongan3).type(nonASN_PangkatorGolongan3, { delay: 100 }).as('inputPangkatGolongan3');
            cy.get(badan_surat.fieldNIP3).type(nonASN_NIP3, { delay: 100 }).as('inputNIP3');
            cy.get(badan_surat.fieldJabatan3).type(nonASN_Jabatan3, { delay: 100 }).then(() => {
                cy.get(badan_surat.namaASN3).invoke('text').then((nama) => {
                    cy.get(badan_surat.pangkatgolonganASN3).invoke('text').then((golongan) => {
                        cy.get(badan_surat.nipASN3).invoke('text').then((nip) => {
                            cy.get(badan_surat.jabatanASN3).invoke('text').then((jabatan) => {
                                const nonASNData3 = {
                                    "Nama": nama.trim(),
                                    "Pangkat_or_Golongan": golongan.trim(),
                                    "Nomor_Induk_Pegawai": nip.trim(),
                                    "Jabatan": jabatan.trim()
                                };
    
                                const nama3Index = data.Penerima_Non_ASN.findIndex(non_asn => non_asn.hasOwnProperty('nama3'));
                                if (nama3Index !== -1) {
                                    data.Penerima_Non_ASN[nama3Index].nama3 = [nonASNData3];
                                } else {
                                    data.Penerima_Non_ASN.push({ "nama3": [nonASNData3] });
                                }
    
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                            });
                        });
                    });
                });
            });
        });        
        
        // // Check the preview
        cy.wait(5000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            // Assertions for preview content based on JSON data
            const namaNonASN3Preview = cy.get(badan_surat.namaASN3).as('namaNonASN3Preview')
            namaNonASN3Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[2].nama3[0].Nama);
    
            const pangkatgolonganNonASN3Preview = cy.get(badan_surat.pangkatgolonganASN3).as('pangkatgolonganNonASN3Preview')
            pangkatgolonganNonASN3Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[2].nama3[0].Pangkat_or_Golongan)
    
            const nipNonASN3Preview = cy.get(badan_surat.nipASN3).as('nipNonASN3Preview')
            nipNonASN3Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[2].nama3[0].Nomor_Induk_Pegawai)
    
            const jabatanNonASN3Preview = cy.get(badan_surat.jabatanASN3).as('jabatanNonASN3Preview')
            jabatanNonASN3Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[2].nama3[0].Jabatan)
        });
    }


    inputandcheckFieldNonASN4th(nonASN_Nama4, nonASN_PangkatorGolongan4, nonASN_NIP4, nonASN_Jabatan4) {
        const titleFieldNonASN = cy.get(badan_surat.titlePenerima4).as('titleFieldNonASN');
        titleFieldNonASN.should('contain', 'Penerima 4');
    
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_Non_ASN) {
                data.Penerima_Non_ASN = []; // Initialize as an empty array
            }
    
            cy.get(badan_surat.fieldNamaPenerima4).type(nonASN_Nama4, { delay: 100 }).as('inputNama4');
            cy.get(badan_surat.fieldPangkatGolongan4).type(nonASN_PangkatorGolongan4, { delay: 100 }).as('inputPangkatGolongan4');
            cy.get(badan_surat.fieldNIP4).type(nonASN_NIP4, { delay: 100 }).as('inputNIP4');
            cy.get(badan_surat.fieldJabatan4).type(nonASN_Jabatan4, { delay: 100 }).then(() => {
                cy.get(badan_surat.namaASN4).invoke('text').then((nama) => {
                    cy.get(badan_surat.pangkatgolonganASN4).invoke('text').then((golongan) => {
                        cy.get(badan_surat.nipASN4).invoke('text').then((nip) => {
                            cy.get(badan_surat.jabatanASN4).invoke('text').then((jabatan) => {
                                const nonASNData4 = {
                                    "Nama": nama.trim(),
                                    "Pangkat_or_Golongan": golongan.trim(),
                                    "Nomor_Induk_Pegawai": nip.trim(),
                                    "Jabatan": jabatan.trim()
                                };
    
                                const nama4Index = data.Penerima_Non_ASN.findIndex(non_asn => non_asn.hasOwnProperty('nama4'));
                                if (nama4Index !== -1) {
                                    data.Penerima_Non_ASN[nama4Index].nama4 = [nonASNData4];
                                } else {
                                    data.Penerima_Non_ASN.push({ "nama4": [nonASNData4] });
                                }
    
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                            });
                        });
                    });
                });
            });
        });        
        
        // // Check the preview
        cy.wait(5000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            // Assertions for preview content based on JSON data
            const namaNonASN4Preview = cy.get(badan_surat.namaASN4).as('namaNonASN4Preview')
            namaNonASN4Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[3].nama4[0].Nama);
    
            const pangkatgolonganNonASN4Preview = cy.get(badan_surat.pangkatgolonganASN4).as('pangkatgolonganNonASN4Preview')
            pangkatgolonganNonASN4Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[3].nama4[0].Pangkat_or_Golongan)
    
            const nipNonASN4Preview = cy.get(badan_surat.nipASN4).as('nipNonASN4Preview')
            nipNonASN4Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[3].nama4[0].Nomor_Induk_Pegawai)
    
            const jabatanNonASN4Preview = cy.get(badan_surat.jabatanASN4).as('jabatanNonASN4Preview')
            jabatanNonASN4Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[3].nama4[0].Jabatan)
        });
    }


    inputandcheckFieldNonASN5th(nonASN_Nama5, nonASN_PangkatorGolongan5, nonASN_NIP5, nonASN_Jabatan5) {
        const titleFieldNonASN = cy.get(badan_surat.titlePenerima5).as('titleFieldNonASN');
        titleFieldNonASN.should('contain', 'Penerima 5');
    
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_Non_ASN) {
                data.Penerima_Non_ASN = []; // Initialize as an empty array
            }
    
            cy.get(badan_surat.fieldNamaPenerima5).type(nonASN_Nama5, { delay: 100 }).as('inputNama5');
            cy.get(badan_surat.fieldPangkatGolongan5).type(nonASN_PangkatorGolongan5, { delay: 100 }).as('inputPangkatGolongan5');
            cy.get(badan_surat.fieldNIP5).type(nonASN_NIP5, { delay: 100 }).as('inputNIP5');
            cy.get(badan_surat.fieldJabatan5).type(nonASN_Jabatan5, { delay: 100 }).then(() => {
                cy.get(badan_surat.namaASN5).invoke('text').then((nama) => {
                    cy.get(badan_surat.pangkatgolonganASN5).invoke('text').then((golongan) => {
                        cy.get(badan_surat.nipASN5).invoke('text').then((nip) => {
                            cy.get(badan_surat.jabatanASN5).invoke('text').then((jabatan) => {
                                const nonASNData5 = {
                                    "Nama": nama.trim(),
                                    "Pangkat_or_Golongan": golongan.trim(),
                                    "Nomor_Induk_Pegawai": nip.trim(),
                                    "Jabatan": jabatan.trim()
                                };
    
                                const nama5Index = data.Penerima_Non_ASN.findIndex(non_asn => non_asn.hasOwnProperty('nama5'));
                                if (nama5Index !== -1) {
                                    data.Penerima_Non_ASN[nama5Index].nama5 = [nonASNData5];
                                } else {
                                    data.Penerima_Non_ASN.push({ "nama5": [nonASNData5] });
                                }
    
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                            });
                        });
                    });
                });
            });
        });        
        
        // // Check the preview
        cy.wait(5000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            // Assertions for preview content based on JSON data
            const namaNonASN5Preview = cy.get(badan_surat.namaASN5).as('namaNonASN5Preview')
            namaNonASN5Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[4].nama5[0].Nama);
    
            const pangkatgolonganNonASN5Preview = cy.get(badan_surat.pangkatgolonganASN5).as('pangkatgolonganNonASN5Preview')
            pangkatgolonganNonASN5Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[4].nama5[0].Pangkat_or_Golongan)
    
            const nipNonASN5Preview = cy.get(badan_surat.nipASN5).as('nipNonASN5Preview')
            nipNonASN5Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[4].nama5[0].Nomor_Induk_Pegawai)
    
            const jabatanNonASN5Preview = cy.get(badan_surat.jabatanASN5).as('jabatanNonASN5Preview')
            jabatanNonASN5Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[4].nama5[0].Jabatan)
        });
    }


    inputandcheckFieldNonASN6th(nonASN_Nama6, nonASN_PangkatorGolongan6, nonASN_NIP6, nonASN_Jabatan6) {
        const titleFieldNonASN = cy.get(badan_surat.titlePenerima6).as('titleFieldNonASN');
        titleFieldNonASN.should('contain', 'Penerima 6');
    
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            if (!data.Penerima_Non_ASN) {
                data.Penerima_Non_ASN = []; // Initialize as an empty array
            }
    
            cy.get(badan_surat.fieldNamaPenerima6).type(nonASN_Nama6, { delay: 100 }).as('inputNama6');
            cy.get(badan_surat.fieldPangkatGolongan6).type(nonASN_PangkatorGolongan6, { delay: 100 }).as('inputPangkatGolongan6');
            cy.get(badan_surat.fieldNIP6).type(nonASN_NIP6, { delay: 100 }).as('inputNIP6');
            cy.get(badan_surat.fieldJabatan6).type(nonASN_Jabatan6, { delay: 100 }).then(() => {
                cy.get(badan_surat.namaASN6).invoke('text').then((nama) => {
                    cy.get(badan_surat.pangkatgolonganASN6).invoke('text').then((golongan) => {
                        cy.get(badan_surat.nipASN6).invoke('text').then((nip) => {
                            cy.get(badan_surat.jabatanASN6).invoke('text').then((jabatan) => {
                                const nonASNData6 = {
                                    "Nama": nama.trim(),
                                    "Pangkat_or_Golongan": golongan.trim(),
                                    "Nomor_Induk_Pegawai": nip.trim(),
                                    "Jabatan": jabatan.trim()
                                };
    
                                const nama6Index = data.Penerima_Non_ASN.findIndex(non_asn => non_asn.hasOwnProperty('nama6'));
                                if (nama6Index !== -1) {
                                    data.Penerima_Non_ASN[nama6Index].nama6 = [nonASNData6];
                                } else {
                                    data.Penerima_Non_ASN.push({ "nama6": [nonASNData6] });
                                }
    
                                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
                            });
                        });
                    });
                });
            });
        });        
        
        // // Check the preview
        cy.wait(6000);
    
        // Read from the JSON file for preview check
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((previewData) => {
            // Assertions for preview content based on JSON data
            const namaNonASN6Preview = cy.get(badan_surat.namaASN6).as('namaNonASN6Preview')
            namaNonASN6Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[5].nama6[0].Nama);
    
            const pangkatgolonganNonASN6Preview = cy.get(badan_surat.pangkatgolonganASN6).as('pangkatgolonganNonASN6Preview')
            pangkatgolonganNonASN6Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[5].nama6[0].Pangkat_or_Golongan)
    
            const nipNonASN6Preview = cy.get(badan_surat.nipASN6).as('nipNonASN6Preview')
            nipNonASN6Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[5].nama6[0].Nomor_Induk_Pegawai)
    
            const jabatanNonASN6Preview = cy.get(badan_surat.jabatanASN6).as('jabatanNonASN6Preview')
            jabatanNonASN6Preview.scrollIntoView()
            .should('contain', previewData.Penerima_Non_ASN[5].nama6[0].Jabatan)
        });
    }


    deletePenerima1Field() {
        const deletePenerima1Field = cy.get(badan_surat.deleteASN1).as('deletePenerima1Field')
        deletePenerima1Field.scrollIntoView()
        .click({ force: true })
    }

    deletePenerima2Field() {
        const deletePenerima2Field = cy.get(badan_surat.deleteASN2).as('deletePenerima2Field')
        deletePenerima2Field.scrollIntoView()
        .click({ force: true })
    }

    deletePenerima3Field() {
        const deletePenerima3Field = cy.get(badan_surat.deleteASN3).as('deletePenerima3Field')
        deletePenerima3Field.scrollIntoView()
        .click({ force: true })
    }

    clearPenerima1Field() {
        const clearallPenerima1Field = cy.get(badan_surat.clearfieldASN1).as('clearallPenerima1Field')
        clearallPenerima1Field.scrollIntoView()
        .click({ force: true })
    }
    // End of Non ASN Field


    closeBadanSurat() {
        const findButtonCloseBadan = cy.get(badan_surat.scrollForm).as('findButtonCloseBadan')
        findButtonCloseBadan.scrollTo('top')

        cy.wait(2000)

        const closeBadanSurat = cy.get(badan_surat.closeBadanNaskah).as('closeBadanSurat')
        closeBadanSurat.should('be.visible')
            .click()
    }


}