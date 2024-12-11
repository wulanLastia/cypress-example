import kaki_surat from "@selectors/sidebar/konsep_naskah/surat_perintah/drafting_kaki_surat.js"
import { DraftingSuratPerintahPage } from "../surat_perintah/pgs_drafting_surat_perintah.cy"

const draftingSuratPerintahPage = new DraftingSuratPerintahPage()

const filename = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"
const getJSONRequestFileCreateSuratPerintah = "cypress/fixtures/non_cred/surat_perintah/preview_results_super.json"



export class DraftingKakiSuratPerintahPage {
    // Check 'Kepala Surat' Functions
    aksesFormEditingKakiSurat() {
        draftingSuratPerintahPage.aksesKakiSurat()
    }

    checkDetail() {
        const titleKaki = cy.get(kaki_surat.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')

        const labelTempatPenulisan = cy.get(kaki_surat.labelTempatPenulisan).as('labelTempatPenulisan')
        labelTempatPenulisan.should('contain', 'Tempat Penulisan Surat')

        const pilihTempatPenulisanSurat = cy.get(kaki_surat.inputTempatPenulisan).as('pilihTempatPenulisanSurat')
        pilihTempatPenulisanSurat.should('have.attr', 'placeholder', 'ketik tempat penulisan surat')

        const labelPenandatangan = cy.get(kaki_surat.labelPenandatangan).as('labelPenandatangan')
        labelPenandatangan.should('contain', 'Penandatangan')

        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.find('option:selected').should('have.text', 'Pilih Format Penandatangan')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.should('have.attr', 'placeholder', ' Pilih Penandatangan')

        const labelPemeriksa = cy.get(kaki_surat.labelPemeriksa).as('labelPemeriksa')
        labelPemeriksa.should('contain', 'Pemeriksa')

        const pilihPemeriksa = cy.get(kaki_surat.pilihPemeriksa).as('pilihPemeriksa')
        pilihPemeriksa.should('have.attr', 'placeholder', ' Pilih/ketik nama pemeriksa naskah')

        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.should('be.visible')
            .should('contain', 'Tambahkan Pemeriksa')
    }

    checkTanggalPenomoran() {
        cy.wait(3000)

        const dayjs = require("dayjs")

        const validatetanggalKakiSurat = cy.get(kaki_surat.tanggalKaki).as('validatetanggalKakiSurat')
        validatetanggalKakiSurat.invoke('text').then((dateText) => {
            // Extract the date from the text
            const extractedDate = dateText.trim().match(/\d{1,2} [A-Za-z]+ \d{4}/)[0]
            
            // Format the current date to match the format of the extracted date
            const currentDate = dayjs().format('DD MMMM YYYY');
          
            // Assert that the extracted date is the current date
            expect(extractedDate).to.equal(currentDate)
        })
    }

    closeKakiSurat() {
        const closeKaki = cy.get(kaki_surat.closeKaki).as('closeKaki')
        closeKaki.should('be.visible')
            .click()

        draftingSuratPerintahPage.validateFormDefault()
    }

    checkDropdownPenandatangan() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan
            .select(0)
            .should('have.text', 'Pilih Format Penandatangan Atasan \n              Atas nama\n             \n              Untuk beliau\n             Diri sendiri')
    }

    leaveEmptyField() {
        this.closeKakiSurat()

        const btnKirim = cy.get(kaki_surat.btnKirim).as('btnKirim')
        btnKirim.should('contain', 'Kirim Naskah')
            .should('have.attr', 'disabled', 'disabled')
    }



    //Field Penandatangan
    pilihPenandatanganDiriSendiri() {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(4).should('have.value', 'DIRI_SENDIRI')
    }

    pilihPenandatanganAtasan(dataPenandaTanganAtasan) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(1).should('have.value', 'ATASAN')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.type(dataPenandaTanganAtasan)
            .wait(2000)
            .type('{enter}')
    }

    pilihPenandatanganAtasNama(dataPenandaTanganAtasNama) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(2).should('have.value', 'ATAS_NAMA')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.type(dataPenandaTanganAtasNama)
            .wait(2000)
            .type('{enter}')
    }

    pilihPenandatanganUntukBeliau(dataPenandaTanganUntukBeliau) {
        const selectPenandatangan = cy.get(kaki_surat.selectPenandatangan).as('selectPenandatangan')
        selectPenandatangan.select(3).should('have.value', 'UNTUK_BELIAU')

        const pilihPenandatangan = cy.get(kaki_surat.pilihPenandatangan).as('pilihPenandatangan')
        pilihPenandatangan.type(dataPenandaTanganUntukBeliau)
            .wait(2000)
            .type('{enter}')
    }

    clearPenandaTangan() {
        const hapusPenandaTangan = cy.get(kaki_surat.btnDeletePenandatangan).as('hapusPenandaTangan')
        hapusPenandaTangan.click({ force: true })
    }



    //Field Pemeriksa    
    checkPemeriksaAtasan(dataPemeriksaAtasan) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kaki_Surat) {
                data.Kaki_Surat = [{}];
              }

        const pemeriksaField = cy.get(kaki_surat.checkDisabledPemeriksaField).as('pemeriksaField')
        pemeriksaField.should('be.disabled')

        cy.wait(2500)

        const fieldPemeriksaAtasan = cy.get(kaki_surat.checkPemeriksa).as('fieldPemeriksa')
        fieldPemeriksaAtasan.should('contain', dataPemeriksaAtasan)
            .invoke('text')
            .then(text => {
                const Data_Pemeriksa_Atasan = text.trim(); // Trim the text to remove any whitespace
        
                // Assign the Penandatangan to the JSON data
                data.Kaki_Surat[0].Pemeriksa_Atasan = Data_Pemeriksa_Atasan;
        
                // Write the updated data object back to the file
                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            })
        })    
    }

    checkPemeriksaAtasNama(dataPemeriksaAtasNama) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kaki_Surat) {
                data.Kaki_Surat = [{}];
              }

        const pemeriksaField = cy.get(kaki_surat.checkDisabledPemeriksaField).as('pemeriksaField')
        pemeriksaField.should('be.disabled')

        cy.wait(2500)

        const fieldPemeriksaAtasNama = cy.get(kaki_surat.checkPemeriksa).as('fieldPemeriksaAtasNama')
        fieldPemeriksaAtasNama.should('contain', dataPemeriksaAtasNama)
            .invoke('text')
            .then(text => {
                const Data_Pemeriksa_Atas_Nama = text.trim(); // Trim the text to remove any whitespace
        
                // Assign the Penandatangan to the JSON data
                data.Kaki_Surat[0].Pemeriksa_Atas_Nama = Data_Pemeriksa_Atas_Nama;
        
                // Write the updated data object back to the file
                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            })
        })    

    }

    checkPemeriksaUntukBeliau(dataPemeriksaUntukBeliau) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kaki_Surat) {
                data.Kaki_Surat = [{}];
              }

        const pemeriksaField = cy.get(kaki_surat.checkDisabledPemeriksaField).as('pemeriksaField')
        pemeriksaField.should('be.disabled')

        cy.wait(2500)

        const fieldPemeriksaUntukBeliau = cy.get(kaki_surat.checkPemeriksa).as('fieldPemeriksaUntukBeliau')
        fieldPemeriksaUntukBeliau.should('contain', dataPemeriksaUntukBeliau)
            .invoke('text')
            .then(text => {
                const Data_Pemeriksa_Untuk_Beliau = text.trim(); // Trim the text to remove any whitespace
        
                // Assign the Penandatangan to the JSON data
                data.Kaki_Surat[0].Pemeriksa_Untuk_Beliau = Data_Pemeriksa_Untuk_Beliau;
        
                // Write the updated data object back to the file
                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            })
        })    
    }

    checkPemeriksanDiriSendiri(dataPemeriksaDiriSendiri) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kaki_Surat) {
                data.Kaki_Surat = [{}];
              }
    

        const pemeriksaField = cy.get(kaki_surat.checkDisabledPemeriksaField).as('pemeriksaField')
        pemeriksaField.should('be.disabled')

        cy.wait(2500)

        const selectedPenandatangan = cy.get(kaki_surat.selectedPenandatangan).as('selectedPenandatangan')
        selectedPenandatangan.should('contain', dataPemeriksaDiriSendiri)
            .invoke('text')
            .then(text => {
                const Data_Pemeriksa_Penandatangan_Diri_Sendiri = text.trim(); // Trim to remove extra whitespace
                const expectedText = dataPemeriksaDiriSendiri.trim(); // Adjust the expected text as needed
        
                const profileName = cy.get(kaki_surat.profileName).as('profileName')
                profileName.should((el) => {
                    // Use 'toLowerCase()' to make the comparison case-insensitive
                    expect(el.text().trim().toLowerCase()).to.equal(expectedText.toLowerCase());
                });
        
                // Assign the trimmed and properly cased text to the JSON data
                data.Kaki_Surat[0].Pemeriksa_Diri_Sendiri = Data_Pemeriksa_Penandatangan_Diri_Sendiri;
        
                // Write the updated data object back to the file
                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);        
            })  
        })
    }

    checkDifferentPemeriksa(dataPemeriksaAtasNama) {
        cy.readFile(getJSONRequestFileCreateSuratPerintah).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kaki_Surat) {
                data.Kaki_Surat = [{}];
              }

        const pemeriksaField = cy.get(kaki_surat.checkDisabledPemeriksaField).as('pemeriksaField')
        pemeriksaField.should('be.disabled')

        cy.wait(2500)

        const fieldPemeriksaBeda = cy.get(kaki_surat.checkPemeriksa).as('fieldPemeriksaBeda')
        fieldPemeriksaBeda.should('not.contain', dataPemeriksaAtasNama)
            .invoke('text')
            .then(text => {
                const Different_Pemeriksa_Atas_Nama = text.trim(); // Trim the text to remove any whitespace
        
                // Assign the Penandatangan to the JSON data
                data.Kaki_Surat[0].Pemeriksa_Atas_Nama2 = Different_Pemeriksa_Atas_Nama;
        
                // Write the updated data object back to the file
                cy.writeFile(getJSONRequestFileCreateSuratPerintah, data);
            })
        })    

    }

    tambahPemeriksa() {
        const btnTambahPemeriksa = cy.get(kaki_surat.btnTambahPemeriksa).as('btnTambahPemeriksa')
        btnTambahPemeriksa.click()
    }

    inputPemeriksa1(dataPemeriksa) {
        const tambahPemeriksa1 = cy.get(kaki_surat.pilihPemeriksa).as('tambahPemeriksa1')
        tambahPemeriksa1.type(dataPemeriksa, { force: true })
            .wait(5000)
            .type('{enter}')

    }

    inputPemeriksa2(dataPemeriksa2) {
        const tambahPemeriksa2 = cy.get(kaki_surat.pilihPemeriksa2).as('tambahPemeriksa2')
        tambahPemeriksa2.type(dataPemeriksa2, { force: true })
            .wait(5000)
            .type('{enter}')

    }
}