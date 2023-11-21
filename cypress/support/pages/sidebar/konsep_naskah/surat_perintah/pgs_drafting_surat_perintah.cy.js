import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import surat_perintah from "../../../../selectors/sidebar/konsep_naskah/surat_perintah/drafting_surat_perintah"
import { MenuPage } from "../../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingSuratPerintahPage {

    gotoKonsepNaskahSuratPerintah() {
        menuPage.goToKonsepNaskah()

        const buttonSuratPerintah = cy.get(surat_perintah.btnSuratPerintah).as('buttonSuratPerintah')
        buttonSuratPerintah.should('be.visible').and('contain', 'Surat Perintah')
            .click()
            .wait(3000)

        this.checkDetail()
    }

    clickbtnKembali() {
        const btnKembali = cy.get(surat_perintah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()
    }

    checkPreviewNaskah() {
        this.aksesFormKopSurat()
        cy.wait(2000)

        this.aksesFormKepalaSurat()
        cy.wait(2000)

        this.aksesBadanNaskah()
        cy.wait(2000)

        this.aksesKakiSurat()
        cy.wait(2000)

        this.aksesLampiranSurat()
        cy.wait(2000)
    }

    checkDetail() {
        cy.wait(2000)

        const btnKembali = cy.get(surat_perintah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleMenu = cy.get(surat_perintah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const selectedKonsep = cy.get(surat_perintah.selectedKonsep).as('selectedKonsep')
        selectedKonsep.should('have.value', '/konsep-naskah/surat-perintah')

        // const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        // btnKirimNaskah.should('contain', 'Kirim Naskah') // Masih dalam tahap development

        // this.checkPreviewNaskah() // Beberapa fungsi masih dalam tahap development
    }

    batalDrafting() {
        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.xpath(konsep_naskah.btnBatalDrafting).as('btnBatalDrafting')
        btnBatalDrafting.should('contain', 'Ya, batalkan')
            .and('be.visible')
            .click()

        const titleKonsepNaskah2 = cy.get(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah2.should('contain', 'Buat Naskah Baru')
            .and('be.visible')
    }

    lanjutkanDrafting() {
        this.goToKonsepNaskahSuratBiasa()

        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnLanjutkanDrafting = cy.xpath(konsep_naskah.btnLanjutkanDrafting).as('btnLanjutkanDrafting')
        btnLanjutkanDrafting.should('contain', 'Tidak')
            .and('be.visible')
            .click()

        const titleMenu = cy.get(konsep_naskah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

    aksesFormKopSurat() {
        const previewKop = cy.get(surat_perintah.previewKop).first().as('previewKop')
        previewKop.click(180, 60)

        cy.wait(5000)

        const titleKop = cy.get(surat_perintah.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
    }

    aksesFormKepalaSurat() {
        const findKepalaSurat = cy.get(surat_perintah.previewKepala).as('findKepalaSurat')
        findKepalaSurat.scrollTo('top', {ensureScrollable: false})
        cy.wait(3000)

        const previewKepala = cy.get(surat_perintah.previewKepala).as('previewKepala')
        previewKepala.click(180, 240, { force: true })

        const titleKepala = cy.get(surat_perintah.titleKepala).as('titleKepala')
        titleKepala.should('contain', 'SURAT PERINTAH')
    }

    aksesBadanNaskah() {
        const previewBadan = cy.xpath(surat_perintah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360)

        const titleBadan = cy.get(surat_perintah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    aksesKakiSurat() {
        const previewKaki = cy.get(surat_perintah.previewKaki).as('previewKaki')
        previewKaki.scrollIntoView({ensureScrollable: false})
        .click(180, 560, { force: true })

        cy.wait(1500)

        const titleKaki = cy.get(surat_perintah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    aksesLampiranSurat() {
        const titleLampiran = cy.xpath(surat_perintah.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Klik tombol berikut untuk menambah lampiran')
    }

    validateFormDefault() {
        const editFormDefault = cy.get(surat_perintah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Sorot dan klik bagian ini untuk menampilkan teks editor')
            .and('be.visible')
    }

    inputKakiSurat() {
        const previewKaki = cy.xpath(surat_perintah.previewKaki).as('previewKaki')
        previewKaki.click(180, 600)

        const titleKaki = cy.xpath(surat_perintah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    kirimNaskah() {
        const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()

        const konfirmasiKirimNaskah = cy.get(surat_perintah.konfirmasiKirimNaskah).as('konfirmasiKirimNaskah')
        konfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()

    }

    negativeKirimNaskah() {
        const btnKirimNaskah = cy.get(surat_perintah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('be.visible')
        .should('be.disabled')
    }

    inputLampiranSuratNotaDinas() {
        const findLampiranPage = cy.get(konsep_naskah.previewLampiran).first().as('findLampiranPage');
        findLampiranPage.scrollIntoView();
    
        const previewLampiran1NotaDinas = cy.get(konsep_naskah.previewLampiranNotaDinas).first().as('previewLampiran1NotaDinas');
        previewLampiran1NotaDinas.scrollIntoView()
        .click({ force: true });
        cy.wait(3000);
    
        const titleLampiran = cy.get(konsep_naskah.titleLampiran).as('titleLampiran');
        titleLampiran.should('contain', 'Lampiran');
    }
    
    inputLampiran2SuratNotaDinas() {
        cy.wait(3000);
    
        const findLampiranPage = cy.get(konsep_naskah.previewLampiran).last().as('findLampiranPage');
        findLampiranPage.scrollIntoView();
    
        const previewLampiran2NotaDinas = cy.get(konsep_naskah.previewLampiranNotaDinas).last().as('previewLampiran2NotaDinas');
        previewLampiran2NotaDinas.scrollIntoView()
        .click({ force: true });
        cy.wait(3000);
    
        const titleLampiran = cy.get(konsep_naskah.titleLampiran).as('titleLampiran');
        titleLampiran.should('contain', 'Lampiran');
    }
    
    scrollPreviewPage() {
        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo('top')
    }

    clickSimpanSurat() {
        cy.wait(3000)

        const buttonSimpanSurat = cy.get(konsep_naskah.btnSimpanSuratNotaDinas).as('buttonSimpanSurat')
        buttonSimpanSurat.should('contain', 'Simpan')
            .click({ force: true })
    }


}