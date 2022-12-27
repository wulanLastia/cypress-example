export class BelumDireviewPage {
    
    clickBtnMenuKotakMasukBelumDireview(){
        cy.xpath("//div[@class='flex justify-between box-icons p-3 cursor-pointer']").click()
        cy.xpath("//p[normalize-space()='Belum Di-review']").click()
        cy.xpath("//div[normalize-space()='STATUS TERKINI']").should('contain','STATUS TERKINI')
        cy.xpath("//div[normalize-space()='URGENSI']").should('contain','URGENSI')
        cy.xpath("//div[normalize-space()='UPDATE TERAKHIR']").should('contain','UPDATE TERAKHIR')
        cy.xpath("//div[normalize-space()='JENIS SURAT']").should('contain','JENIS SURAT')
        cy.xpath("//div[normalize-space()='TUJUAN']").should('contain','TUJUAN')
        cy.xpath("//div[normalize-space()='PERIHAL']").should('contain','PERIHAL')
    }

    clickBtnDetailKotakMasukBelumDireview(){
        cy.xpath("//div[@class='p-2']").click()
        cy.get("div[class='leading-[25px] font-extrabold text-lg font-manrope cursor-pointer']").should('contain','Review')
        cy.xpath("//div[@class='flex gap-4 margin-start']//a[@class='gap-2 font-manrope cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--outlined--black']//div//span[@class='base-button__label'][normalize-space()='Kembalikan']").should('contain','Kembalikan')
        cy.xpath("//span[normalize-space()='Koreksi']").should('contain','Koreksi')
        cy.xpath("//span[normalize-space()='Setujui & Minta Nomor']").should('contain','Setujui & Minta Nomor')
    }

    clickBack(){
        cy.xpath("//span[@class='mt-1.5 cursor-pointer']").click()
    }

    clickKembalikanNaskah(){
        cy.xpath("//div[@class='p-2']").click()
        cy.xpath("//div[@class='flex gap-4 margin-start']//a[@class='gap-2 font-manrope cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--outlined--black']//div//span[@class='base-button__label'][normalize-space()='Kembalikan']").should('contain','Kembalikan')
        cy.xpath("//div[@class='flex gap-4 margin-start']//a[@class='gap-2 font-manrope cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--outlined--black']//div//span[@class='base-button__label'][normalize-space()='Kembalikan']").click()
        cy.xpath("//input[@id='sifat-naskah']").check()
        cy.xpath("(//input[@placeholder='Keterangan Koreksi'])[1]").type('Perbaiki')
        cy.xpath("//input[@id='tembusan']").check()
        cy.xpath("(//input[@placeholder='Keterangan Koreksi'])[2]").type('Perbaiki')
        cy.xpath("//a[@class='gap-6 rounded-lg mb-2.5 mt-5 base-button base-button--primary']").click()
        cy.xpath("//strong[normalize-space()='Naskah telah tersimpan di Draft']").should('contain','Naskah telah tersimpan di Draft')
        cy.xpath("//span[contains(text(),'Buka dokumen ini pada menu Draft untuk melanjutkan')]").should('contain','Buka dokumen ini pada menu Draft untuk melanjutkan konsep naskah')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[4]/div[1]/div[3]/a[1]").click()
    }

    clickBatalKembalikanNaskah(){
        cy.xpath("//div[@class='flex gap-4 margin-start']//a[@class='gap-2 font-manrope cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--outlined--black']//div//span[@class='base-button__label'][normalize-space()='Kembalikan']").should('contain','Kembalikan')
        cy.xpath("//div[@class='flex gap-4 margin-start']//a[@class='gap-2 font-manrope cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--outlined--black']//div//span[@class='base-button__label'][normalize-space()='Kembalikan']").click()
        cy.xpath("//input[@id='perihal-naskah']").check()
        cy.xpath("(//input[@placeholder='Keterangan Koreksi'])[3]").type('Perbaiki')
        cy.xpath("//input[@id='tujuan-naskah']").check()
        cy.xpath("(//input[@placeholder='Keterangan Koreksi'])[4]").type('Perbaiki')
        cy.xpath("(//a[@class='gap-2 font-manrope cursor-pointer hover:bg-gray-100 rounded-lg base-button base-button--outlined--black'])[3]").click()
    }

    clickSetujuiMintaNomor(){
        cy.xpath("//span[normalize-space()='Setujui & Minta Nomor']").click()
        cy.xpath("//strong[normalize-space()='Setujui & Minta Nomor Surat?']").should('contain','Setujui & Minta Nomor Surat?')
        cy.xpath("//span[contains(text(),'Naskah Anda akan diteruskan ke bagian Unit Kearsip')]").should('contain','Naskah Anda akan diteruskan ke bagian Unit Kearsipan untuk dilakukan penomoran surat')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[4]/a[1]").click()
        cy.xpath("//strong[normalize-space()='Naskah terkirim ke Pemeriksa']").should('contain','Naskah terkirim ke Pemeriksa')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[6]/div[1]/div[3]/a[1]").click()
        cy.xpath("//div[normalize-space()='STATUS TERKINI']").should('contain','STATUS TERKINI')
        cy.xpath("//div[normalize-space()='URGENSI']").should('contain','URGENSI')
        cy.xpath("//div[normalize-space()='UPDATE TERAKHIR']").should('contain','UPDATE TERAKHIR')
        cy.xpath("//div[normalize-space()='JENIS SURAT']").should('contain','JENIS SURAT')
        cy.xpath("//div[normalize-space()='TUJUAN']").should('contain','TUJUAN')
        cy.xpath("//div[normalize-space()='PERIHAL']").should('contain','PERIHAL')
    }

    clickPeriksaKembali(){
        cy.xpath("//div[@class='p-2']").click()
        cy.xpath("//span[normalize-space()='Setujui & Minta Nomor']").click()
        cy.xpath("//strong[normalize-space()='Setujui & Minta Nomor Surat?']").should('contain','Setujui & Minta Nomor Surat?')
        cy.xpath("//span[contains(text(),'Naskah Anda akan diteruskan ke bagian Unit Kearsip')]").should('contain','Naskah Anda akan diteruskan ke bagian Unit Kearsipan untuk dilakukan penomoran surat')
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[4]/a[2]").click()
    }

}