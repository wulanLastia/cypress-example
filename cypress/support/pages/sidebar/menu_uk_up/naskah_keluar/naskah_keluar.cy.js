import naskah_keluar from "@selectors/sidebar/menu_uk_up/naskah_keluar/naskah_keluar"

export class NaskahKeluarPage {

    checkDetail() {
        // Click data terbaru
        const label_dataJenis0 = cy.get(naskah_keluar.label_dataJenis0)
        label_dataJenis0.should('be.visible')
            .click()

        // Assertion 1
        const tab_registrasi = cy.get(naskah_keluar.tab_registrasi)
        tab_registrasi.should('be.visible')
            .and('have.class', 'tabs__menu active')

        const label_jenisNaskahTitle = cy.get(naskah_keluar.label_jenisNaskahTitle)
        label_jenisNaskahTitle.should('be.visible')

        const value_jenisNaskah = cy.get(naskah_keluar.value_jenisNaskah)
        value_jenisNaskah.should('not.be.empty')

        const label_perihalTitle = cy.get(naskah_keluar.label_perihalTitle)
        label_perihalTitle.should('be.visible')

        const value_perihal = cy.get(naskah_keluar.value_perihal)
        value_perihal.should('not.be.empty')

        const label_nomorNaskahTitle = cy.get(naskah_keluar.label_nomorNaskahTitle)
        label_nomorNaskahTitle.should('be.visible')

        const value_nomorNaskah = cy.get(naskah_keluar.value_nomorNaskah)
        value_nomorNaskah.should('not.be.empty')

        const label_urgensiTitle = cy.get(naskah_keluar.label_urgensiTitle)
        label_urgensiTitle.should('be.visible')

        const value_urgensi = cy.get(naskah_keluar.value_urgensi)
        value_urgensi.should('not.be.empty')

        const label_sifatTitle = cy.get(naskah_keluar.label_sifatTitle)
        label_sifatTitle.should('be.visible')

        const value_sifat = cy.get(naskah_keluar.value_sifat)
        value_sifat.should('not.be.empty')

        // Assertion 2
        const tab_histori = cy.get(naskah_keluar.tab_histori)
        tab_histori.should('be.visible')

        // Assertion 3 @TODO: perlu difollowup terlebih dahulu

        // Assertion 4 @TODO: perlu difollowup terlebih dahulu

        // Assertion 5
        const btn_bagikan = cy.get(naskah_keluar.btn_bagikan)
        btn_bagikan.should('contain', 'Bagikan')
            .and('be.visible')
    }

    checkModeDistribusi() {
        const filter_modeDistribusi = cy.get(naskah_keluar.filter_modeDistribusi).first()
        filter_modeDistribusi.should('be.visible')
            .click()

        // Assertion
        const filter_modeDistribusi_semua = cy.get(naskah_keluar.filter_modeDistribusi_semua)
        filter_modeDistribusi_semua.should('be.visible')

        const filter_modeDistribusi_telah_ditribusi = cy.get(naskah_keluar.filter_modeDistribusi_telah_ditribusi)
        filter_modeDistribusi_telah_ditribusi.should('be.visible')

        const filter_modeDistribusi_diluar_sidebar = cy.get(naskah_keluar.filter_modeDistribusi_diluar_sidebar)
        filter_modeDistribusi_diluar_sidebar.should('be.visible')

        const filter_modeDistribusi_selected = cy.get(naskah_keluar.filter_modeDistribusi_selected).first()
        filter_modeDistribusi_selected.should('be.visible')
            .and('contain', 'Semua')
    }

    selectModeDistribusi(inputModeDistribusi) {
        if(inputModeDistribusi == 1) {
            // Select mode distribusi : telah distribusi
            const filter_modeDistribusi_telah_ditribusi = cy.get(naskah_keluar.filter_modeDistribusi_telah_ditribusi)
            filter_modeDistribusi_telah_ditribusi.should('be.visible')
                .click()

            // Assertion
            const label_statusTindakLanjut = cy.get(naskah_keluar.label_statusTindakLanjut).last()
            label_statusTindakLanjut.find('p')
                .should('contain', 'Telah distribusi')
                .and('be.visible')
        } else if(inputModeDistribusi == 2) {
            // Select mode distribusi : distribusi luar sidebar
            const filter_modeDistribusi = cy.get(naskah_keluar.filter_modeDistribusi).first()
            filter_modeDistribusi.should('be.visible')
                .click()

            const filter_modeDistribusi_diluar_sidebar = cy.get(naskah_keluar.filter_modeDistribusi_diluar_sidebar)
            filter_modeDistribusi_diluar_sidebar.should('be.visible')
                .click()

            // Assertion
            const label_statusTindakLanjut = cy.get(naskah_keluar.label_statusTindakLanjut).last()
            label_statusTindakLanjut.find('p')
                .should('contain', 'Distribusi luar Sidebar')
                .and('be.visible')
        } else {
            // Select mode distribusi : semua
            const filter_modeDistribusi = cy.get(naskah_keluar.filter_modeDistribusi).first()
            filter_modeDistribusi.should('be.visible')
                .click()

            const filter_modeDistribusi_semua = cy.get(naskah_keluar.filter_modeDistribusi_semua)
            filter_modeDistribusi_semua.should('be.visible')
                .click()

            // Assertion
            const label_statusTindakLanjut = cy.get(naskah_keluar.label_statusTindakLanjut).last()
            label_statusTindakLanjut.find('p')
                .and('be.visible')
                .invoke('text')
                .then((textValue) => {
                    cy.log(textValue)
                    //expect(textValue).to.be.oneOf(['Telah distribusi', 'Distribusi luar Sidebar'])
                })
        }
    }
}