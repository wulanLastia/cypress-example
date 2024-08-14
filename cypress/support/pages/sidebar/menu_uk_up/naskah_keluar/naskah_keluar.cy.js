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
        const filter_modeDistribusi = cy.get(naskah_keluar.filter_modeDistribusi)
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

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_statusTindakLanjut).last()
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Telah distribusi')
                        .and('be.visible')
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        } else if(inputModeDistribusi == 2) {
            // Select mode distribusi : distribusi luar sidebar
            const filter_modeDistribusi = cy.get(naskah_keluar.filter_modeDistribusi)
            filter_modeDistribusi.should('be.visible')
                .click()

            const filter_modeDistribusi_diluar_sidebar = cy.get(naskah_keluar.filter_modeDistribusi_diluar_sidebar)
            filter_modeDistribusi_diluar_sidebar.should('be.visible')
                .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_statusTindakLanjut).last()
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Distribusi luar Sidebar')
                        .and('be.visible')
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        } else {
            // Select mode distribusi : semua
            const filter_modeDistribusi = cy.get(naskah_keluar.filter_modeDistribusi)
            filter_modeDistribusi.should('be.visible')
                .click()

            const filter_modeDistribusi_semua = cy.get(naskah_keluar.filter_modeDistribusi_semua)
            filter_modeDistribusi_semua.should('be.visible')
                .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_statusTindakLanjut).last()
                    label_statusTindakLanjut.find('p')
                        .and('be.visible')
                        .invoke('text')
                        .then((textValue) => {
                            expect(textValue.trim()).to.be.oneOf(['Telah distribusi', 'Distribusi luar Sidebar'])
                        })
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        }
    }

    checkFilterUrgensi() {
        const filter_urgensi = cy.get(naskah_keluar.filter_urgensi)
        filter_urgensi.should('be.visible')
            .click()

        // Assertion
        const filter_urgensi_biasa = cy.get(naskah_keluar.filter_urgensi_biasa)
        filter_urgensi_biasa.should('be.visible')

        const filter_urgensi_penting = cy.get(naskah_keluar.filter_urgensi_penting)
        filter_urgensi_penting.should('be.visible')

        const filter_urgensi_segera = cy.get(naskah_keluar.filter_urgensi_segera)
        filter_urgensi_segera.should('be.visible')

        const filter_urgensi_amat_segera = cy.get(naskah_keluar.filter_urgensi_amat_segera)
        filter_urgensi_amat_segera.should('be.visible')

        const filter_urgensi_selected = cy.get(naskah_keluar.filter_urgensi_selected)
        filter_urgensi_selected.find('input')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Semua Urgensi')
    }

    selectUrgensi(inputanUrgensi){
        if(inputanUrgensi == 1) {
            // Select urgensi : biasa
            const filter_urgensi_biasa = cy.get(naskah_keluar.filter_urgensi_biasa)
            filter_urgensi_biasa.scrollIntoView()
                .should('be.visible')
                .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_urgensiTindakLanjut = cy.get(naskah_keluar.label_urgensiTindakLanjut).last()
                    label_urgensiTindakLanjut.find('p')
                        .should('contain', 'Biasa')
                        .and('be.visible')
                        .wait(2000)
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        } else if(inputanUrgensi == 2) {
            // Select urgensi : penting
            const filter_urgensi = cy.get(naskah_keluar.filter_urgensi)
            filter_urgensi.scrollIntoView()
                .should('be.visible')
                .click()

            const filter_urgensi_penting = cy.get(naskah_keluar.filter_urgensi_penting)
            filter_urgensi_penting.should('be.visible')
                    .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_urgensiTindakLanjut = cy.get(naskah_keluar.label_urgensiTindakLanjut).last()
                    label_urgensiTindakLanjut.find('p')
                        .should('contain', 'Penting')
                        .and('be.visible')
                        .wait(2000)
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        } else if(inputanUrgensi == 3) {
            // Select urgensi : segera
            const filter_urgensi = cy.get(naskah_keluar.filter_urgensi)
            filter_urgensi.scrollIntoView()
                .should('be.visible')
                .click()

            const filter_urgensi_segera = cy.get(naskah_keluar.filter_urgensi_segera)
            filter_urgensi_segera.should('be.visible')
                .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_urgensiTindakLanjut = cy.get(naskah_keluar.label_urgensiTindakLanjut).last()
                    label_urgensiTindakLanjut.find('p')
                        .should('contain', 'Segera')
                        .and('be.visible')
                        .wait(2000)
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        } else if(inputanUrgensi == 4) {
            // Select urgensi : amat segera
            const filter_urgensi = cy.get(naskah_keluar.filter_urgensi)
            filter_urgensi.scrollIntoView()
                .should('be.visible')
                .click()

            const filter_urgensi_amat_segera = cy.get(naskah_keluar.filter_urgensi_amat_segera)
            filter_urgensi_amat_segera.should('be.visible')
                .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_urgensiTindakLanjut = cy.get(naskah_keluar.label_urgensiTindakLanjut).last()
                    label_urgensiTindakLanjut.find('p')
                        .should('contain', 'Amat Segera')
                        .and('be.visible')
                        .wait(2000)
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        } else {
            // Select urgensi : all checkbox
            const filter_urgensi = cy.get(naskah_keluar.filter_urgensi)
            filter_urgensi.scrollIntoView()
                .should('be.visible')
                .click()

            const filter_urgensi_biasa = cy.get(naskah_keluar.filter_urgensi_biasa)
            filter_urgensi_biasa.should('be.visible')
                .click()

            const filter_urgensi_penting = cy.get(naskah_keluar.filter_urgensi_penting)
            filter_urgensi_penting.should('be.visible')
                    .click()

            const filter_urgensi_segera = cy.get(naskah_keluar.filter_urgensi_segera)
            filter_urgensi_segera.should('be.visible')
                .click()
                
            const filter_urgensi_amat_segera = cy.get(naskah_keluar.filter_urgensi_amat_segera)
            filter_urgensi_amat_segera.should('be.visible')
                .click()

            cy.wait(3000)

            // Check if data available
            cy.get('body').then($body => {
                if ($body.find(naskah_keluar.label_statusTindakLanjut).length > 0) {
                    // Assertion
                    const label_urgensiTindakLanjut = cy.get(naskah_keluar.label_urgensiTindakLanjut).last()
                    label_urgensiTindakLanjut.find('p')
                        .and('be.visible')
                        .invoke('text')
                        .then((textValue) => {
                            expect(textValue.trim()).to.be.oneOf(['Biasa', 'Penting', 'Segera', 'Amat Segera'])
                        })
                } else {
                    // Assertion
                    const label_statusTindakLanjut = cy.get(naskah_keluar.label_dataEmpty)
                    label_statusTindakLanjut.find('p')
                        .should('contain', 'Belum ada naskah keluar')
                        .and('be.visible')
                }
            })
        }
    }

    clearFilterUrgensi() {
        // Click btn clear selected
        const btn_clear_urgensi = cy.get(naskah_keluar.btn_clear_urgensi)
        btn_clear_urgensi.should('be.visible')
                .click()
    }

    closeFilterUrgensi() {
        // Select urgensi
        const filter_urgensi = cy.get(naskah_keluar.filter_urgensi)
        filter_urgensi.scrollIntoView()
            .should('be.visible')
            .click()

        const label_naskahKeluarTitle = cy.get(naskah_keluar.label_naskahKeluarTitle)
        label_naskahKeluarTitle.scrollIntoView()
            .click()

        // Assertion
        const filter_urgensi_assert = cy.get(naskah_keluar.filter_urgensi)
        filter_urgensi_assert.should('have.class', 'v-select w-full max-w-52 font-lato text-sm font-normal filter-select vs--multiple vs--unsearchable')
    }
}