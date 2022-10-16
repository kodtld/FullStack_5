describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })
        
  
    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.once('uncaught:exception', () => false);
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
        cy.once('uncaught:exception', () => false);
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.contains('wrong credentials')
        })
    })
    
describe('When logged in', function() {
    beforeEach(function() {
        cy.once('uncaught:exception', () => false);
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Add new blog').click()
        cy.get('#title').type('testiblogi')
        cy.get('#author').type('kaaakaa')
        cy.get('#url').type('www.com')
        cy.get('#create-button').click()
    });

    it('A blog can be created', function() {
        cy.contains('testiblogi')

    })

    it('A blog can be liked', function() {
        cy.contains('Show more').click()
        cy.contains('Like').click()
        cy.contains('Like received')
    })

    it('A blog can be removed', function() {
        cy.contains('Show more').click()
        cy.contains('Remove blog').click()
        cy.contains('testiblogi removed')
    })

    })

})
 