beforeEach(() => {
    // default call to set all feature toggle beside the defaults into FALSE
    cy.overrideFeatureToggle()
})

describe('Visit dummy endpoint', () => {
    it('should contain a TRUE text', () => {
        // detailed override to only activate feature toggle we required
        cy.overrideFeatureToggle({
            'SIDEBAR-V1_RATE-LIMITER--FAILED_LOGIN': true,
        })

        cy.visit('https://devsidebar.digitalservice.id/') // 1.

        cy.get('#value')
            .should('contain.text', 'TRUE');
    });
});