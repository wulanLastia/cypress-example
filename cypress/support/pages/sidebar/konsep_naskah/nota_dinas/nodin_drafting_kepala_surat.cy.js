import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/nota_dinas/drafting_kepala_surat"
import { DraftingNotaDinasPage } from "../nota_dinas/pgs_drafting_nota_dinas.cy"

const draftingNotaDinasPage = new DraftingNotaDinasPage()

const filename = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"
const getJSONRequestFileCreateNotaDinas = "cypress/fixtures/non_cred/kepala_surat/untuk-create-data-nota_dinas.json"



export class DraftingKepalaSuratNotaDinasPage {

    // Check 'Kepala Surat' Functions
    aksesFormEditingKepalaSurat() {
        draftingNotaDinasPage.aksesFormKepalaSurat()
    }

    checkDetailPreview() {
        cy.wait(3000)

        const titlePreviewKepalaSurat = cy.get(kepala_surat.titlePreviewKepalaSurat).as('titlePreviewKepalaSurat')
        titlePreviewKepalaSurat.should('contain', 'NOTA DINAS')
            .and('be.visible')

        const previewKepalaLampiran = cy.get(kepala_surat.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.should('contain', 'Yth.')
    }

    checkDetail() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const titleKepalaSurat = cy.get(kepala_surat.titleKepalaSurat).as('titleKepalaSurat')
        titleKepalaSurat.should('contain', 'Kepala Surat')
            .and('be.visible')

        // Penempatan Tujuan Surat 
        const penempatanTujuanSurat = cy.get(kepala_surat.penempatanTujuanSurat).as('penempatanTujuanSurat')
        penempatanTujuanSurat.should('contain', 'Penempatan daftar tujuan surat')
            .and('be.visible')

        const radio1 = cy.get(kepala_surat.radio1).as('radio1')
        radio1.should('be.visible')
            .click()

        const labelRadio1 = cy.get(kepala_surat.labelRadio1).as('labelRadio1')
        labelRadio1.should('contain', 'Kepala Surat')
            .and('be.visible')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')
            .and('be.visible')

        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.should('have.attr', 'placeholder', 'Pilih/ketik tujuan surat')

        const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
        addMoreTujuan.should('contain', 'Tambah Tujuan Surat')

        const labelTembusan = cy.get(kepala_surat.labelTembusan).as('labelTembusan')
        labelTembusan.should('contain', 'Tembusan')

        const inputTembusan0 = cy.get(kepala_surat.inputTembusan0).as('inputTembusan0')
        inputTembusan0.should('have.attr', 'placeholder', 'Pilih atau ketik tujuan tembusan nota dinas')

        const addMoreTembusan = cy.get(kepala_surat.addMoreTembusan).as('addMoreTembusan')
        addMoreTembusan.should('contain', 'Tambah Tembusan')

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.find('input')
            .should('have.attr', 'placeholder', 'Pilih kode klasifikasi')

        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.should('have.attr', 'placeholder', 'ketik unit pengolah')

        const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
        titleTanggal.should('contain', 'Tanggal Penomoran')

        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.find('input')
            .should('have.attr', 'placeholder', 'Pilih sifat surat nota dinas')

        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const selectUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('selectUrgensiSurat')
        selectUrgensiSurat.find('input')
            .should('have.attr', 'placeholder', 'Pilih urgensi nota dinas')

        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        inputPerihal.should('have.attr', 'placeholder', 'ketik perihal surat')

    }




    // ACTIONS

    // KEPALA SURAT
    // Radio Button Penempatan daftar tujuan surat
    clickRButton1KepalaSurat() {
        const clickRadio1 = cy.get(kepala_surat.radio1).as('clickRadio1')
        clickRadio1.should('be.visible')
            .click()
    }

    // Field Tujuan Surat
    inputTujuan(Nama_Tujuan1) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((object) => {
            const createDataToWrite = {
                Kepala_Surat: []
            }

            // Input data into fields
            const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
            inputTujuan.wait(1000)
                .type(Nama_Tujuan1)
                .invoke('val')  // Extract the value of the input
                .then((inputValue1) => { // Use the actual value from the input
                    // Construct the sub-object
                    const createTujuan1 = {
                        Tujuan1: inputValue1
                    }

                    // Push the sub-object to the array
                    createDataToWrite.Kepala_Surat.push(createTujuan1)

                    // Write data to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, createDataToWrite)
                })
        })

        const pilihTujuan = cy.get(kepala_surat.inputTujuan0).as('pilihTujuan')
        pilihTujuan.wait(3000)
            .type('{enter}')
    }

    addTujuan() {
        const addTujuan = cy.get(kepala_surat.addMoreTujuan).as('addTujuan')
        addTujuan.wait(1000)
            .click({ force: true })

    }

    inputTujuanField2(Nama_Tujuan2) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const inputTujuan2 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan2')
            inputTujuan2.wait(1000)
                .type(Nama_Tujuan2)
                .invoke('val')  // Extract the value of the input
                .then((inputValue2) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Tujuan2 = inputValue2;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const pilihTujuan2 = cy.get(kepala_surat.inputTujuan1).as('pilihTujuan2')
        pilihTujuan2.wait(3000)
            .type('{enter}')
    }

    inputTujuanField3(Nama_Tujuan3) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const inputTujuan3 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan3')
            inputTujuan3.wait(1000)
                .type(Nama_Tujuan3)
                .invoke('val')  // Extract the value of the input
                .then((inputValue3) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Tujuan3 = inputValue3;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const pilihTujuan3 = cy.get(kepala_surat.inputTujuan2).as('pilihTujuan3')
        pilihTujuan3.wait(3000)
            .type('{enter}')
    }

    // Tujuan Negative Scenario
    inputTujuanLongText(Nama_Tujuan1) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((object) => {
            const createDataToWrite = {
                Kepala_Surat: []
            }

            // Input data into fields
            const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
            inputTujuan.wait(1000)
                .type(Nama_Tujuan1)
                .invoke('val')  // Extract the value of the input
                .then((inputValue1) => { // Use the actual value from the input
                    // Construct the sub-object
                    const createTujuan1 = {
                        Tujuan1: inputValue1
                    }

                    // Push the sub-object to the array
                    createDataToWrite.Kepala_Surat.push(createTujuan1)

                    // Write data to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, createDataToWrite)
                })
        })

        const pilihTujuan = cy.get(kepala_surat.inputTujuan0).as('pilihTujuan')
        pilihTujuan.wait(3000)
            .type('{enter}')
            .wait(3000)

        const validateTujuanMax150Char = cy.get(kepala_surat.scrapNamaJabatanOnKepalaSingle).as('validateTujuanMax150Char')
        validateTujuanMax150Char.wait(1000)
            .invoke('text')
            .then(text => text.trim())
            .should('have.length', 170);
    }

    validateTujuanTidakBolehSama() {
        const errorDoubleDataTujuan = cy.get(kepala_surat.labelErrorMessageTujuan).as('errorDoubleDataTujuan')
        errorDoubleDataTujuan.wait(1000)
            .should('be.visible')
    }

    validateTembusanTidakBolehSama() {
        cy.wait(3000)

        // Read Data on JSON
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Scrapping Nama Jabatan on Tujuan
            cy.get(kepala_surat.scrapNamaJabatan1)
                .invoke('text')
                .then((scrapNamaJabatan1) => {
                    let namajabatanExists = data.Kepala_Surat.some(item => 'Tujuan1' in item);

                    if (namajabatanExists) {
                        data.Kepala_Surat.find(item => 'Tujuan1' in item).Tujuan1 = scrapNamaJabatan1.trim();
                    } else {
                        const addNamaJabatan = { Tujuan1: scrapNamaJabatan1.trim() };
                        data.Kepala_Surat.push(addNamaJabatan);
                    }

                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });



        // Check Tembusan
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            const dataTujuanKepala1 = data.Kepala_Surat[0].Tujuan1;

            cy.get(kepala_surat.scrapNamaJabatanTembusan1).invoke('text')
                .then(text => text.trim())
                .should('not.contain', dataTujuanKepala1)


        });
    }


    // Delete Tujuan Surat
    deleteField1TujuanSurat() {
        const deleteTujuan1 = cy.get(kepala_surat.deleteTujuanLampiran0).as('deleteTujuan1')
        deleteTujuan1.wait(1000)
            .click({ force: true })
            .wait(3000)


        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            const dataTujuan1 = data.Kepala_Surat[0].Tujuan1;

            cy.get(kepala_surat.previewKepalaLampiran).should('not.contain', dataTujuan1);
        });

    }


    // Field Tembusan Surat
    inputTembusan(Nama_Tembusan1) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Input data into fields
            const inputTembusan = cy.get(kepala_surat.inputTembusan0).as('inputTembusan')
            inputTembusan.wait(1000)
                .type(Nama_Tembusan1)
                .invoke('val')  // Extract the value of the input
                .then((inputValue1) => {
                    // Check if there's already a Tembusan object
                    let tembusanExists = data.Kepala_Surat.some(item => 'Tembusan1' in item);

                    if (tembusanExists) {
                        // Update existing Tembusan object
                        data.Kepala_Surat.find(item => 'Tembusan1' in item).Tembusan1 = inputValue1;
                    } else {
                        // Or add a new Tembusan object
                        const createTembusan1 = { Tembusan1: inputValue1 };
                        data.Kepala_Surat.push(createTembusan1);
                    }

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const pilihTembusan = cy.get(kepala_surat.inputTembusan0).as('pilihTembusan')
        pilihTembusan.wait(3000)
            .type('{enter}')
    }

    addTembusan() {
        const addTembusan = cy.get(kepala_surat.addMoreTembusan).as('addTembusan')
        addTembusan.wait(1000)
            .click()

    }

    inputTembusan2(Nama_Tembusan2) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const inputTembusan2 = cy.get(kepala_surat.inputTembusan1).as('inputTembusan2')
            inputTembusan2.wait(1000)
                .type(Nama_Tembusan2)
                .invoke('val')  // Extract the value of the input
                .then((inputValue2) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[1].Tembusan2 = inputValue2;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const pilihTembusan2 = cy.get(kepala_surat.inputTembusan1).as('pilihTembusan2')
        pilihTembusan2.wait(3000)
            .type('{enter}')
    }

    inputTembusan3(Nama_Tembusan3) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const inputTembusan3 = cy.get(kepala_surat.inputTembusan2).as('inputTembusan3')
            inputTembusan3.wait(1000)
                .type(Nama_Tembusan3)
                .invoke('val')  // Extract the value of the input
                .then((inputValue3) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[1].Tembusan3 = inputValue3;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const pilihTembusan3 = cy.get(kepala_surat.inputTembusan2).as('pilihTembusan3')
        pilihTembusan3.wait(3000)
            .type('{enter}')
    }

    // Field Kode Klasifikasi
    inputKodeKlasifikasi(Kode_Klasifikasi) {
        cy.wait(3000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        // Cara dibawah KHUSUS UNTUK FIELD DROPDOWN
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
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
            cy.writeFile(getJSONRequestFileCreateNotaDinas, data);

            // Input data into fields
            const inputKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).first().as('inputKodeKlasifikasi')
            inputKodeKlasifikasi.wait(1000)
                .type(Kode_Klasifikasi);
        });

        const pilihKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).first().as('pilihKodeKlasifikasi')
        pilihKodeKlasifikasi.wait(6000)
            .type('{enter}')
    }


    // Field Unit Pengolah
    inputUnitPengolah(dataUnitPengolah) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
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
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });
    }


    // Field Tanggal Penomoran
    validateTanggal(val) {
        const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
        titleTanggal.should('contain', 'Tanggal Penomoran')

        if (val === 'Manual') {
            const inputTanggal = cy.get(kepala_surat.inputTanggal).as('inputTanggal')
            inputTanggal.click()

            const getpopupPenomoran = cy.get(kepala_surat.getpopupPenomoran).as('getpopupPenomoran')
            getpopupPenomoran.should('be.visible')

            const gettitlePopupPenomoran = cy.get(kepala_surat.gettitlePopupPenomoran).as('gettitlePopupPenomoran')
            gettitlePopupPenomoran.should('contain', 'Penomoran Manual')

            const getsubtittlePopupPenomoran = cy.get(kepala_surat.getsubtittlePopupPenomoran).as('getsubtittlePopupPenomoran')
            getsubtittlePopupPenomoran.should('contain', 'Ingat, penomoran manual hanya digunakan untuk kasus khusus. Apakah Anda telah mendiskusikan dengan atasan dan yakin akan melanjutkan?')

            const btnkonfirmasiPopupPenomoran = cy.xpath(kepala_surat.btnkonfirmasiPopupPenomoran).as('btnkonfirmasiPopupPenomoran')
            btnkonfirmasiPopupPenomoran.should('be.visible')
                .click()

            const xpathTabelPenomoran1 = cy.xpath(kepala_surat.xpathTabelPenomoran1).as('xpathTabelPenomoran1')
            xpathTabelPenomoran1.invoke('val')
                .then((val) => {
                    cy.log(val)
                    if (val > 0) {
                        cy.log('masuk sini')
                    }
                });
        }

        cy.wait(3000)
        // Scrapping Tanggal Penomoran 
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Scrap Tanggal Penomoran Data
            cy.get(kepala_surat.scrapTanggalPenomoran)
                .invoke('text')
                .then((scrapTanggalPenomoran) => {
                    let tanggalpenomoranExists = data.Kepala_Surat.some(item => 'Tanggal_Penomoran' in item);

                    if (tanggalpenomoranExists) {
                        data.Kepala_Surat.find(item => 'Tanggal_Penomoran' in item).Tanggal_Penomoran = scrapTanggalPenomoran.trim();
                    } else {
                        const createTanggalPenomoran = { Tanggal_Penomoran: scrapTanggalPenomoran.trim() };
                        data.Kepala_Surat.push(createTanggalPenomoran);
                    }

                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });
    }


    // Dropdown Sifat Surat
    validateSifatSurat(Sifat_Surat) {
        cy.wait(3000)

        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        // Cara dibawah KHUSUS UNTUK FIELD DROPDOWN TANPA FIELD TYPE
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Check if there's already a Sifat_Surat object
            let sifatsuratExists = data.Kepala_Surat.some(item => 'Sifat_Surat' in item);

            if (sifatsuratExists) {
                // Update existing Sifat_Surat object
                data.Kepala_Surat.find(item => 'Sifat_Surat' in item).Sifat_Surat = Sifat_Surat;
            } else {
                // Or add a new Kode_Klasifikasi object
                const createSifatSurat = { Sifat_Surat: Sifat_Surat };
                data.Kepala_Surat.push(createSifatSurat);
            }

            // Write data back to the JSON file
            cy.writeFile(getJSONRequestFileCreateNotaDinas, data);

            // Input data into dropdown
            const inputSifatSurat = cy.get(kepala_surat.selectSifatSurat).first().as('inputSifatSurat')
            inputSifatSurat.click()
                .contains(Sifat_Surat)
                .click()
        });
    }

    deleteSifatSurat() {
        cy.wait(3000)

        const deleteSifatSurat = cy.get(kepala_surat.btnDeleteSifatSurat).as('deleteSifatSurat')
        deleteSifatSurat.click({ force: true })
    }



    // Dropdown Urgensi
    validateUrgensi(Urgensi_Nota_Dinas) {
        cy.wait(3000)

        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        // Cara dibawah KHUSUS UNTUK FIELD DROPDOWN TANPA FIELD TYPE
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
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
            cy.writeFile(getJSONRequestFileCreateNotaDinas, data);

            // Input data into dropdown
            const inputUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).first().as('inputUrgensiSurat')
            inputUrgensiSurat.click()
                .wait(5000)
                .contains(Urgensi_Nota_Dinas)
                .click()
        });
    }

    deleteUrgensi() {
        cy.wait(3000)

        const deleteUrgensiSurat = cy.get(kepala_surat.btnDeleteUrgensiSurat).as('deleteUrgensiSurat')
        deleteUrgensiSurat.click({ force: true })
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



        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Input data into fields
            const scrappingPerihal = cy.get(kepala_surat.scrapPerihal).as('scrappingPerihal')
            scrappingPerihal.wait(1000)
                .invoke('text')  // Extract the value of the input
                .then((inputValuePerihal) => {
                    // Check if there's already a Tembusan object
                    let perihalExists = data.Kepala_Surat.some(item => 'Perihal' in item);

                    if (perihalExists) {
                        // Update existing Tembusan object
                        data.Kepala_Surat.find(item => 'Perihal' in item).Perihal = inputValuePerihal.trim();
                    } else {
                        // Or add a new Tembusan object
                        const createPerihal = { Perihal: inputValuePerihal.trim() };
                        data.Kepala_Surat.push(createPerihal);
                    }

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });
    }

    deletePerihal() {
        cy.wait(2000)

        const deletePerihal = cy.get(kepala_surat.inputPerihal).as('deletePerihal')
        deletePerihal.type("{selectall}{backspace}{esc}")
    }

    scrappingNamaJabatan() {
        // Scrapping Nama Jabatan 1
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Scrap Tanggal Penomoran Data
            cy.get(kepala_surat.scrapNamaJabatan1)
                .invoke('text')
                .then((scrapNamaJabatan1) => {
                    let namajabatanExists = data.Kepala_Surat.some(item => 'Tujuan1' in item);

                    if (namajabatanExists) {
                        data.Kepala_Surat.find(item => 'Tujuan1' in item).Tujuan1 = scrapNamaJabatan1.trim();
                    } else {
                        const addNamaJabatan = { Tujuan1: scrapNamaJabatan1.trim() };
                        data.Kepala_Surat.push(addNamaJabatan);
                    }

                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });


        // Scrapping Nama Jabatan 2
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Scrap Tanggal Penomoran Data
            cy.get(kepala_surat.scrapNamaJabatan2)
                .invoke('text')
                .then((scrapNamaJabatan2) => {
                    let namajabatanExists = data.Kepala_Surat.some(item => 'Tujuan2' in item);

                    if (namajabatanExists) {
                        data.Kepala_Surat.find(item => 'Tujuan2' in item).Tujuan2 = scrapNamaJabatan2.trim();
                    } else {
                        const addNamaJabatan = { Tujuan2: scrapNamaJabatan2.trim() };
                        data.Kepala_Surat.push(addNamaJabatan);
                    }

                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });


        // Scrapping Nama Jabatan 3
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [];
            }

            // Scrap Tanggal Penomoran Data
            cy.get(kepala_surat.scrapNamaJabatan3)
                .invoke('text')
                .then((scrapNamaJabatan3) => {
                    let namajabatanExists = data.Kepala_Surat.some(item => 'Tujuan3' in item);

                    if (namajabatanExists) {
                        data.Kepala_Surat.find(item => 'Tujuan3' in item).Tujuan3 = scrapNamaJabatan3.trim();
                    } else {
                        const addNamaJabatan = { Tujuan3: scrapNamaJabatan3.trim() };
                        data.Kepala_Surat.push(addNamaJabatan);
                    }

                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });


    }



    // LAMPIRAN SURAT

    // Radio Button Penempatan daftar tujuan surat
    clickRButton2LampiranSurat() {
        const clickRadio2 = cy.get(kepala_surat.radio2).as('clickRadio2')
        clickRadio2.scrollIntoView()
            .should('be.visible')
            .click({ force: true })
    }


    // Field Tujuan Lampiran
    inputTujuanLampiran1(Nama_Tujuan_Lampiran1) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const scrappingTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran).as('scrappingTujuanLampiran1')
            scrappingTujuanLampiran1.wait(1000)
                .type(Nama_Tujuan_Lampiran1)
                .invoke('val')  // Extract the value of the input
                .then((inputValueLampiranTujuan1) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Tujuan_Lampiran1 = inputValueLampiranTujuan1;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const fieldTujuanLampiranKepala = cy.get(kepala_surat.inputTujuanLampiran).as('fieldTujuanLampiranKepala')
        fieldTujuanLampiranKepala.wait(3000)
            .type('{enter}')
    }


    // Button "Buat tujuan surat di lampiran"
    buttonBuatTujuanSuratDiLampiran() {
        const clickBuatTujuanSuratDiLampiran = cy.get(kepala_surat.btnBuatTujuanSuratDiLampiran).as('clickBuatTujuanSuratDiLampiran')
        clickBuatTujuanSuratDiLampiran.should('be.visible')
            .click({ force: true })
            .wait(5000)
    }

    // Validasi Nama Jabatan di Lampiran
    validateNamaJabatanLampiran() {
        // Read JSON file for Validate Tujuan that moved into Lampiran
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            const validateTujuan1 = data.Kepala_Surat[0].Tujuan1;
            const validateTujuan2 = data.Kepala_Surat[0].Tujuan2;
            const validateTujuan3 = data.Kepala_Surat[0].Tujuan3;

            cy.get(kepala_surat.titleNamaTujuanLampiran1).should('contain', validateTujuan1);
            cy.get(kepala_surat.titleNamaTujuanLampiran2).should('contain', validateTujuan2);
            cy.get(kepala_surat.titleNamaTujuanLampiran3).should('contain', validateTujuan3);

        });
    }

    addTujuanLampiranRegression(Tambahan_Tujuan_Lampiran1) {
        const btnEditLampiranKepala = cy.get(kepala_surat.btnUbahPenerimaSuratLampiran).as('btnEditLampiranKepala')
        btnEditLampiranKepala.click({ force: true })
            .wait(3000)

        const btnTambahTujuanSurat = cy.get(kepala_surat.addMoreTujuanLampiran).as('btnTambahTujuanSurat')
        btnTambahTujuanSurat.click({ force: true })
            .wait(3000)



        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const scrappingMoreTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran3).as('scrappingMoreTujuanLampiran1')
            scrappingMoreTujuanLampiran1.wait(1000)
                .type(Tambahan_Tujuan_Lampiran1)
                .invoke('val')  // Extract the value of the input
                .then((inputValueMoreLampiranTujuan1) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Tambahan_Tujuan_Kepala_Lampiran1 = inputValueMoreLampiranTujuan1;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const addmoreTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran3).as('addmoreTujuanLampiran1')
        addmoreTujuanLampiran1.wait(3000)
            .type('{enter}')
    }

    checkDetailPreviewLampiran() {
        cy.wait(3000)

        const btnEditLampiranKepala = cy.get(kepala_surat.btnUbahPenerimaSuratLampiran).as('btnEditLampiranKepala')
        btnEditLampiranKepala.click({ force: true })
    }

    addLampiranKepala() {
        cy.wait(3000)

        const btnTambahTujuanSurat = cy.get(kepala_surat.addMoreTujuanLampiran).as('btnTambahTujuanSurat')
        btnTambahTujuanSurat.click({ force: true })
    }

    inputNamaLampiran1(Nama_Lampiran1) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const scrappingNamaTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran0).as('scrappingNamaTujuanLampiran1')
            scrappingNamaTujuanLampiran1.wait(1000)
                .type(Nama_Lampiran1)
                .invoke('val')  // Extract the value of the input
                .then((inputValueLampiranTujuan1) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Nama_Tujuan_Kepala_Lampiran1 = inputValueLampiranTujuan1;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const addTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran0).as('addTujuanLampiran1')
        addTujuanLampiran1.wait(3000)
            .type('{enter}')
    }

    inputNamaLampiran2(Nama_Lampiran2) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const scrappingNamaTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran1).as('scrappingNamaTujuanLampiran2')
            scrappingNamaTujuanLampiran2.wait(1000)
                .type(Nama_Lampiran2)
                .invoke('val')  // Extract the value of the input
                .then((inputValueLampiranTujuan2) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Nama_Tujuan_Kepala_Lampiran2 = inputValueLampiranTujuan2;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const addTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran1).as('addTujuanLampiran2')
        addTujuanLampiran2.wait(3000)
            .type('{enter}')
    }

    inputNamaLampiran3(Nama_Lampiran3) {
        cy.readFile(getJSONRequestFileCreateNotaDinas).then((data) => {
            // If there's no Kepala_Surat entry, initialize one
            if (!data.Kepala_Surat) {
                data.Kepala_Surat = [{}];
            }

            // Input data into fields
            const scrappingNamaTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran2).as('scrappingNamaTujuanLampiran3')
            scrappingNamaTujuanLampiran3.wait(1000)
                .type(Nama_Lampiran3)
                .wait(3000)
                .invoke('val')  // Extract the value of the input
                .then((inputValueLampiranTujuan3) => {
                    // Assign the inputValue2 to Tujuan2
                    data.Kepala_Surat[0].Nama_Tujuan_Kepala_Lampiran3 = inputValueLampiranTujuan3;

                    // Write data back to the JSON file
                    cy.writeFile(getJSONRequestFileCreateNotaDinas, data);
                })
        });

        const addTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran2).as('addTujuanLampiran3')
        addTujuanLampiran3.wait(3000)
            .type('{enter}')
    }

    // for After Functions
    closeKepalaSurat() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const closeKepalaSurat = cy.get(kepala_surat.closeKepalaSurat).as('closeKepalaSurat')
        closeKepalaSurat.scrollIntoView()
            .click()

        draftingNotaDinasPage.validateFormDefault()
    }

    closeLampiranKepalaSurat() {
        const btnLampiranKepalaSurat = cy.get(kepala_surat.closeLampiranKepalaSurat).as('btnLampiranKepalaSurat')
        btnLampiranKepalaSurat.scrollIntoView()
            .click()

        draftingNotaDinasPage.validateFormDefault()
    }
}