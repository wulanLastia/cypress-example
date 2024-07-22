module.exports = {
    // BUTTON
    btn_tandatanganiNaskah: '[data-cy="header__button--sign-document"]',
    btn_tandTanganiNaskahReview: '[data-cy="tte-review-naskah__button--sign-document"]',
    btn_tteNaskah: '[data-cy="dialog__dialog-send-document__button--confirm"]',
    btn_tteConfirm: '[data-cy="dialog__dialog-signing__button--confirm"]',
    btn_tteCancel: '[data-cy="dialog__dialog-signing__button--cancel"]',
    btn_kirimNaskah: '[data-cy="header__button--submit"]',
    btn_confirmKirimNaskah: '[data-cy="dialog__dialog-send-document__button--confirm"]',
    btn_closeCsat: '[data-cy="dialog__dialog-csat__button--close"]',
    btn_submitCsat: '[data-cy="dialog__dialog-csat__button--confirm"]',

    // LABEL
    label_headerDocumentType: '[data-cy="header__title"]',
    label_tandatanganiNaskah: '[data-cy="dialog__dialog-send-document__title"]',
    label_tandatanganiInfoTitle: '[data-cy="dialog__dialog-send-document__info__title"]',
    label_tandatanganiInfoDesc: '[data-cy="dialog__dialog-send-document__info__description"]',
    label_dataJenisNaskah: '[data-cy="dialog__dialog-send-document__document-type"]',
    label_dataUrgensi: '[data-cy="dialog__dialog-send-document__document-urgency"]',
    label_dataPerihal: '[data-cy="dialog__dialog-send-document__document-perihal"]',
    label_dataNomorUrut: '[data-cy="dialog__dialog-send-document__document-nomor-0"]',
    label_dataFileName: '[data-cy="dialog__dialog-send-document__document-filename-0"]',
    label_penandatangan: '[data-cy="dialog__dialog-send-document__penandatangan__title"]',
    label_dataNamaPenandatangan: '[data-cy="dialog__dialog-send-document__penandatangan__card-user__people-name-0"]',
    label_dataJabatanPenandatangan: '[data-cy="dialog__dialog-send-document__penandatangan__card-user__people-position-0"]',
    label_penerima: '[data-cy="dialog__dialog-send-document__tujuan__title"]',
    label_dataNamaPenerima: '[data-cy="dialog__dialog-send__card-tujuan__card-user__people-name-0"]',
    label_dataJabatanPenerima: '[data-cy="dialog__dialog-send__card-tujuan__card-user__people-position-0"]',

    // POPUP
    dialog_konfirmasiTandatangani: '[data-cy="dialog__dialog-send-document__panel"]',
    dialog_panelTte: '[data-cy="dialog__dialog-signing__panel"]',
    dialog_panelTteTitle: '[data-cy="dialog__dialog-signing__title"]',
    dialog_panelTteDesc: '[data-cy="dialog__dialog-signing__description"]',
    dialog_panelInputPassphrase: '[data-cy="dialog__dialog-signing__input--passphrase"]',
    dialog_panelIconHideShow: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[1]/main[1]/div[1]/div[5]/div[1]/div[1]/div[1]/button[1]',
    dialog_successTTENaskah: '[data-cy="dialog__dialog-info__wrapper"]',
    dialog_csat: '[data-cy="dialog__dialog-csat__panel"]',

    // INPUT
    input_emotCsat: '[data-cy="dialog__dialog-csat__input-rate-4"]',
    input_saranCsat: '[data-cy="dialog__dialog-csat__input-comment"]'
}