module.exports = {
    // GET
    profileName: '[data-cy="header__username"]',

    titleKaki: '[data-cy="input-kaki-surat__title"]',
    closeKaki: '[data-cy="input-kaki-surat__button--close"]',
    tanggalKaki: '[data-cy="surat__kaki-surat__date"]',
    
    labelTempatPenulisan: '[data-cy="input-kaki-surat__tempat-penulisan__label"]',
    inputTempatPenulisan: '[data-cy="input-kaki-surat__tempat-penulisan__input"]',

    labelPenandatangan: '[data-cy="input-kaki-surat__penandatangan__label"]',
    selectPenandatangan: '[data-cy="input-kaki-surat__penandatangan__select--format"]',
    pilihPenandatangan: '[data-cy="input-kaki-surat__penandatangan__select-option__custom-input0"]',
    messageErrorPenandatangan: '[data-cy="kaki-surat__penandatangan__error-message"]',
    
    labelPemeriksa: '[data-cy="input-kaki-surat__pemeriksa__label"]',
    pilihPemeriksa: '[data-cy="input-kaki-surat__pemeriksa__select-option__custom-input0"]',
    pilihPemeriksa2: '[data-cy="input-kaki-surat__pemeriksa__select-option__custom-input1"]',
    btnTambahPemeriksa: '[data-cy="input-kaki-surat__pemeriksa__button--add"]',
    labelErrorPemeriksa: '[data-cy="dialog__error__label-pemeriksa"]',
    messageErrorPemeriksa:'[data-cy="kaki-surat__pemeriksa__error-message"]',
    labelExitPemeriksa: '[data-cy="dialog__exit__label-pemeriksa"]',
    dialogSuccessPemeriksa: '[data-cy="dialog__success__label-pemeriksa"]',
    
    // XPATH
    btnDeletePenandatangan: "div[id='vs1__combobox'] button[title='Clear Selected']",
    selectedPenandatangan: ".vs__selected",
    checkPemeriksa: "div[id='vs2__combobox'] span[class='vs__selected']",
    checkDisabledPemeriksaField: "div[id='vs2__combobox'] input[data-cy='input-kaki-surat__pemeriksa__select-option__custom-input0']"
}