import list_riwayat from "@selectors/sidebar/pengambilan_nomor_urut/list_riwayat"
import ambil_nomor_otomatis from "@selectors/sidebar/pengambilan_nomor_urut/ambil_nomor_otomatis"

const filename = "cypress/fixtures/non_cred/penomoran/ambil_nomor_otomatis.json"
export class ListRiwayatPage {

    checkDetail() {
        const titleTablePengambilanNomor = cy.get(list_riwayat.titleTablePengambilanNomor).as('titleTablePengambilanNomor')
        titleTablePengambilanNomor.should('contain', 'Riwayat Pengambilan Nomor Urut Naskah')
            .and('be.visible')

        const headKolomTanggalPemesanan = cy.get(list_riwayat.headKolomTanggalPemesanan).as('headKolomTanggalPemesanan')
        headKolomTanggalPemesanan.should('contain', 'TANGGAL PEMESANAN')
            .and('be.visible')

        const headKolomJenisNaskah = cy.get(list_riwayat.headKolomJenisNaskah).as('headKolomJenisNaskah')
        headKolomJenisNaskah.should('contain', 'JENIS NASKAH')
            .and('be.visible')

        const headKolomUKUP = cy.get(list_riwayat.headKolomUKUP).as('headKolomUKUP')
        headKolomUKUP.should('contain', 'UK/UP')
            .and('be.visible')

        const headKolomTanggalNomor = cy.get(list_riwayat.headKolomTanggalNomor).as('headKolomTanggalNomor')
        headKolomTanggalNomor.should('contain', 'TANGGAL NOMOR')
            .and('be.visible')

        const headKolomNomorUrut = cy.get(list_riwayat.headKolomNomorUrut).as('headKolomNomorUrut')
        headKolomNomorUrut.should('contain', 'NOMOR URUT')
            .and('be.visible')

        const headKolomStatus = cy.get(list_riwayat.headKolomStatus).as('headKolomStatus')
        headKolomStatus.should('contain', 'STATUS')
            .and('be.visible')
    }

    checkBtnAksi() {
        const validateStatusNomorUrut = cy.get(ambil_nomor_otomatis.validateStatusNomorUrut).first().as('validateStatusNomorUrut')
        validateStatusNomorUrut.should('contain', 'Belum Registrasi')
            .then(() => {
                const tablePengambilanNomor = cy.get(ambil_nomor_otomatis.tablePengambilanNomor).first().as('tablePengambilanNomor')
                tablePengambilanNomor.should('be.visible')
                    .scrollTo('right', { ensureScrollable: false })

                const validateAksi = cy.get(ambil_nomor_otomatis.validateAksi).first().as('validateAksi')
                validateAksi.should('contain', 'Batalkan')
            })
    }

    checkTampilanStatusBelumRegistrasi() {
        const validateStatusNomorUrut = cy.get(ambil_nomor_otomatis.validateStatusNomorUrut).first().as('validateStatusNomorUrut')
        validateStatusNomorUrut.should('contain', 'Belum Registrasi')
            .and('have.class', 'inline-block px-2 py-1 text-white font-sans font-semibold text-xs rounded-lg bg-[#F44336]')
    }

    validasiNomorUrutDiluarOrg() {
        cy.readFile(filename).then((object) => {
            const tableNomorNaskah = cy.get(list_riwayat.tableNomorNaskah).as('tableNomorNaskah')
            tableNomorNaskah.should('contain', object.nomor_urut_akhir)

            const tableBankNomorStatus = cy.get(list_riwayat.tableBankNomorStatus).first().as('tableBankNomorStatus')
            tableBankNomorStatus.should('contain', 'Telah Dipesan')
                .and('have.class', 'inline-block px-2 py-1 text-white font-sans font-semibold text-xs rounded-lg bg-[#2196F3]')

            const tableBankNomorTanggalDipesan = cy.get(list_riwayat.tableBankNomorTanggalDipesan).first().as('tableBankNomorTanggalDipesan')
            tableBankNomorTanggalDipesan.should('contain', object.tanggal)
        })
    }

    validasiNomorUrutDiluarOrgMultiple() {
        cy.readFile(filename).then((object) => {
            const tableNomorNaskah = cy.get(list_riwayat.tableNomorNaskah).as('tableNomorNaskah')
            tableNomorNaskah.should('contain', object.nomor_urut_akhir)

            const tableBankNomorStatus = cy.get(list_riwayat.tableBankNomorStatus).first().as('tableBankNomorStatus')
            tableBankNomorStatus.should('contain', 'Telah Dipesan')
                .and('have.class', 'inline-block px-2 py-1 text-white font-sans font-semibold text-xs rounded-lg bg-[#2196F3]')

            const tableBankNomorTanggalDipesan = cy.get(list_riwayat.tableBankNomorTanggalDipesan).first().as('tableBankNomorTanggalDipesan')
            tableBankNomorTanggalDipesan.should('contain', object.tanggal)
        })
    }

    batalkanNomorTerakhir() {
        const tableBankNomor = cy.get(list_riwayat.tableBankNomor).as('tableBankNomor')
        tableBankNomor.children()
            .should('be.visible')
            .scrollTo('right')

        const btnBatalkanNomor = cy.get(list_riwayat.btnBatalkanNomor).as('btnBatalkanNomor')
        btnBatalkanNomor.should('contain', 'Batalkan')
            .click()
            .then(() => {
                const popupBatalkanNomor = cy.get(list_riwayat.popupBatalkanNomor).as('popupBatalkanNomor')
                popupBatalkanNomor.should('be.visible')

                const popupTitleBatalkanNomor = cy.get(list_riwayat.popupTitleBatalkanNomor).as('popupTitleBatalkanNomor')
                popupTitleBatalkanNomor.should('contain', 'Apakah Anda ingin membatalkan pemberian nomor?')

                const popupDescBatalkanNomor = cy.get(list_riwayat.popupDescBatalkanNomor).as('popupDescBatalkanNomor')
                popupDescBatalkanNomor.should('contain', 'Orang berikut TIDAK akan dapat meregistrasi naskah menggunakan nomor yang diberikan pada aplikasi Sidebar v1.')

                const popupTitleNomor = cy.get(list_riwayat.popupTitleNomor).as('popupTitleNomor')
                popupTitleNomor.should('contain', 'Nomor surat yang akan diberikan:')

                cy.readFile(filename).then((object) => {
                    const popupNomor = cy.get(list_riwayat.popupNomor).as('popupNomor')
                    popupNomor.should('contain', object.nomor_urut_akhir)
                })

                const btnKonfirmasiBatalkanNomor = cy.get(list_riwayat.btnKonfirmasiBatalkanNomor).as('btnKonfirmasiBatalkanNomor')
                btnKonfirmasiBatalkanNomor.should('contain', 'Ya')
                    .click()
            })
    }

}