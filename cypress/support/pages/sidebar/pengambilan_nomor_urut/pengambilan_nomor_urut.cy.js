import pengambilan_nomor_urut from "../../../selectors/sidebar/pengambilan_nomor_urut/pengambilan_nomor_urut"

export class PengambilanNomorUrutPage {

    checkForm() {
        const pageTitle = cy.get(pengambilan_nomor_urut.pageTitle).as('pageTitle')
        pageTitle.should('contain', 'Pengambilan Nomor Urut Naskah')
            .and('be.visible')

        const filterSubTitle = cy.get(pengambilan_nomor_urut.filterSubTitle).as('filterSubTitle')
        filterSubTitle.should('contain', 'Dapatkan Nomor Urut Naskah Anda Disini')
            .and('be.visible')

        const filterJenisNaskahLabel = cy.get(pengambilan_nomor_urut.filterJenisNaskahLabel).as('filterJenisNaskahLabel')
        filterJenisNaskahLabel.should('contain', 'Kategori Jenis Naskah')
            .and('be.visible')

        const filterJenisNaskahComponent = cy.get(pengambilan_nomor_urut.filterJenisNaskahComponent).as('filterJenisNaskahComponent')
        filterJenisNaskahComponent.find('input')
            .should('have.attr', 'placeholder', 'Semua Naskah')
            .and('be.visible')

        const filterPemilikNomorLabel = cy.get(pengambilan_nomor_urut.filterPemilikNomorLabel).as('filterPemilikNomorLabel')
        filterPemilikNomorLabel.should('contain', 'UK/UP')
            .and('be.visible')

        const filterPemilikNomorComponent = cy.get(pengambilan_nomor_urut.filterPemilikNomorComponent).as('filterPemilikNomorComponent')
        filterPemilikNomorComponent.find('input')
            .should('have.attr', 'placeholder', 'Pilih asal bank nomor')
            .and('be.visible')

        const filterTanggalLabel = cy.get(pengambilan_nomor_urut.filterTanggalLabel).as('filterTanggalLabel')
        filterTanggalLabel.should('contain', 'Tanggal Penomoran')
            .and('be.visible')

        const filterBtnAmbilNomor = cy.get(pengambilan_nomor_urut.filterBtnAmbilNomor).as('filterBtnAmbilNomor')
        filterBtnAmbilNomor.should('contain', 'Ambil Nomor')
            .and('be.disabled')
    }

    checkBtnAmbilNomorBeforeJenisNaskah() {
        const filterJenisNaskahLabel = cy.get(pengambilan_nomor_urut.filterJenisNaskahLabel).as('filterJenisNaskahLabel')
        filterJenisNaskahLabel.should('contain', 'Kategori Jenis Naskah')
            .and('be.visible')

        const filterJenisNaskahComponent = cy.get(pengambilan_nomor_urut.filterJenisNaskahComponent).as('filterJenisNaskahComponent')
        filterJenisNaskahComponent.find('input')
            .should('have.attr', 'placeholder', 'Semua Naskah')
            .and('be.visible')

        const filterBtnAmbilNomor = cy.get(pengambilan_nomor_urut.filterBtnAmbilNomor).as('filterBtnAmbilNomor')
        filterBtnAmbilNomor.should('contain', 'Ambil Nomor')
            .and('be.disabled')
    }

    checkBtnAmbilNomorBeforeUKUP() {
        const filterPemilikNomorLabel = cy.get(pengambilan_nomor_urut.filterPemilikNomorLabel).as('filterPemilikNomorLabel')
        filterPemilikNomorLabel.should('contain', 'UK/UP')
            .and('be.visible')

        const filterPemilikNomorComponent = cy.get(pengambilan_nomor_urut.filterPemilikNomorComponent).as('filterPemilikNomorComponent')
        filterPemilikNomorComponent.find('input')
            .should('have.attr', 'placeholder', 'Pilih asal bank nomor')
            .and('be.visible')

        const filterBtnAmbilNomor = cy.get(pengambilan_nomor_urut.filterBtnAmbilNomor).as('filterBtnAmbilNomor')
        filterBtnAmbilNomor.should('contain', 'Ambil Nomor')
            .and('be.disabled')
    }

    checkFilterUKUPBeforeJenisNaskah() {
        const filterJenisNaskahLabel = cy.get(pengambilan_nomor_urut.filterJenisNaskahLabel).as('filterJenisNaskahLabel')
        filterJenisNaskahLabel.should('contain', 'Kategori Jenis Naskah')
            .and('be.visible')

        const filterJenisNaskahComponent = cy.get(pengambilan_nomor_urut.filterJenisNaskahComponent).as('filterJenisNaskahComponent')
        filterJenisNaskahComponent.find('input')
            .should('have.attr', 'placeholder', 'Semua Naskah')
            .and('be.visible')

        const filterPemilikNomorComponent = cy.get(pengambilan_nomor_urut.filterPemilikNomorComponent).as('filterPemilikNomorComponent')
        filterPemilikNomorComponent.find('input')
            .should('have.attr', 'placeholder', 'Pilih asal bank nomor')
            .and('be.disabled')
    }

    checkFilterJenisNaskahUserBiasa() {
        const filterJenisNaskahLabel = cy.get(pengambilan_nomor_urut.filterJenisNaskahLabel).as('filterJenisNaskahLabel')
        filterJenisNaskahLabel.should('contain', 'Kategori Jenis Naskah')
            .and('be.visible')

        const filterJenisNaskahComponent = cy.get(pengambilan_nomor_urut.filterJenisNaskahComponent).as('filterJenisNaskahComponent')
        filterJenisNaskahComponent.click()
            .find('li')
            .should('have.text', '\n        Surat Dinas\n      \n        Nota Dinas\n      \n          Loading more options...\n        ')
    }

    inputJenisNaskah(jenis_naskah) {
        const filterJenisNaskahComponent = cy.get(pengambilan_nomor_urut.filterJenisNaskahComponent).as('filterJenisNaskahComponent')
        filterJenisNaskahComponent.click()
            .find('li')
            .contains(jenis_naskah)
            .click()
    }

    inputUKUP(uk_up) {
        const filterPemilikNomorComponent = cy.get(pengambilan_nomor_urut.filterPemilikNomorComponent).as('filterPemilikNomorComponent')
        filterPemilikNomorComponent.click()
            .find('li')
            .contains(uk_up)
            .click()
    }

    checkBtnAmbilNomor() {
        const filterBtnAmbilNomor = cy.get(pengambilan_nomor_urut.filterBtnAmbilNomor).as('filterBtnAmbilNomor')
        filterBtnAmbilNomor.should('contain', 'Ambil Nomor')
            .and('be.enabled')
    }

}