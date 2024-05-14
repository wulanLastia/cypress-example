const { inputPassphrase } = require("@selectors/sidebar/kotak_masuk/setujui");

module.exports = {
    // GET
    btnSuratPerintah: '[data-cy="template-naskah__surat-perintah"]',
    btnKembali: '[data-cy="surat-perintah__button--back"]',
    titleMenu: '[data-cy="surat-perintah__title"]',
    selectedKonsep: '[data-cy="document-type__dropdown"]',
    previewKop: '[data-cy="surat__kop-surat"]',
    titleKop: '[data-cy="kop-surat__title"]',
    previewKepala: '[data-cy="surat__kepala-surat-preview"]',
    titleKepala: '[data-cy="surat__title__surat-perintah"]',
    previewBadan: '[data-cy="surat__badan-surat"]',
    titleBadan: '[data-cy="surat-perintah__badan-surat__title"]',
    previewKaki: '[data-cy="surat__kaki-surat"]',
    titleKaki: '[data-cy="input-kaki-surat__title"]',
    editFormDefault: '[data-cy="surat-perintah__kepala-surat-preview__dasar--null-state"]',
    btnSimpanNaskah: '[data-cy="drafting__button-save"]',
    btnKirimNaskah: '[data-cy="surat-perintah__button--submit"]',
    konfirmasiKirimNaskah: '[data-cy="dialog__confirmation-submit__button--kirim-naskah"]',
    popupSuccessKirimNaskah: '[data-cy="dialog__success"]',
    popupTitleSuccessKirimNaskah: '[data-cy="dialog__success__title"]',
    btnTandatanganiNaskah: '[data-cy="button--signing"]',
    konfirmasiTandatanganiNaskah: '[data-cy="dialog__signing-naskah"]',
    inputPassphrase: '[data-cy="dialog__signing-naskah__input--passphrase"]',
    btnSubmitTandatanganiNaskah: '[data-cy="dialog__signing-naskah__button--submit"]',

    // XPATH
    titleLampiran: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[2]/div[1]/div[1]/h2[1]',
}