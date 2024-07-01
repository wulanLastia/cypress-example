import list_surat_biasa from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah"
import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import nota_dinas from "../../../../selectors/sidebar/konsep_naskah/nota_dinas/drafting_nota_dinas"
export class ListNaskahSuratBiasaPage {

    goToKonsepNaskahSuratBiasa() {
        cy.get('body').then($body => {
            if ($body.find(konsep_naskah.suratBiasa).length > 0) {
                // Find Document Type
                const suratBiasa = cy.get(konsep_naskah.suratBiasa).as('suratBiasa')
                suratBiasa.contains('Surat Biasa')
                    .scrollIntoView()
                    .click()
            }else{
                // Find Document Type
                const list_listJenisNaskahSuratBiasa = cy.get(list_surat_biasa.list_listJenisNaskahSuratBiasa).as('list_listJenisNaskahSuratBiasa')
                list_listJenisNaskahSuratBiasa.find('div')
                    .contains('Surat Biasa')
                    .scrollIntoView()

                // Check Detail List
                const list_naskahTitleSuratBiasa = cy.get(list_surat_biasa.list_naskahTitleSuratBiasa).as('list_naskahTitleSuratBiasa')
                list_naskahTitleSuratBiasa.should('contain', 'Surat Biasa')
                    .and('be.visible')

                const btn_draftSuratBiasa = cy.get(list_surat_biasa.btn_draftSuratBiasa).as('btn_draftSuratBiasa')
                btn_draftSuratBiasa.should('contain', 'Buat Draft')
                    .and('be.visible')

                // Check if btn visible
                cy.get('body').then($body => {
                    if ($body.find(list_surat_biasa.btn_uploadFileSuratBiasa).length > 0) {
                        const btn_uploadFileSuratBiasa = cy.get(list_surat_biasa.btn_uploadFileSuratBiasa).as('btn_uploadFileSuratBiasa')
                    btn_uploadFileSuratBiasa.should('contain', 'Upload')
                        .and('be.visible')
                    }
                })

                const btn_templateSuratBiasa = cy.get(list_surat_biasa.btn_templateSuratBiasa).as('btn_templateSuratBiasa')
                btn_templateSuratBiasa.should('contain', 'Template')
                    .and('be.visible')

                // Access Button Buat Draft
                btn_draftSuratBiasa.click()
            }
        })
    }

    batalDrafting() {
        const btnKembali = cy.get(konsep_naskah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()

        const titleBatalDrafting = cy.get(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.get(konsep_naskah.btnBatalDrafting).as('btnBatalDrafting')
        btnBatalDrafting.should('contain', 'Ya, batalkan')
            .and('be.visible')
            .click()

        const panel_title = cy.get(list_surat_biasa.panel_title).as('panel_title')
        panel_title.should('contain', 'Konsep Naskah')
            .and('be.visible')
    }

    scrollListDown() {
        const div_body = cy.get(list_surat_biasa.div_body).as('div_body')
        div_body.scrollTo('bottom')
    }

    scrollListUp() {
        const div_body = cy.get(list_surat_biasa.div_body).as('div_body')
        div_body.scrollTo('top')
    }

    checkButtonBuatDraft() {
        // Find Document Type
        const list_listJenisNaskahSuratBiasa = cy.get(list_surat_biasa.list_listJenisNaskahSuratBiasa).as('list_listJenisNaskahSuratBiasa')
        list_listJenisNaskahSuratBiasa.find('div')
            .contains('Surat Biasa')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleSuratBiasa = cy.get(list_surat_biasa.list_naskahTitleSuratBiasa).as('list_naskahTitleSuratBiasa')
        list_naskahTitleSuratBiasa.should('contain', 'Surat Biasa')
            .and('be.visible')

        const btn_draftSuratBiasa = cy.get(list_surat_biasa.btn_draftSuratBiasa).as('btn_draftSuratBiasa')
        btn_draftSuratBiasa.should('contain', 'Buat Draft')
            .and('be.visible')
    }

    checkFlagMultifile() {
        // Find Document Type
        const list_listJenisNaskahSertifikat = cy.get(list_surat_biasa.list_listJenisNaskahSertifikat).as('list_listJenisNaskahSertifikat')
        list_listJenisNaskahSertifikat.find('div')
            .contains('Sertifikat')
            .scrollIntoView()

        // Assertion
        const list_naskahTitleSertifikat = cy.get(list_surat_biasa.list_naskahTitleSertifikat).as('list_naskahTitleSertifikat')
        list_naskahTitleSertifikat.should('contain', 'Sertifikat')
            .and('be.visible')

        const label_flagMultifile = cy.get(list_surat_biasa.label_flagMultifile).as('label_flagMultifile')
        label_flagMultifile.find('p')
            .should('contain', 'Bisa multifile')
            .and('be.visible')
    }

    checkFlagEmaterai() {
        // Find Document Type
        const list_listJenisNaskahSuratKuasaKhusus = cy.get(list_surat_biasa.list_listJenisNaskahSuratKuasaKhusus).as('list_listJenisNaskahSuratKuasaKhusus')
        list_listJenisNaskahSuratKuasaKhusus.find('div')
            .contains('Surat Kuasa / Surat Kuasa Khusus')
            .scrollIntoView()

        // Assertion
        const list_naskahTitleSuratKuasaKhusus = cy.get(list_surat_biasa.list_naskahTitleSuratKuasaKhusus).as('list_naskahTitleSuratKuasaKhusus')
        list_naskahTitleSuratKuasaKhusus.should('contain', 'Surat Kuasa / Surat Kuasa Khusus')
            .and('be.visible')

        const label_flagEmaterai = cy.get(list_surat_biasa.label_flagEmaterai).as('label_flagEmaterai')
        label_flagEmaterai.find('p')
            .should('contain', 'Membutuhkan E-meterai')
            .and('be.visible')
    }

    checkDirectSuratBiasa() {
        // Find Document Type
        const list_listJenisNaskahSuratBiasa = cy.get(list_surat_biasa.list_listJenisNaskahSuratBiasa).as('list_listJenisNaskahSuratBiasa')
        list_listJenisNaskahSuratBiasa.find('div')
            .contains('Surat Biasa')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleSuratBiasa = cy.get(list_surat_biasa.list_naskahTitleSuratBiasa).as('list_naskahTitleSuratBiasa')
        list_naskahTitleSuratBiasa.should('contain', 'Surat Biasa')
            .and('be.visible')

        const btn_draftSuratBiasa = cy.get(list_surat_biasa.btn_draftSuratBiasa).as('btn_draftSuratBiasa')
        btn_draftSuratBiasa.should('contain', 'Buat Draft')
            .and('be.visible')
            .click()

        // Assertion
        cy.url().should('eq', Cypress.env('base_url') + '/konsep-naskah/surat-biasa')
    }

    checkDirectNotaDinas() {
        // Find Document Type
        const list_listJenisNaskahNotaDinas = cy.get(list_surat_biasa.list_listJenisNaskahNotaDinas).as('list_listJenisNaskahNotaDinas')
        list_listJenisNaskahNotaDinas.find('div')
            .contains('Nota Dinas')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleNotaDinas = cy.get(list_surat_biasa.list_naskahTitleNotaDinas).as('list_naskahTitleNotaDinas')
        list_naskahTitleNotaDinas.should('contain', 'Nota Dinas')
            .and('be.visible')

        const btn_draftNotaDinas = cy.get(list_surat_biasa.btn_draftNotaDinas).as('btn_draftNotaDinas')
        btn_draftNotaDinas.should('contain', 'Buat Draft')
            .and('be.visible')
            .click()

        // Assertion
        cy.url().should('eq', Cypress.env('base_url') + '/konsep-naskah/nota-dinas')
    }

    goToKonsepNaskahNotaDinas() {
        cy.log(Cypress.env('cypress_layout'))
        if(Cypress.env('cypress_layout') == 1) {
            // Fitur layout lama (Akun Dispusipda)

            // Find Document Type
            const notaDinas = cy.get(konsep_naskah.notaDinas).as('notaDinas')
            notaDinas.contains('Nota Dinas')
                .scrollIntoView()
                .click()
        } else {
            // Fitur layout baru (Akun Diskominfo)

            // Find Document Type
            const list_listJenisNaskahNotaDinas = cy.get(list_surat_biasa.list_listJenisNaskahNotaDinas).as('list_listJenisNaskahNotaDinas')
            list_listJenisNaskahNotaDinas.find('div')
                .contains('Nota Dinas')
                .scrollIntoView()

            // Check Detail List
            const list_naskahTitleNotaDinas = cy.get(list_surat_biasa.list_naskahTitleNotaDinas).as('list_naskahTitleNotaDinas')
            list_naskahTitleNotaDinas.should('contain', 'Nota Dinas')
                .and('be.visible')

            const btn_draftNotaDinas = cy.get(list_surat_biasa.btn_draftNotaDinas).as('btn_draftNotaDinas')
            btn_draftNotaDinas.should('contain', 'Buat Draft')
                .and('be.visible')
                .click()

            // Access Button Buat Draft
            btn_draftNotaDinas.click()
        }
    }

    downloadFile(jenis_naskah) {
        // Download berdasarkan Jenis Naskah
        if (jenis_naskah === 'BERITA_ACARA') {
            const btn_templateBeritaAcara = cy.get(list_surat_biasa.btn_templateBeritaAcara).as('btn_templateBeritaAcara')
            btn_templateBeritaAcara.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'BERITA_ACARA_GUBERNUR') {
            const btn_templateBeritaAcaraGubernur = cy.get(list_surat_biasa.btn_templateBeritaAcaraGubernur).as('btn_templateBeritaAcaraGubernur')
            btn_templateBeritaAcaraGubernur.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'DAFTAR_HADIR') {
            const btn_templateDaftarHadir = cy.get(list_surat_biasa.btn_templateDaftarHadir).as('btn_templateDaftarHadir')
            btn_templateDaftarHadir.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'LAPORAN') {
            const btn_templateLaporan = cy.get(list_surat_biasa.btn_templateLaporan).as('btn_templateLaporan')
            btn_templateLaporan.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'LAPORAN_GUBERNUR') {
            const btn_templateLaporanGubernur = cy.get(list_surat_biasa.btn_templateLaporanGubernur).as('btn_templateLaporanGubernur')
            btn_templateLaporanGubernur.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'PENGUMUMAN') {
            const btn_templatePengumuman = cy.get(list_surat_biasa.btn_templatePengumuman).as('btn_templatePengumuman')
            btn_templatePengumuman.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'SURAT_BIASA') {
            const btn_templateSuratBiasa = cy.get(list_surat_biasa.btn_templateSuratBiasa).as('btn_templateSuratBiasa')
            btn_templateSuratBiasa.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'SURAT_IZIN') {
            const btn_templateSuratIzin = cy.get(list_surat_biasa.btn_templateSuratIzin).as('btn_templateSuratIzin')
            btn_templateSuratIzin.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'SURAT_REKOMENDASI') {
            const btn_templateSuratRekomendasi = cy.get(list_surat_biasa.btn_templateSuratRekomendasi).as('btn_templateSuratRekomendasi')
            btn_templateSuratRekomendasi.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        } else if (jenis_naskah === 'TELAAHAN_STAF') {
            const btn_templateTelaahanStaf = cy.get(list_surat_biasa.btn_templateTelaahanStaf).as('btn_templateTelaahanStaf')
            btn_templateTelaahanStaf.scrollIntoView()
                .should('contain', 'Template')
                .and('be.visible')
                .click()
        }

        // Verify document already download
        cy.readFile('cypress/downloads/TEMPLATE_' + jenis_naskah + '.docx')

    }

    // Untuk Nota Dinas 
    batalDraftingNotaDinas() {
        const btnKembali = cy.get(nota_dinas.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()

        const titleBatalDrafting = cy.get(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.get(konsep_naskah.btnBatalDrafting).as('btnBatalDrafting')
        btnBatalDrafting.should('contain', 'Ya, batalkan')
            .and('be.visible')
            .click()

        const panel_title = cy.get(list_surat_biasa.panel_title).as('panel_title')
        panel_title.should('contain', 'Konsep Naskah')
            .and('be.visible')
    }
}