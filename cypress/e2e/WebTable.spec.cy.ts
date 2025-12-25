describe('Rediffmoney web table tests', () => {
  beforeEach(() => {
    cy.visit('https://money.rediff.com/gainers/bse/daily/groupall');
  });

  it('Get componay name with X% change', () => {
    cy.get('.dataTable tbody tr').each(($row) => {
      const text = $row.text();
      if (text.includes('12.62')) {
        cy.wrap($row)
          .find('td')
          .first()
          .then(($company) => {
            const companyName = $company.text();
            cy.log(companyName);
            expect(companyName).to.equal('Jhaveri Credits');
          });
      }
    });
  });

  it('Print company with > 10% change', () => {
    // Find the "% Change" column index
    cy.get('.dataTable thead tr th').each(($el, idx) => {
      if ($el.text().includes('% Change')) {
        cy.log(`% Change is at index: ${idx}`);

        cy.get('.dataTable tbody tr').each(($row) => {
          const companyName = $row.find('td').first().text().trim();
          const changeValue = $row
            .find('td')
            .eq(idx)
            .text()
            .replace('+', '')
            .trim();

          if (Number(changeValue) > 10) {
            cy.log(`Company: ${companyName} has change: ${changeValue}%`);
          }
        });
      }
    });
  });
});
