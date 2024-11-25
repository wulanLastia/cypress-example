module.exports = {
    // LABEL
    label_naskahKeluarTitle: '[data-cy="panel__title"]',
    label_dataJenis0: '[data-cy="tindak-lanjut-naskah__table--jenis-surat-0"]',
    label_jenisNaskahTitle: '[data-cy="document-information__document-type__title"]',
    value_jenisNaskah: '[data-cy="document-information__document-type__data"]',
    label_perihalTitle: '[data-cy="document-information__perihal__title"]',
    value_perihal: '[data-cy="document-information__perihal__data"]',
    label_nomorNaskahTitle: '[data-cy="document-information__document-number__title"]',
    value_nomorNaskah: '[data-cy="document-information__document-number__data"]',
    label_urgensiTitle: '[data-cy="document-information__urgency__title"]',
    value_urgensi: '[data-cy="document-information__urgency__data"]',
    label_sifatTitle: '[data-cy="document-information__sifat__title"]',
    value_sifat: '[data-cy="document-information__sifat__data"]',
    label_statusTindakLanjut: '[data-cy="tindak-lanjut-naskah__table--status-tag-0"]',
    label_urgensiTindakLanjut: '[data-cy="tindak-lanjut-naskah__table--urgency-tag-0"]',
    label_jenisNaskahTindakLanjut: '[data-cy="tindak-lanjut-naskah__table--jenis-surat-0"]',
    label_dataEmpty: '[data-cy="table__empty-state"]',

    // TAB
    tab_registrasi: '[data-cy="tab__detail-registrasi"]',
    tab_histori: '[data-cy="tab__detail-histori"]',

    // BUTTON
    btn_bagikan: '[data-cy="header__button--bagikan"]',
    btn_clear_urgensi: '[data-cy="filter-tindak-lanjut__select__urgency__clear"]',
    btn_clear_jenis_naskah: '[data-cy="filter-tindak-lanjut__select__document-type__clear"]',

    // SECTION
    section_preview: '[data-testid="core__viewer"]',

    // SELECT
    filter_modeDistribusi: '[data-cy="filter-tindak-lanjut__select__activity__wrapper"]',
    filter_modeDistribusi_selected: '[data-cy="filter-tindak-lanjut__select__activity__wrapper"] div[id="vs3__combobox"] span[class="vs__selected"]',
    filter_modeDistribusi_semua: '[data-cy="filter-tindak-lanjut__select__activity__option-0"]',
    filter_modeDistribusi_telah_ditribusi: '[data-cy="filter-tindak-lanjut__select__activity__option-1"]',
    filter_modeDistribusi_diluar_sidebar: '[data-cy="filter-tindak-lanjut__select__activity__option-2"]',
    filter_urgensi: '[data-cy="filter-tindak-lanjut__select__urgency__wrapper"]',
    filter_urgensi_selected: '[data-cy="filter-tindak-lanjut__select__urgency__wrapper"] div[id="vs5__combobox"] div[class="vs__selected-options"]',
    filter_urgensi_biasa: '[data-cy="filter-tindak-lanjut__select__urgency__option-0"]',
    filter_urgensi_penting: '[data-cy="filter-tindak-lanjut__select__urgency__option-1"]',
    filter_urgensi_segera: '[data-cy="filter-tindak-lanjut__select__urgency__option-2"]',
    filter_urgensi_amat_segera: '[data-cy="filter-tindak-lanjut__select__urgency__option-3"]',
    filter_jenis: '[data-cy="filter-tindak-lanjut__select__document-type__wrapper"]',
    filter_jenis_selected: '[data-cy="filter-tindak-lanjut__select__document-type__wrapper"] div[id="vs6__combobox"] div[class="vs__selected-options"]',
    filter_jenis_search: '[data-cy="filter-tindak-lanjut__select__document-type__option-2"]', // Berita Acara
    filter_jenis_search_selected: '[data-cy="filter-tindak-lanjut__select__document-type__wrapper"] div[id="vs6__combobox"] div[class="vs__selected-options"] span[class="vs__selected"]',
    filter_jenis_check: '[data-cy="filter-tindak-lanjut__select__document-type__option-',

    // INPUT
    input_search_jenisNaskah: '[data-cy="filter-tindak-lanjut__select__document-type__search"]',
    input_search: '[class="vs__search__select"]',
}