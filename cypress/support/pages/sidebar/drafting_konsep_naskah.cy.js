import navbar from "../../selectors/navbar"
import menu from "../../selectors/sidebar/menu"
import konsep_naskah from "../../selectors/sidebar/konsep_naskah"

export class DraftingKonsepNaskahPage {

    checkDetail() {
        const titleKonsepNaskah = cy.xpath(konsep_naskah.titleKonsepNaskah)
        titleKonsepNaskah.should('contain','Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(konsep_naskah.subTitleKonsepNaskah)
        subTitleKonsepNaskah.should('contain','TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.xpath(konsep_naskah.suratBiasa)
        suratBiasa.should('be.visible')
            .click()

        const btnKembali = cy.xpath(konsep_naskah.btnKembali)
        btnKembali.should('be.visible')

        const titleMenu = cy.xpath(konsep_naskah.titleMenu)
        titleMenu.should('contain','Konsep Naskah')
            .and('be.visible')

        const selectedKonsep = cy.xpath(konsep_naskah.selectedKonsep)
        selectedKonsep.select('Surat Biasa')

        const titleDraft = cy.xpath(konsep_naskah.titleDraft)
        titleDraft.should('contain','Simpan')
            .and('be.visible')

        const btnKirimNaskah = cy.xpath(konsep_naskah.btnKirimNaskah)
        btnKirimNaskah.should('contain','Kirim Naskah')
            .and('be.visible')

        const editFormDefault = cy.xpath(konsep_naskah.editFormDefault)
        editFormDefault.should('contain','Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')

        /*const parentKotakMasuk = cy.xpath(menu.parentKotakMasuk)
        parentKotakMasuk.click()

        const reviewNaskahKM = cy.xpath(menu.reviewNaskahKM)
        reviewNaskahKM.should('contain','Review Naskah')
            .and('be.visible')
            .click()*/
            
        const previewKop = cy.xpath(konsep_naskah.previewKop)
        previewKop.click(180, 60)
    }

    batalDrafting() {
        const titleKonsepNaskah = cy.xpath(konsep_naskah.titleKonsepNaskah)
        titleKonsepNaskah.should('contain','Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(konsep_naskah.subTitleKonsepNaskah)
        subTitleKonsepNaskah.should('contain','TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.xpath(konsep_naskah.suratBiasa)
        suratBiasa.should('be.visible')
            .click()

        const btnKembali = cy.xpath(konsep_naskah.btnKembali)
        btnKembali.should('be.visible')
            .click()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting)
        titleBatalDrafting.should('contain','Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.xpath(konsep_naskah.btnBatalDrafting)
        btnBatalDrafting.should('contain','Ya, batalkan')
            .and('be.visible')
            .click()
        
        const titleKonsepNaskah2 = cy.xpath(konsep_naskah.titleKonsepNaskah)
        titleKonsepNaskah2.should('contain','Buat Naskah Baru')
            .and('be.visible')

        const parentKotakMasuk = cy.xpath(menu.parentKotakMasuk)
        parentKotakMasuk.click()

        const reviewNaskahKM = cy.xpath(menu.reviewNaskahKM)
        reviewNaskahKM.should('contain','Review Naskah')
            .and('be.visible')
            .click()
    }

    lanjutkanDrafting() {
        const titleKonsepNaskah = cy.xpath(konsep_naskah.titleKonsepNaskah)
        titleKonsepNaskah.should('contain','Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(konsep_naskah.subTitleKonsepNaskah)
        subTitleKonsepNaskah.should('contain','TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.xpath(konsep_naskah.suratBiasa)
        suratBiasa.should('be.visible')
            .click()

        const btnKembali = cy.xpath(konsep_naskah.btnKembali)
        btnKembali.should('be.visible')
            .click()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting)
        titleBatalDrafting.should('contain','Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnLanjutkanDrafting = cy.xpath(konsep_naskah.btnLanjutkanDrafting)
        btnLanjutkanDrafting.should('contain','Tidak')
            .and('be.visible')
            .click()
        
        const titleMenu = cy.xpath(konsep_naskah.titleMenu)
        titleMenu.should('contain','Konsep Naskah')
            .and('be.visible')

        const parentKotakMasuk = cy.xpath(menu.parentKotakMasuk)
        parentKotakMasuk.click()

        const reviewNaskahKM = cy.xpath(menu.reviewNaskahKM)
        reviewNaskahKM.should('contain','Review Naskah')
            .and('be.visible')
            .click()
    }

}