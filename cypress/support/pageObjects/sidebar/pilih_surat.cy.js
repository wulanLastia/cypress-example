export class PilihSuratPage {
    
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

    goToKonsepNaskah(){
        cy.xpath("//a[@href='/konsep-naskah']//div[@class='flex box-icons p-3']").click()
        cy.get("div[class='font-manrope text-xl font-extrabold leading-[33px]']").should('contain','Buat Naskah Baru')
    }

    openSuratBiasa(){
        cy.xpath("//div[contains(text(),'Surat Biasa')]").click()
        cy.get("div[class='leading-[25px] font-extrabold text-lg font-manrope']").should('contain','Konsep Naskah')
        cy.get("select[class='w-full bg-transparent -mt-4 font-manrope text-semibold font-semibold leading-[19px]']").should('contain','Surat Biasa')
        cy.xpath("//a[@class='gap-2 cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--gray']").should('contain','Simpan')
        cy.xpath("//a[@class='gap-3 cursor-pointer hover:bg-blue-100 rounded-lg mb-2.5 base-button base-button--primary']").should('contain','Kirim Naskah')
    }

    kirimNaskahSuratBiasa(){
        cy.xpath("//a[@class='gap-3 cursor-pointer hover:bg-blue-100 rounded-lg mb-2.5 base-button base-button--primary']").click()
        cy.xpath("//strong[normalize-space()='Kirim Naskah ke Pemeriksa?']").should('contain','Kirim Naskah ke Pemeriksa?')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[4]/a[1]").should('contain','Ya, kirim naskah')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[4]/a[1]").click()
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[6]/div[1]/div[3]/a[1]").should('contain','Selesai')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[6]/div[1]/div[3]/a[1]").click()
        cy.get("div[class='font-manrope text-xl font-extrabold leading-[33px]']").should('contain','Buat Naskah Baru')
    }

    lanjutDrafting(){
        cy.xpath("//div[@class='flex pr-4 mt-2 gap-4']//*[name()='svg']").click()
        cy.xpath("//strong[normalize-space()='Batalkan Drafting Naskah?']").should('contain','Batalkan Drafting Naskah?')
        cy.xpath("//span[contains(text(),'Naskah akan terhapus dan tidak bisa diselamatkan j')]").should('contain','Naskah akan terhapus dan tidak bisa diselamatkan jika keluar dari halaman ini')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[3]/div[1]/div[2]/a[2]").should('contain','Lanjutkan Drafting Naskah')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[3]/div[1]/div[2]/a[2]").click()
        cy.get("div[class='leading-[25px] font-extrabold text-lg font-manrope']").should('contain','Konsep Naskah')
    }

    batalDrafting(){
        cy.xpath("//div[@class='flex pr-4 mt-2 gap-4']//*[name()='svg']").click()
        cy.xpath("//strong[normalize-space()='Batalkan Drafting Naskah?']").should('contain','Batalkan Drafting Naskah?')
        cy.xpath("//span[contains(text(),'Naskah akan terhapus dan tidak bisa diselamatkan j')]").should('contain','Naskah akan terhapus dan tidak bisa diselamatkan jika keluar dari halaman ini')
        cy.xpath("//div[@class='dialog-popup is-active']//div[@class='dialog-popup__content']//div//a[@class='gap-6 bg-red-600 rounded-lg mb-2.5 base-button']").should('contain','Keluar dan Buang Naskah')
        cy.xpath("//div[@class='dialog-popup is-active']//div[@class='dialog-popup__content']//div//a[@class='gap-6 bg-red-600 rounded-lg mb-2.5 base-button']").click()
        cy.get("div[class='font-manrope text-xl font-extrabold leading-[33px]']").should('contain','Buat Naskah Baru')
    }

}