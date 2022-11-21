/// <reference types="cypress"/>
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { MenuPage } from "../../support/pageObjects/sidebar/sidebar_menu.cy"

let menuPage = new MenuPage()

describe('Menu Skenario', () => {
    qase(2,
        it('Menyembunyikan menu', () => {
            menuPage.clickBtnSidebar()
        })
    )
})