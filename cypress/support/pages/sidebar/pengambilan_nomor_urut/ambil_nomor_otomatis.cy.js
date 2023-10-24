import ambil_nomor_otomatis from "../../../selectors/sidebar/pengambilan_nomor_urut/ambil_nomor_otomatis"
import pengambilan_nomor_urut from "../../../selectors/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut"

const filename = "cypress/fixtures/non_cred/penomoran/ambil_nomor_otomatis.json"

export class AmbilNomorOtomatisPage {

    checkPopupPengambilanNomor(jenisSurat, ukUp) {
        const filterBtnAmbilNomor = cy.get(pengambilan_nomor_urut.filterBtnAmbilNomor).as('filterBtnAmbilNomor')
        filterBtnAmbilNomor.should('contain', 'Ambil Nomor')
            .click()

        const popupPengambilanNomor = cy.get(ambil_nomor_otomatis.popupPengambilanNomor).as('popupPengambilanNomor')
        popupPengambilanNomor.should('be.visible')

        cy.writeFile(filename, {
            jenis_surat: jenisSurat,
            uk_up: ukUp
        })
    }

    batalMengambilNomorUrut() {
        const popupPengambilanNomor = cy.get(ambil_nomor_otomatis.popupPengambilanNomor).as('popupPengambilanNomor')
        popupPengambilanNomor.should('be.visible')
            .scrollTo('bottom')

        const btnCancelPengambilanNomor = cy.get(ambil_nomor_otomatis.btnCancelPengambilanNomor).last().as('btnCancelPengambilanNomor')
        btnCancelPengambilanNomor.should('contain', 'Batal')
            .and('be.visible')
            .click()

        const popupPengambilanNomor2 = cy.get(ambil_nomor_otomatis.popupPengambilanNomor).as('popupPengambilanNomor2')
        popupPengambilanNomor2.should('not.be.visible')
    }

    checkDetailPopupPengambilanNomor() {
        const popupPengambilanNomor = cy.get(ambil_nomor_otomatis.popupPengambilanNomor).as('popupPengambilanNomor')
        popupPengambilanNomor.should('be.visible')
            .scrollTo('top')

        const titlePopupPengambilanNomor = cy.get(ambil_nomor_otomatis.titlePopupPengambilanNomor).as('titlePopupPengambilanNomor')
        titlePopupPengambilanNomor.should('contain', 'Apakah Anda ingin memesan nomor urut tersebut?')
            .and('be.visible')

        const titlePopupPengambilanNomorDesc = cy.get(ambil_nomor_otomatis.titlePopupPengambilanNomorDesc).as('titlePopupPengambilanNomorDesc')
        titlePopupPengambilanNomorDesc.should('contain', 'Sistem Sidebar akan memberikan Anda nomor urut naskah secara otomatis berdasarkan kebutuhan sebagai berikut')
            .and('be.visible')

        const labelKonfirmasiPengambilanNomor = cy.get(ambil_nomor_otomatis.labelKonfirmasiPengambilanNomor).as('labelKonfirmasiPengambilanNomor')
        labelKonfirmasiPengambilanNomor.should('contain', 'KEBUTUHAN PENOMORAN')
            .and('be.visible')

        const popupLabelTanggalPenomoran = cy.get(ambil_nomor_otomatis.popupLabelTanggalPenomoran).as('popupLabelTanggalPenomoran')
        popupLabelTanggalPenomoran.should('contain', 'Tanggal penomoran')
            .and('be.visible')

        const popupLabelJenisNaskah = cy.get(ambil_nomor_otomatis.popupLabelJenisNaskah).as('popupLabelJenisNaskah')
        popupLabelJenisNaskah.should('contain', 'Kategori Jenis Naskah')
            .and('be.visible')

        const popupPengambilanNomor2 = cy.get(ambil_nomor_otomatis.popupPengambilanNomor).as('popupPengambilanNomor2')
        popupPengambilanNomor2.should('be.visible')
            .scrollTo('bottom')

        const popupLabelUKUP = cy.get(ambil_nomor_otomatis.popupLabelUKUP).as('popupLabelUKUP')
        popupLabelUKUP.should('contain', 'UK/UP')
            .and('be.visible')

        const btnCancelPengambilanNomor = cy.get(ambil_nomor_otomatis.btnCancelPengambilanNomor).last().as('btnCancelPengambilanNomor')
        btnCancelPengambilanNomor.should('contain', 'Batal')
            .and('be.visible')

        const btnKonfirmasiAmbilNomor = cy.get(ambil_nomor_otomatis.btnKonfirmasiAmbilNomor).as('btnKonfirmasiAmbilNomor')
        btnKonfirmasiAmbilNomor.should('contain', 'Dapatkan nomor urut')
            .and('be.visible')
    }

    checkPopupDapatkanNomorUrut() {
        const btnKonfirmasiAmbilNomor = cy.get(ambil_nomor_otomatis.btnKonfirmasiAmbilNomor).as('btnKonfirmasiAmbilNomor')
        btnKonfirmasiAmbilNomor.should('contain', 'Dapatkan nomor urut')
            .and('be.visible')
            .click()

        cy.wait(5000)

        const popupBerhasilMendapatkanNomor = cy.get(ambil_nomor_otomatis.popupBerhasilMendapatkanNomor).as('popupBerhasilMendapatkanNomor')
        popupBerhasilMendapatkanNomor.should('be.visible')

        const valueNomorUrut = cy.get(ambil_nomor_otomatis.valueNomorUrut).as('valueNomorUrut')
        valueNomorUrut.should('not.be.empty')
            .then($value => {
                const textValue = $value.text()

                cy.readFile(filename).then((data) => {
                    data.nomor_urut = textValue
                    cy.writeFile(filename, data)
                })

                const dayjs = require("dayjs")
                const arrDay = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
                const day = arrDay[dayjs().format("d")]

                const arrMonth = ["Desember", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November"]
                const month = arrMonth[dayjs().format("M")]

                const date = dayjs().format("DD")

                const dateYear = dayjs().format("YYYY")

                cy.readFile(filename).then((data) => {
                    data.tanggal = day + ", " + date + " " + month + " " + dateYear
                    cy.writeFile(filename, data)
                })
            })

        const labelBerhasilMendapatkanNomor = cy.get(ambil_nomor_otomatis.labelBerhasilMendapatkanNomor).as('labelBerhasilMendapatkanNomor')
        labelBerhasilMendapatkanNomor.should('contain', 'Berhasil mendapatkan nomor urut')
            .and('be.visible')

        const descBerhasilMendapatkanNomor = cy.get(ambil_nomor_otomatis.descBerhasilMendapatkanNomor).as('descBerhasilMendapatkanNomor')
        descBerhasilMendapatkanNomor.should('contain', 'Nomor yang didapatkan bisa dilihat pada tabel riwayat pengambilan nomor urut naskah pada halaman awal.')
            .and('be.visible')

        const btnSelesaiMendapatkanNomor = cy.get(ambil_nomor_otomatis.btnSelesaiMendapatkanNomor).as('btnSelesaiMendapatkanNomor')
        btnSelesaiMendapatkanNomor.should('contain', 'Selesai')
            .and('be.visible')
    }

    checkBtnSelesaiMendapatkanNomor() {
        const btnSelesaiMendapatkanNomor = cy.get(ambil_nomor_otomatis.btnSelesaiMendapatkanNomor).as('btnSelesaiMendapatkanNomor')
        btnSelesaiMendapatkanNomor.should('contain', 'Selesai')
            .and('be.visible')
            .click()

        const popupBerhasilMendapatkanNomor = cy.get(ambil_nomor_otomatis.popupBerhasilMendapatkanNomor).as('popupBerhasilMendapatkanNomor')
        popupBerhasilMendapatkanNomor.should('not.be.visible')
    }

    checkNomorUrut() {
        cy.readFile(filename).then((object) => {
            const validateDataTanggalPesanNomorUrut = cy.get(ambil_nomor_otomatis.validateDataTanggalPesanNomorUrut).first().as('validateDataTanggalPesanNomorUrut')
            validateDataTanggalPesanNomorUrut.should('contain', object.tanggal)

            const validateDataTanggalNomorUrut = cy.get(ambil_nomor_otomatis.validateDataTanggalNomorUrut).first().as('validateDataTanggalNomorUrut')
            validateDataTanggalNomorUrut.should('contain', object.tanggal)

            const validateDataNomorUrut = cy.get(ambil_nomor_otomatis.validateDataNomorUrut).first().as('validateDataNomorUrut')
            validateDataNomorUrut.should('contain', object.nomor_urut)

            const validateStatusNomorUrut = cy.get(ambil_nomor_otomatis.validateStatusNomorUrut).first().as('validateStatusNomorUrut')
            validateStatusNomorUrut.should('contain', 'Belum Registrasi')
        })
    }

}