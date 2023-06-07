import setujui from "../../../selectors/sidebar/kotak_masuk/setujui"
import { ReviewVerifikasiSuratPage } from "./2_review_verifikasi_surat.cy"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()

export class SetujuiPage {

    setujui() {
        const btnSetujui = cy.xpath(setujui.btnSetujui).as('btnSetujui')
        btnSetujui.should('contain', 'Setujui')
            .click()

        const popUpSetujui = cy.xpath(setujui.popUpSetujui).as('popUpSetujui')
        popUpSetujui.should('be.visible')

        const btnKirimNaskah = cy.xpath(setujui.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    setujuiDanPenomoran() {
        const btnSetujuiDanPenomoran = cy.xpath(setujui.btnSetujuiDanPenomoran).as('btnSetujuiDanPenomoran')
        btnSetujuiDanPenomoran.should('contain', 'Setujui untuk penomoran')
            .click()

        const popUpSetujuiDanPenomoran = cy.xpath(setujui.popUpSetujuiDanPenomoran).as('popUpSetujuiDanPenomoran')
        popUpSetujuiDanPenomoran.should('be.visible')

        const titleSetujuiDanPenomoran = cy.xpath(setujui.titleSetujuiDanPenomoran).as('titleSetujuiDanPenomoran')
        titleSetujuiDanPenomoran.should('contain', 'Setujui & Minta Nomor Surat?')

        const btnKirimNaskah = cy.xpath(setujui.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    tandaTangani(passphrase) {
        const btnTandatangani = cy.xpath(setujui.btnTandatangani).as('btnTandatangani')
        btnTandatangani.should('contain', 'Tandatangani')
            .click()

        const popUpTandatangani = cy.xpath(setujui.popUpTandatangani).as('popUpTandatangani')
        popUpTandatangani.should('be.visible')

        const titleTandatangani = cy.xpath(setujui.titleTandatangani).as('titleTandatangani')
        titleTandatangani.should('contain', 'Apakah tujuan naskah berikut telah benar dan sesuai?')

        const subTitleTandatangani = cy.xpath(setujui.subTitleTandatangani).as('subTitleTandatangani')
        subTitleTandatangani.should('contain', 'Pastikan bahwa penerima naskah telah benar dan sesuai, lalu klik tombol “Tandatangani” untuk mengirim naskah.')

        const inputPassphrase = cy.xpath(setujui.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnKonfirmasiTandatangani = cy.xpath(setujui.btnKonfirmasiTandatangani).as('btnKonfirmasiTandatangani')
        btnKonfirmasiTandatangani.should('contain', 'Tandatangani')
            .click()
    }
}