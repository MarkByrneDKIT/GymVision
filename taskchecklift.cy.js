describe('Task', () => {
    it('user can login, select a lift and check session history', () => {
  
      //open login page
      cy.visit('http://localhost:3000/login');
  
      //1.Enter username ('liam' in this case)
      cy.findByPlaceholderText(/Username/i).type('liam');

      //2. Enter password('password123' in this case)
      cy.findByPlaceholderText(/password/i).type('password123');

      //3. do captcha
      Cypress.Commands.add("clickRecaptcha", () => {
        cy.window().then(win => {
          win.document
            .querySelector("iframe[src*='recaptcha']")
            .contentDocument.getElementById("recaptcha-token")
            .click();
        });
      });
  

      //4. Click Login button
      cy.findByRole('button', {  name: /log in/i}).click();

      //5. Go to lift selections page
      cy.findByRole('link', {  name: /lifts/i}).click();

    //6.click on squat page
    cy.findByRole('link', {  name: /squat/i}).click()

    //7. Get squats session data
    cy.findByRole('button', {  name: /get data/i}).click()
   
  
    });
  })