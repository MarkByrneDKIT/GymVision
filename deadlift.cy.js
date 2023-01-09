describe('Deadlifts', () => {
    it('user can check deadlifts data', () => {
  
      //open deadlifts page
      cy.visit('http://localhost:3000/deadlift');
  
      //click on get data
      cy.findByRole('button', {  name: /get data/i}).click()
  
    });
  })