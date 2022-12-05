export class MenuPage {
    
    clickBtnHideMenu(){
        cy.get("img[class='w-[18px] h-[19.5px] cursor-pointer']").click()
    }

    checkProfile(){
        cy.get("p[class='text-[13px] font-[700] text-[#212121]']").should('contain','Dr. Hening Widiatmoko, M.A.')
    }

    clickBtnShowMenu(){
        cy.get("img[class='w-[18px] h-[19.5px] cursor-pointer']").click()
        cy.get("p[class='text text-[13px] font-[600] font-manrope text-[#212121]']").should('contain','Dashboard')
    }

    checkProfileName(){
        cy.get("p[class='text-[13px] font-[700] text-[#212121]']").should('contain','Dr. Hening Widiatmoko, M.A.')
    }

    goToDashboard(){
        cy.xpath("//a[@href='/dashboard']//div[@class='flex box-icons p-3']").click()
        cy.xpath("//div[contains(text(),'dashboard')]").should('contain','dashboard')
    }

    goToKonsepNaskah(){
        cy.xpath("//a[@href='/konsep-naskah']//div[@class='flex box-icons p-3']").click()
        cy.get("div[class='font-manrope text-xl font-extrabold leading-[33px]']").should('contain','Buat Naskah Baru')
    }

    goToTindakLanjut(){
        cy.xpath("//div[@class='flex justify-between box-icons p-3 cursor-pointer']").click()
        cy.xpath("//a[@href='/kotak-masuk/tindak-lanjut']//div[@class='flex box-icons p-3']").click()
        cy.xpath("//div[normalize-space()='tindak-lanjut']").should('contain','tindak-lanjut')
    }

    goToBelumDireview(){
        cy.xpath("//a[@href='/kotak-masuk/review-naskah']//div[@class='flex box-icons p-3']").click()
    }

    goToKotakKeluar(){
        cy.xpath("//a[@href='/kotak-keluar']//div[@class='flex box-icons p-3']").click()
        cy.xpath("//div[contains(text(),'Kotak Keluar')]").should('contain','Kotak Keluar')
    }

    goToTandaTangan(){
        cy.xpath("//a[@href='/tanda-tangan']//div[@class='flex box-icons p-3']").click()
        cy.get("div[class='text-[#757575]']").should('contain','Tanda Tangan')
    }
}