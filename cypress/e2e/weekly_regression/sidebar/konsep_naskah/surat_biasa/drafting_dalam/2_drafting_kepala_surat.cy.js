import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "../../../../../../support/pages/auth/login.cy"
import { DraftingKepalaSuratPage } from "../../../../../../support/pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kepala_surat.cy"
import { DraftingKonsepNaskahPage } from "../../../../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_drafting_surat_biasa.cy"

let draftingKepalaSuratPage = new DraftingKepalaSuratPage()
let draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
let loginPage = new LoginPage()
let user
let data_temp

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })


})

before(() => {
    // Login
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()

    // Akses Surat Biasa
    draftingKepalaSuratPage.aksesKonsepNaskahSuratBiasa()
})

after(() => {
    qase(411,
        loginPage.logoutV2step2()
    )
})

describe('Kepala Naskah', { testIsolation: false }, () => {

    qase(83,
        it('Akses form editing kepala surat', () => {
            draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
        })
    )

    qase(87,
        it('Cek detail form editing kepala surat', () => {
            draftingKepalaSuratPage.checkDetail()
        })
    )

    qase(199,
        it('Batal mengisi kepala naskah', () => {
            draftingKepalaSuratPage.closeKepalaSurat()
        })
    )

})

describe('Tempat Penulisan Surat', { testIsolation: false }, () => {

    qase(303,
        it('Cek tempat penulisan surat default', () => {
            draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
            draftingKepalaSuratPage.validateTempat(data_temp.kepala_surat[7].tempat1)
        })
    )

    qase(312,
        it('Check on preview page after input tempat', () => {
            draftingKepalaSuratPage.validateTempat(data_temp.kepala_surat[7].tempat1)
        })
    )
})

describe('Tanggal Penulisan Surat', { testIsolation: false }, () => {

    qase(347,
        it('Cek isian tanggal surat default', () => {
            draftingKepalaSuratPage.validateTanggal('otomatis')
        })
    )

})

describe('Penempatan Daftar Tujuan Surat', { testIsolation: false }, () => {

    // Penempatan Daftar Tujuan Surat //
    qase(835,
        it('Cek default value yang terpilih', () => {
            draftingKepalaSuratPage.checkDefaultPenempatanDaftarTujuan()
        })
    )

    qase([836, 837],
        it('Memilih penempatan lampiran', () => {
            draftingKepalaSuratPage.checkPenempatanDaftarTujuanLampiran()
        })
    )

    // Tujuan Surat (Kepada Yth.) //
    qase(262,
        it('Add tujuan (Kepala Surat)', () => {
            draftingKonsepNaskahPage.scrollPreviewPage()
            draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
            draftingKepalaSuratPage.inputPenempatanDaftarTujuanKepala()
            draftingKepalaSuratPage.validateTujuan(data_temp.env[0].staging, data_temp.kepala_surat[0].tujuan1)
        })
    )

    // Lampiran //
    qase(849,
        it('Add tujuan (Lampiran Surat)', () => {
            draftingKonsepNaskahPage.scrollPreviewPage()
            draftingKepalaSuratPage.checkPenempatanDaftarTujuanLampiran()
            draftingKepalaSuratPage.deleteTujuan()
            draftingKepalaSuratPage.validateTujuanLampiran(data_temp.env[0].staging, data_temp.kepala_surat[0].tujuan1)
        })
    )
})

describe('Lokasi Penerima (di)', { testIsolation: false }, () => {

    qase(116,
        it('Check on preview page after input di', () => {
            draftingKonsepNaskahPage.scrollPreviewPage()
            draftingKepalaSuratPage.aksesFormEditingKepalaSurat()
            draftingKepalaSuratPage.validateLokasi(data_temp.kepala_surat[1].lokasi)
        })
    )
})

describe('Kode Klasifikasi', { testIsolation: false }, () => {

    qase(255,
        it('Batal memilih kode klasifikasi surat', () => {
            draftingKepalaSuratPage.validateKodeKlasifikasi(data_temp.kepala_surat[2].kode_klasifikasi)
            draftingKepalaSuratPage.deleteKodeKlasifikasi()
        })
    )

    qase(120,
        it('Cek preview setelah memilih kode klasifikasi', () => {
            draftingKepalaSuratPage.validateKodeKlasifikasi(data_temp.kepala_surat[2].kode_klasifikasi)
        })
    )
})

describe('Unit Pengolah', { testIsolation: false }, () => {

    qase(260,
        it('Batal memilih unit pengolah', () => {
            draftingKepalaSuratPage.validateUnitPengolah(data_temp.kepala_surat[3].unit_pengolah)
            draftingKepalaSuratPage.deleteUnitPengolah()
        })
    )

    qase(129,
        it('Check on preview page after input unit pengolah', () => {
            draftingKepalaSuratPage.validateUnitPengolah(data_temp.kepala_surat[3].unit_pengolah)
        })
    )
})

describe('Sifat Surat', { testIsolation: false }, () => {

    qase(253,
        it('Batal memilih sifat surat', () => {
            draftingKepalaSuratPage.validateSifatSurat(data_temp.kepala_surat[4].sifat_surat)
            draftingKepalaSuratPage.deleteSifatSurat()
        })
    )

    qase(132,
        it('Cek preview setelah memilih sifat', () => {
            draftingKepalaSuratPage.validateSifatSurat(data_temp.kepala_surat[4].sifat_surat)
        })
    )
})

describe('Urgensi Surat', { testIsolation: false }, () => {

    qase(254,
        it('Batal memilih urgensi surat', () => {
            draftingKepalaSuratPage.validateUrgensiSurat(data_temp.kepala_surat[5].urgensi_surat)
            draftingKepalaSuratPage.deleteUrgensiSurat()
        })
    )

    qase(133,
        it('Cek dropdown urgensi', () => {
            draftingKepalaSuratPage.validateUrgensiSurat(data_temp.kepala_surat[5].urgensi_surat)
        })
    )
})

describe('Perihal', { testIsolation: false }, () => {

    qase(144,
        it('Check on preview page after input perihal', () => {
            draftingKepalaSuratPage.validatePerihal(data_temp.kepala_surat[6].perihal1)
        })
    )
})

describe('Pemberkasan Otomatis', { testIsolation: false }, () => {

    // Judul Berkas (kata tangkap) //
    qase(1929,
        it('Cek detail kolom masukan judul berkas (kata tangkap)', () => {
            draftingKepalaSuratPage.checkDetailJudulBerkas()
        })
    )

    qase(1933,
        it('Input judul berkas baru secara manual', () => {
            draftingKepalaSuratPage.validateJudulBerkas()
        })
    )

    // Kurun Waktu //
    qase(1939,
        it('Cek detail kolom masukan kurun waktu', () => {
            draftingKepalaSuratPage.checkDetailKurunWaktu()
        })
    )

    qase(1946,
        it('Memilih awal kurun waktu', () => {
            draftingKepalaSuratPage.inputAwalKurunWaktu(data_temp.kepala_surat[8].awal_kurun_waktu)
        })
    )

    qase(1951,
        it('Memilih awal kurun waktu yang lebih besar dari akhir kurun waktu', () => {
            draftingKepalaSuratPage.inputNegatifAwalKurunWaktu(data_temp.kepala_surat[8].negatif_awal_kurun_waktu)
        })
    )

    qase(1947,
        it('Memilih akhir kurun waktu', () => {
            draftingKepalaSuratPage.inputAkhirKurunWaktu(data_temp.kepala_surat[8].akhir_kurun_waktu)
        })
    )

    qase(1952,
        it('Memilih akhir kurun waktu yang lebih kecil dari awal kurun waktu', () => {
            draftingKepalaSuratPage.inputNegatifAkhirKurunWaktu(data_temp.kepala_surat[8].negatif_akhir_kurun_waktu)
        })
    )
})