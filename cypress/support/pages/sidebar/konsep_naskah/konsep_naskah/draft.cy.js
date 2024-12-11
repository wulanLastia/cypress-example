import draft from "@selectors/sidebar/konsep_naskah/draft"
import { MenuPage } from "../../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftPage {

    checkBtnShowAllDraft() {
        const draftNaskahTitle = cy.get(draft.draftNaskahTitle).as('draftNaskahTitle')
        draftNaskahTitle.should('contain', 'NASKAH DISIMPAN')
            .and('be.visible')

        const draftNaskahViewAll = cy.get(draft.draftNaskahViewAll).as('draftNaskahViewAll')
        draftNaskahViewAll.should('contain', 'LIHAT SEMUA')
            .and('be.visible')
            .click()
            .then((obj) => {
                const popupListDraft = cy.get(draft.popupListDraft).as('popupListDraft')
                popupListDraft.should('be.visible')

                const listDraftTitle = cy.get(draft.listDraftTitle).as('listDraftTitle')
                listDraftTitle.should('contain', 'Naskah Disimpan')
                    .and('be.visible')

                const listDraftSubTitle = cy.get(draft.listDraftSubTitle).as('listDraftSubTitle')
                listDraftSubTitle.contains('naskah yang belum diselesaikan dan diteruskan ke pemeriksa')
                    .and('be.visible')

                const listDraftListData = cy.get(draft.listDraftListData).as('listDraftListData')
                listDraftListData.should('be.visible')
            })
    }

    checkBtnBack() {
        const listDraftBtnBack = cy.get(draft.listDraftBtnBack).as('listDraftBtnBack')
        listDraftBtnBack.should('contain', 'Kembali')
            .and('be.visible')
            .click()

        const draftNaskahTitle = cy.get(draft.draftNaskahTitle).as('draftNaskahTitle')
        draftNaskahTitle.should('contain', 'NASKAH DISIMPAN')
            .and('be.visible')
    }

    aturDraftNaskah() {
        const listDraftBtnAtur = cy.get(draft.listDraftBtnAtur).as('listDraftBtnAtur')
        listDraftBtnAtur.should('contain', 'Atur Naskah')
            .and('be.visible')
            .click()

        const btnRemoveDraft = cy.get(draft.btnRemoveDraft).as('btnRemoveDraft')
        btnRemoveDraft.should('be.visible')
    }

    cancelRemoveDraft() {
        const btnRemoveDraft = cy.get(draft.btnRemoveDraft).first().as('btnRemoveDraft')
        btnRemoveDraft.should('be.visible')
            .click()

        const popupRemoveDraft = cy.get(draft.popupRemoveDraft).as('popupRemoveDraft')
        popupRemoveDraft.should('be.visible')

        const popupRemoveDraftTitle = cy.get(draft.popupRemoveDraftTitle).as('popupRemoveDraftTitle')
        popupRemoveDraftTitle.should('contain', 'Hapus naskah ini?')
            .and('be.visible')

        const popupRemoveDraftSubtitle = cy.get(draft.popupRemoveDraftSubtitle).as('popupRemoveDraftSubtitle')
        popupRemoveDraftSubtitle.should('contain', 'Ingat, naskah ini tidak akan bisa dipulihkan kembali setelah dihapus. Lanjutkan untuk dihapus?')
            .and('be.visible')

        const btnRemoveCancel = cy.get(draft.btnRemoveCancel).as('btnRemoveCancel')
        btnRemoveCancel.should('be.visible')
            .click()
    }

    removeDraft() {
        const btnRemoveDraft = cy.get(draft.btnRemoveDraft).first().as('btnRemoveDraft')
        btnRemoveDraft.should('be.visible')
            .click()

        const popupRemoveDraft = cy.get(draft.popupRemoveDraft).as('popupRemoveDraft')
        popupRemoveDraft.should('be.visible')

        const popupRemoveDraftTitle = cy.get(draft.popupRemoveDraftTitle).as('popupRemoveDraftTitle')
        popupRemoveDraftTitle.should('contain', 'Hapus naskah ini?')
            .and('be.visible')

        const popupRemoveDraftSubtitle = cy.get(draft.popupRemoveDraftSubtitle).as('popupRemoveDraftSubtitle')
        popupRemoveDraftSubtitle.should('contain', 'Ingat, naskah ini tidak akan bisa dipulihkan kembali setelah dihapus. Lanjutkan untuk dihapus?')
            .and('be.visible')

        const btnRemoveConfirm = cy.get(draft.btnRemoveConfirm).as('btnRemoveConfirm')
        btnRemoveConfirm.should('be.visible')
            .click()

        cy.wait(3000)

        const listDraftBtnBack = cy.get(draft.listDraftBtnBack).as('listDraftBtnBack')
        listDraftBtnBack.click({ force: true })
    }

    checkDataPertamaNaskahDisimpan() {
        cy.wait(10000)

        const draftNaskahListData = cy.get(draft.draftNaskahListData).as('draftNaskahListData')
        draftNaskahListData.should('be.visible')
            .click({ force: true })
    }

}