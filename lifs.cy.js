describe('Lifts', () => {
  it('user can select lifts', () => {

    //open lifys selection page
    cy.visit('http://localhost:3000/liftselection');

    //1.click on deadlift page
    cy.findByRole('button', {  name: /deadlift/i}).click()

    cy.findByRole('button', {  name: /squat/i}).click()

    cy.findByRole('button', { name: /shoulder press/i }).click()



  });
})