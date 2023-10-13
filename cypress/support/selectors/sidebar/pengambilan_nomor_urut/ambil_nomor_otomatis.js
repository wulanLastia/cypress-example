module.exports = {
    // GET
    popupPengambilanNomor: '[data-cy="dialog__confirmation-ambil-nomor"]',
    titlePopupPengambilanNomor: '[data-cy="dialog__confirmation-ambil-nomor__title"]',
    titlePopupPengambilanNomorDesc: '[data-cy="dialog__confirmation-ambil-nomor__deskripsi"]',
    labelKonfirmasiPengambilanNomor: '[data-cy="dialog__label-confirmation-ambil-nomor"]',
    btnCancelPengambilanNomor: '[data-cy="dialog__confirmation-ambil-nomor-manual__button--cancel"]',
    btnKonfirmasiAmbilNomor: '[data-cy="dialog__confirmation-ambil-nomor-manual__button--submit"]',
    popupBerhasilMendapatkanNomor: '[data-cy="dialog__success-ambil-nomor"]',
    labelBerhasilMendapatkanNomor: '[data-cy="dialog__success-ambil-nomor__title"]',
    descBerhasilMendapatkanNomor: '[data-cy="dialog__success-ambil-nomor__deskripsi"]',
    btnSelesaiMendapatkanNomor: '[data-cy="dialog__confirmation-ambil-nomor-manual__button--approve"]',
    validateDataNomorUrut: '[data-cy="table__pengambilan-nomor__item-order-number"]',
    validateDataTanggalNomorUrut: '[data-cy="table__pengambilan-nomor__item-tanggal-nomor"]',
    validateDataTanggalPesanNomorUrut: '[data-cy="table__pengambilan-nomor__item-tanggal-dipesan"]',
    validateStatusNomorUrut: '[data-cy="table__pengambilan-nomor__item-status"]',
    validateAksi: '[data-cy="table__pengambilan-nomor__item-action"]',
    popupLabelTanggalPenomoran: '[data-cy="dialog__ambil-nomor-urut__label--tanggal-penomoran"]',
    popupLabelJenisNaskah: '[data-cy="dialog__ambil-nomor-urut__label--ketegori-jenis-naskah"]',
    popupLabelUKUP: '[data-cy="dialog__ambil-nomor-urut__label--uk-up"]',

    // XPATH
    xpathNomorUrut: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[1]/div[1]/div[15]/div[1]/div[1]/span[1]',
    xpathTablePengambilanNomor: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[3]/div[2]/div[1]'
}