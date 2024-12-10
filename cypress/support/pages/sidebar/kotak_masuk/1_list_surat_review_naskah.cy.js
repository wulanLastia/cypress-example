import review_naskah from "@selectors/sidebar/kotak_masuk/list_review_naskah"

export class ListSuratReviewNaskahPage {

    checkDetailHalaman() {
        this.checkTitleReviewNaskah()

        const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
        searchReviewNaskah.find('input')
            .should('have.attr', 'placeholder', 'Cari berdasarkan perihal')
            .and('be.visible')

        const tableReviewNaskah = cy.get(review_naskah.tableReviewNaskah).as('tableReviewNaskah')
        tableReviewNaskah.should('have.class', 'w-full mx-auto')
            .and('be.visible')
    }

    checkTitleReviewNaskah() {
        const titleReviewNaskah = cy.get(review_naskah.titleReviewNaskah).as('titleReviewNaskah')
        titleReviewNaskah.should('contain', 'Kotak Masuk')
            .and('be.visible')

        const subTitleReviewNaskah = cy.get(review_naskah.subTitleReviewNaskah).as('subTitleReviewNaskah')
        subTitleReviewNaskah.should('contain', 'TTE dan Review')
            .and('be.visible')
    }

    checkPreviousPage() {
        const btnPreviousPage = cy.get(review_naskah.btnPreviousPage).as('btnPreviousPage')
        btnPreviousPage.scrollIntoView()
            .should('be.disabled')
    }

    searchDokumen(inputText) {
        // Wait until page load
        cy.wait(3000)

        // Search dokumen
        const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
        searchReviewNaskah.find('input')
            .clear()
            .wait(2000)
            .type(inputText)
            .invoke('val')
            .then((val) => {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                cy.wait('@checkResponse', { timeout: 5000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            if (interception.response.body.data === null) {
                                const tableEmptyState = cy.get(review_naskah.tableEmptyState).as('tableEmptyState')
                                tableEmptyState.find('p').should('contain', 'Hasil pencarian tidak ditemukan')
                            } else {
                                if (interception.response.body.data.documents.pageInfo.totalCount === 0) {
                                    const tableEmptyState = cy.get(review_naskah.tableEmptyState).as('tableEmptyState')
                                    tableEmptyState.find('p').should('contain', 'Hasil pencarian tidak ditemukan')
                                } else {
                                    const tableReviewNaskah = cy.get(review_naskah.tableReviewNaskah).as('tableReviewNaskah')
                                    tableReviewNaskah.contains('td', val)
                                }
                            }
                        }
                    })
            })
    }

    checkWarnaLabelUrgensi() {
        const tagUrgensi = cy.get(review_naskah.tagUrgensi).as('tagUrgensi')
        tagUrgensi.find('svg').children()
            .invoke('attr', 'fill')
            .then(($fill) => {
                const fill = $fill
                cy.log(fill)
                if (fill === "#F44336") {
                    const labelUrgensi = cy.get(review_naskah.tagUrgensi).as('labelUrgensi')
                    labelUrgensi.find('p').should('contain.text', 'Amat Segera')
                } else if (fill == "#FFD026") {
                    const labelUrgensi = cy.get(review_naskah.tagUrgensi).as('labelUrgensi')
                    labelUrgensi.find('p').should('contain.text', 'Segera')
                } else if (fill === "#16A75C") {
                    const labelUrgensi = cy.get(review_naskah.tagUrgensi).as('labelUrgensi')
                    labelUrgensi.find('p').should('contain.text', 'Biasa')
                } else {
                    const labelUrgensi = cy.get(review_naskah.tagUrgensi).as('labelUrgensi')
                    labelUrgensi.find('p').should('contain.text', 'Penting')
                }
            })
    }

    checkWarnaLabelStatus() {
        const tagStatus = cy.get(review_naskah.tagStatus).as('tagStatus')
        tagStatus.invoke('text')
            .then((text) => {
                if (text.trim() === 'DIKEMBALIKAN') {
                    const tagStatusLabel = cy.get(review_naskah.tagStatus).as('tagStatusLabel')
                    tagStatusLabel.should('have.class', 'inline-block px-2 py-1 text-white font-manrope font-semibold text-xs rounded-lg bg-[#42A5F5]')
                } else if (text.trim() === 'BELUM DIREVIEW') {
                    const tagStatusLabel = cy.get(review_naskah.tagStatus).as('tagStatusLabel')
                    tagStatusLabel.should('have.class', 'inline-block px-2 py-1 text-white font-manrope font-semibold text-xs rounded-lg bg-[#EF5350]')
                } else if (text.trim() === 'BELUM DITANDATANGANI') {
                    const tagStatusLabel = cy.get(review_naskah.tagStatus).as('tagStatusLabel')
                    tagStatusLabel.should('have.class', 'inline-block px-2 py-1 text-white font-manrope font-semibold text-xs rounded-lg bg-[#EF5350]')
                } else if (text.trim() === 'TANDATANGAN DIPROSES') {
                    const tagStatusLabel = cy.get(review_naskah.tagStatus).as('tagStatusLabel')
                    tagStatusLabel.should('have.class', 'inline-block px-2 py-1 text-white font-manrope font-semibold text-xs rounded-lg bg-[#EF5350]')
                } else if (text.trim() === 'TANDATANGANI ULANG') {
                    const tagStatusLabel = cy.get(review_naskah.tagStatus).as('tagStatusLabel')
                    tagStatusLabel.should('have.class', 'inline-block px-2 py-1 text-white font-manrope font-semibold text-xs rounded-lg bg-[#EF5350]')
                }
            })
    }

    filterSifat(inputanSifat) {
        const filterReviewNaskah = cy.get(review_naskah.buttonFilterReviewNaskah).as('filterReviewNaskah')
        filterReviewNaskah.should('contain', 'Atur Filter')
            .click()
            .then(() => {
                const filterDialog = cy.get(review_naskah.filterDialog).as('filterDialog')
                filterDialog.should('be.visible')

                const filterSifat = cy.get(review_naskah.filterSifat).as('filterSifat')
                filterSifat.should('be.visible')
                    .click()
                    .then(() => {
                        if (inputanSifat === 'Biasa') {
                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterSifatBiasa = cy.get(review_naskah.filterSifatBiasa).as('filterStatusBiasa')
                            filterSifatBiasa.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterSifatBiasaLabel = cy.get(review_naskah.filterSifatBiasaLabel).as('filterSifatBiasaLabel')
                                                filterSifatBiasaLabel.should('be.visible')
                                                    .should('contain', inputanSifat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('span')
                                                    .should('contain', inputanSifat)
                                            }
                                        })
                                })
                        } else if (inputanSifat === 'Konfidensial') {
                            filterSifat.click()

                            const filterSifatBiasa = cy.get(review_naskah.filterSifatBiasa).as('filterSifatBiasa')
                            filterSifatBiasa.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterSifatKonfidensial = cy.get(review_naskah.filterSifatKonfidensial).as('filterSifatKonfidensial')
                            filterSifatKonfidensial.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterSifatKonfidensialLabel = cy.get(review_naskah.filterSifatKonfidensialLabel).as('filterSifatKonfidensialLabel')
                                                filterSifatKonfidensialLabel.should('be.visible')
                                                    .should('contain', inputanSifat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('span')
                                                    .should('contain', inputanSifat)
                                            }
                                        })
                                })
                        } else if (inputanSifat === 'Penting') {
                            filterSifat.click()

                            const filterSifatBiasa = cy.get(review_naskah.filterSifatBiasa).as('filterSifatBiasa')
                            filterSifatBiasa.uncheck()

                            const filterSifatKonfidensial = cy.get(review_naskah.filterSifatKonfidensial).as('filterSifatKonfidensial')
                            filterSifatKonfidensial.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterSifatPenting = cy.get(review_naskah.filterSifatPenting).as('filterSifatPenting')
                            filterSifatPenting.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterSifatPentingLabel = cy.get(review_naskah.filterSifatPentingLabel).as('filterSifatPentingLabel')
                                                filterSifatPentingLabel.should('be.visible')
                                                    .should('contain', inputanSifat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('span')
                                                    .should('contain', inputanSifat)
                                            }
                                        })
                                })
                        } else if (inputanSifat === 'Rahasia') {
                            filterSifat.click()

                            const filterSifatBiasa = cy.get(review_naskah.filterSifatBiasa).as('filterSifatBiasa')
                            filterSifatBiasa.uncheck()

                            const filterSifatKonfidensial = cy.get(review_naskah.filterSifatKonfidensial).as('filterSifatKonfidensial')
                            filterSifatKonfidensial.uncheck()

                            const filterSifatPenting = cy.get(review_naskah.filterSifatPenting).as('filterSifatPenting')
                            filterSifatPenting.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterSifatRahasia = cy.get(review_naskah.filterSifatRahasia).as('filterSifatRahasia')
                            filterSifatRahasia.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterSifatRahasiaLabel = cy.get(review_naskah.filterSifatRahasiaLabel).as('filterSifatRahasiaLabel')
                                                filterSifatRahasiaLabel.should('be.visible')
                                                    .should('contain', inputanSifat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('span')
                                                    .should('contain', inputanSifat)
                                            }
                                        })
                                })
                        } else {
                            filterSifat.click()

                            const filterSifatBiasa = cy.get(review_naskah.filterSifatBiasa).as('filterSifatBiasa')
                            filterSifatBiasa.uncheck()

                            const filterSifatKonfidensial = cy.get(review_naskah.filterSifatKonfidensial).as('filterSifatKonfidensial')
                            filterSifatKonfidensial.uncheck()

                            const filterSifatPenting = cy.get(review_naskah.filterSifatPenting).as('filterSifatPenting')
                            filterSifatPenting.uncheck()

                            const filterSifatRahasia = cy.get(review_naskah.filterSifatRahasia).as('filterSifatRahasia')
                            filterSifatRahasia.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterSifatSangatRahasia = cy.get(review_naskah.filterSifatSangatRahasia).as('filterSifatSangatRahasia')
                            filterSifatSangatRahasia.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterSifatSangatRahasiaLabel = cy.get(review_naskah.filterSifatSangatRahasiaLabel).as('filterSifatSangatRahasiaLabel')
                                                filterSifatSangatRahasiaLabel.should('be.visible')
                                                    .should('contain', inputanSifat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('span')
                                                    .should('contain', inputanSifat)
                                            }
                                        })
                                })
                        }
                    })
            })

        // Close Filter
        const closeFilter = cy.get(review_naskah.closeFilter).as('closeFilter')
        closeFilter.should('be.visible')
            .click()

        cy.wait(2000)
    }

    clearFilterSifat() {
        const filterSifat = cy.get(review_naskah.filterSifat).as('filterSifat')
        filterSifat.should('be.visible')
            .then(() => {
                const filterSifatSangatRahasia = cy.get(review_naskah.filterSifatSangatRahasia).as('filterSifatSangatRahasia')
                filterSifatSangatRahasia.invoke('is', ':checked')
                    .then(checked => {
                        if (checked) {
                            const filterSifatSangatRahasiaVal = cy.get(review_naskah.filterSifatSangatRahasia).as('filterSifatSangatRahasiaVal')
                            filterSifatSangatRahasiaVal.uncheck()

                            const filterSifat2 = cy.get(review_naskah.filterSifat).as('filterSifat2')
                            filterSifat2.click()
                        }
                    })
            })
    }

    filterUrgensi(inputanUrgensi) {
        const filterReviewNaskah = cy.get(review_naskah.buttonFilterReviewNaskah).as('filterReviewNaskah')
        filterReviewNaskah.should('contain', 'Atur Filter')
            .click()
            .then(() => {
                const filterDialog = cy.get(review_naskah.filterDialog).as('filterDialog')
                filterDialog.should('be.visible')

                this.clearFilterSifat()

                const filterUrgensi = cy.get(review_naskah.filterUrgensi).as('filterUrgensi')
                filterUrgensi.should('be.visible')
                    .click()
                    .then(() => {
                        if (inputanUrgensi === 'Biasa') {
                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterUrgensiBiasa = cy.get(review_naskah.filterUrgensiBiasa).as('filterUrgensiBiasa')
                            filterUrgensiBiasa.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterUrgensiBiasaLabel = cy.get(review_naskah.filterUrgensiBiasaLabel).as('filterUrgensiBiasaLabel')
                                                filterUrgensiBiasaLabel.should('be.visible')
                                                    .should('contain', inputanUrgensi)

                                                const tagUrgensi = cy.get(review_naskah.tagUrgensi).as('tagUrgensi')
                                                tagUrgensi.find('p')
                                                    .should('contain', inputanUrgensi)
                                            }
                                        })
                                })
                        } else if (inputanUrgensi === 'Penting') {
                            filterUrgensi.click()

                            const filterUrgensiBiasa = cy.get(review_naskah.filterUrgensiBiasa).as('filterUrgensiBiasa')
                            filterUrgensiBiasa.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterUrgensiPenting = cy.get(review_naskah.filterUrgensiPenting).as('filterUrgensiPenting')
                            filterUrgensiPenting.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterUrgensiPentingLabel = cy.get(review_naskah.filterUrgensiPentingLabel).as('filterUrgensiPentingLabel')
                                                filterUrgensiPentingLabel.should('be.visible')
                                                    .should('contain', inputanUrgensi)

                                                const tagUrgensi = cy.get(review_naskah.tagUrgensi).as('tagUrgensi')
                                                tagUrgensi.find('p')
                                                    .should('contain', inputanUrgensi)
                                            }
                                        })
                                })
                        } else if (inputanUrgensi === 'Segera') {
                            filterUrgensi.click()

                            const filterUrgensiBiasa = cy.get(review_naskah.filterUrgensiBiasa).as('filterUrgensiBiasa')
                            filterUrgensiBiasa.uncheck()

                            const filterUrgensiPenting = cy.get(review_naskah.filterUrgensiPenting).as('filterUrgensiPenting')
                            filterUrgensiPenting.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterUrgensiSegera = cy.get(review_naskah.filterUrgensiSegera).as('filterUrgensiSegera')
                            filterUrgensiSegera.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterUrgensiSegeraLabel = cy.get(review_naskah.filterUrgensiSegeraLabel).as('filterUrgensiSegeraLabel')
                                                filterUrgensiSegeraLabel.should('be.visible')
                                                    .should('contain', inputanUrgensi)

                                                const tagUrgensi = cy.get(review_naskah.tagUrgensi).as('tagUrgensi')
                                                tagUrgensi.find('p')
                                                    .should('contain', inputanUrgensi)
                                            }
                                        })
                                })
                        } else {
                            filterUrgensi.click()

                            const filterUrgensiBiasa = cy.get(review_naskah.filterUrgensiBiasa).as('filterUrgensiBiasa')
                            filterUrgensiBiasa.uncheck()

                            const filterUrgensiPenting = cy.get(review_naskah.filterUrgensiPenting).as('filterUrgensiPenting')
                            filterUrgensiPenting.uncheck()

                            const filterUrgensiSegera = cy.get(review_naskah.filterUrgensiSegera).as('filterUrgensiSegera')
                            filterUrgensiSegera.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterUrgensiAmatSegera = cy.get(review_naskah.filterUrgensiAmatSegera).as('filterUrgensiAmatSegera')
                            filterUrgensiAmatSegera.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterUrgensiAmatSegeraLabel = cy.get(review_naskah.filterUrgensiAmatSegeraLabel).as('filterUrgensiAmatSegeraLabel')
                                                filterUrgensiAmatSegeraLabel.should('be.visible')
                                                    .should('contain', inputanUrgensi)

                                                const tagUrgensi = cy.get(review_naskah.tagUrgensi).as('tagUrgensi')
                                                tagUrgensi.find('p')
                                                    .should('contain', inputanUrgensi)
                                            }
                                        })
                                })
                        }
                    })
            })

        // Close Filter
        const closeFilter = cy.get(review_naskah.closeFilter).as('closeFilter')
        closeFilter.should('be.visible')
            .click()

        cy.wait(2000)
    }

    clearFilterUrgensi() {
        const filterUrgensi = cy.get(review_naskah.filterUrgensi).as('filterUrgensi')
        filterUrgensi.should('be.visible')
            .then(() => {
                const filterUrgensiAmatSegera = cy.get(review_naskah.filterUrgensiAmatSegera).as('filterUrgensiAmatSegera')
                filterUrgensiAmatSegera.invoke('is', ':checked')
                    .then(checked => {
                        if (checked) {
                            const filterUrgensiAmatSegeraVal = cy.get(review_naskah.filterUrgensiAmatSegera).as('filterUrgensiAmatSegeraVal')
                            filterUrgensiAmatSegeraVal.uncheck()

                            const filterUrgensi2 = cy.get(review_naskah.filterUrgensi).as('filterUrgensi2')
                            filterUrgensi2.click()
                        }
                    })
            })
    }

    filterStatus(inputanStatus) {
        const filterReviewNaskah = cy.get(review_naskah.buttonFilterReviewNaskah).as('filterReviewNaskah')
        filterReviewNaskah.should('contain', 'Atur Filter')
            .click()
            .then(() => {
                const filterDialog = cy.get(review_naskah.filterDialog).as('filterDialog')
                filterDialog.should('be.visible')

                this.clearFilterUrgensi()

                const filterStatus = cy.get(review_naskah.filterStatus).as('filterStatus')
                filterStatus.should('be.visible')
                    .click()
                    .then(() => {
                        if (inputanStatus === 'Belum Direview') {
                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterStatusBelumDireview = cy.get(review_naskah.filterStatusBelumDireview).as('filterStatusBelumDireview')
                            filterStatusBelumDireview.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterStatusBelumDireviewLabel = cy.get(review_naskah.filterStatusBelumDireviewLabel).as('filterStatusBelumDireviewLabel')
                                                filterStatusBelumDireviewLabel.should('be.visible')
                                                    .should('contain', inputanStatus)

                                                const tagStatus = cy.get(review_naskah.tagStatus).as('tagStatus')
                                                tagStatus.contains(inputanStatus, { matchCase: false })
                                            }
                                        })
                                })
                        } else if (inputanStatus === 'Belum Ditandatangani') {
                            filterStatus.click()

                            const filterStatusBelumDireview = cy.get(review_naskah.filterStatusBelumDireview).as('filterStatusBelumDireview')
                            filterStatusBelumDireview.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterStatusBelumDitandatangani = cy.get(review_naskah.filterStatusBelumDitandatangani).as('filterStatusBelumDitandatangani')
                            filterStatusBelumDitandatangani.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterStatusBelumDitandatanganiLabel = cy.get(review_naskah.filterStatusBelumDitandatanganiLabel).as('filterStatusBelumDitandatanganiLabel')
                                                filterStatusBelumDitandatanganiLabel.should('be.visible')
                                                    .should('contain', inputanStatus)

                                                const tagStatus = cy.get(review_naskah.tagStatus).as('tagStatus')
                                                tagStatus.contains(inputanStatus, { matchCase: false })
                                            }
                                        })
                                })
                        } else if (inputanStatus === 'Disetujui') {
                            filterStatus.click()

                            const filterStatusBelumDireview = cy.get(review_naskah.filterStatusBelumDireview).as('filterStatusBelumDireview')
                            filterStatusBelumDireview.uncheck()

                            const filterStatusBelumDitandatangani = cy.get(review_naskah.filterStatusBelumDitandatangani).as('filterStatusBelumDitandatangani')
                            filterStatusBelumDitandatangani.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterStatusDisetujui = cy.get(review_naskah.filterStatusDisetujui).as('filterStatusDisetujui')
                            filterStatusDisetujui.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterStatusDisetujuiLabel = cy.get(review_naskah.filterStatusDisetujuiLabel).as('filterStatusDisetujuiLabel')
                                                filterStatusDisetujuiLabel.should('be.visible')
                                                    .should('contain', inputanStatus)

                                                const tagStatus = cy.get(review_naskah.tagStatus).as('tagStatus')
                                                tagStatus.contains(inputanStatus, { matchCase: false })
                                            }
                                        })
                                })

                            const filterStatusDisetujui2 = cy.get(review_naskah.filterStatusDisetujui).as('filterStatusDisetujui')
                            filterStatusDisetujui2.uncheck()
                        } else {
                            filterStatus.click()

                            const filterStatusBelumDireview = cy.get(review_naskah.filterStatusBelumDireview).as('filterStatusBelumDireview')
                            filterStatusBelumDireview.uncheck()

                            const filterStatusBelumDitandatangani = cy.get(review_naskah.filterStatusBelumDitandatangani).as('filterStatusBelumDitandatangani')
                            filterStatusBelumDitandatangani.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterStatusDikembalikan = cy.get(review_naskah.filterStatusDikembalikan).as('filterStatusDikembalikan')
                            filterStatusDikembalikan.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterStatusDikembalikanLabel = cy.get(review_naskah.filterStatusDikembalikanLabel).as('filterStatusDikembalikanLabel')
                                                filterStatusDikembalikanLabel.should('be.visible')
                                                    .should('contain', inputanStatus)

                                                const tagStatus = cy.get(review_naskah.tagStatus).as('tagStatus')
                                                tagStatus.contains(inputanStatus, { matchCase: false })
                                            }
                                        })
                                })
                        }
                    })
            })

        // Close Filter
        const closeFilter = cy.get(review_naskah.closeFilter).as('closeFilter')
        closeFilter.should('be.visible')
            .click()

        cy.wait(2000)
    }

    clearFilterStatus() {
        const filterStatus = cy.get(review_naskah.filterStatus).as('filterStatus')
        filterStatus.should('be.visible')
            .then(() => {
                const filterStatusDikembalikan = cy.get(review_naskah.filterStatusDikembalikan).as('filterStatusDikembalikan')
                filterStatusDikembalikan.invoke('is', ':checked')
                    .then(checked => {
                        if (checked) {
                            const filterStatusDikembalikanVal = cy.get(review_naskah.filterStatusDikembalikan).as('filterStatusDikembalikanVal')
                            filterStatusDikembalikanVal.uncheck()

                            const filterStatus2 = cy.get(review_naskah.filterStatus).as('filterStatus2')
                            filterStatus2.click()
                        }
                    })
            })
    }

    filterJenisNaskah(inputanJenisSurat) {
        const filterReviewNaskah = cy.get(review_naskah.buttonFilterReviewNaskah).as('filterReviewNaskah')
        filterReviewNaskah.should('contain', 'Atur Filter')
            .click()
            .then(() => {
                const filterDialog = cy.get(review_naskah.filterDialog).as('filterDialog')
                filterDialog.should('be.visible')

                this.clearFilterStatus()

                const filterJenisSurat = cy.get(review_naskah.filterJenisSurat).as('filterJenisSurat')
                filterJenisSurat.should('be.visible')
                    .click()
                    .then(() => {
                        if (inputanJenisSurat === 'Nota Dinas') {
                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterJenisSuratNotaDinas = cy.get(review_naskah.filterJenisSuratNotaDinas).as('filterJenisSuratNotaDinas')
                            filterJenisSuratNotaDinas.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterJenisSuratNotaDinasLabel = cy.get(review_naskah.filterJenisSuratNotaDinasLabel).as('filterJenisSuratNotaDinasLabel')
                                                filterJenisSuratNotaDinasLabel.should('be.visible')
                                                    .should('contain', inputanJenisSurat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('strong')
                                                    .should('contain', inputanJenisSurat)
                                            }
                                        })
                                })
                        } else if (inputanJenisSurat === 'Surat Biasa') {
                            filterJenisSurat.click()

                            const filterJenisSuratNotaDinas = cy.get(review_naskah.filterJenisSuratNotaDinas).as('filterJenisSuratNotaDinas')
                            filterJenisSuratNotaDinas.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterJenisSuratSuratBiasa = cy.get(review_naskah.filterJenisSuratSuratBiasa).as('filterJenisSuratSuratBiasa')
                            filterJenisSuratSuratBiasa.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterJenisSuratSuratBiasaLabel = cy.get(review_naskah.filterJenisSuratSuratBiasaLabel).as('filterJenisSuratSuratBiasaLabel')
                                                filterJenisSuratSuratBiasaLabel.should('be.visible')
                                                    .should('contain', inputanJenisSurat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('strong')
                                                    .should('contain', inputanJenisSurat)
                                            }
                                        })
                                })
                        } else {
                            filterJenisSurat.click()

                            const filterJenisSuratNotaDinas = cy.get(review_naskah.filterJenisSuratNotaDinas).as('filterJenisSuratNotaDinas')
                            filterJenisSuratNotaDinas.uncheck()

                            const filterJenisSuratSuratBiasa = cy.get(review_naskah.filterJenisSuratSuratBiasa).as('filterJenisSuratSuratBiasa')
                            filterJenisSuratSuratBiasa.uncheck()

                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                            const filterJenisSuratSuratPerintah = cy.get(review_naskah.filterJenisSuratSuratPerintah).as('filterJenisSuratSuratPerintah')
                            filterJenisSuratSuratPerintah.check()
                                .then(() => {
                                    cy.wait('@checkResponse', { timeout: 10000 })
                                        .then((interception) => {
                                            if (interception.response.statusCode === 200) {
                                                const filterJenisSuratSuratPerintahLabel = cy.get(review_naskah.filterJenisSuratSuratPerintahLabel).as('filterJenisSuratSuratPerintahLabel')
                                                filterJenisSuratSuratPerintahLabel.should('be.visible')
                                                    .should('contain', inputanJenisSurat)

                                                const tagJenisSurat = cy.get(review_naskah.tagJenisSurat).as('tagJenisSurat')
                                                tagJenisSurat.find('strong')
                                                    .should('contain', inputanJenisSurat)
                                            }
                                        })
                                })
                        }
                    })
            })

        // Close Filter
        const closeFilter = cy.get(review_naskah.closeFilter).as('closeFilter')
        closeFilter.should('be.visible')
            .click()

        cy.wait(2000)
    }
}