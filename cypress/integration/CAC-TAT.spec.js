/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e enviar formulario', function () {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste, '
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Villaslobo')
        cy.get('#email').type('leovillas@teste.com')
        cy.get('#phone').type('11974148506')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('enviar formulario com e-mail invalido', function () {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Villaslobo')
        cy.get('#email').type('leovillas@teste,com')
        cy.get('#phone').type('11974148506')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function () {
        cy.get('#phone')
            .type('asdvbcd')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio', function () {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Villaslobo')
        cy.get('#email').type('leovillas@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche campo e limpa os campos', function () {
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo')
            .clear()
            .should('have.value', '')

        cy.get('#lastName').type('Villaslobo').should('have.value', 'Villaslobo')
            .clear()
            .should('have.value', '')

        cy.get('#email').type('teste@a.com').should('have.value', 'teste@a.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone').type('12234123').should('have.value', '12234123')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter ao formulario sem preencher os campos obrigatorios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    ///comandos customizados /suport/commands.js
    it('envia formulario com sucesso usando um comando customizado', function () {
        cy.preencheFormulario()
        cy.get('.success').should('be.visible')
    })

    it('envia formulario com sucesso usando um comando customizado', function () {
        cy.preencheFormulario()
        cy.get('.success').should('be.visible')
    })

    it('Selecionando um produto por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Selecionando um produto por seu value', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Selecionando um produto por seu indice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento para "Feedback" ', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]') //
            .should('have.length', 3)//conta quantos ele mapeou
            .each(function ($radio) {//recebe uma função como argumento e faz a interação pra cada um
                cy.wrap($radio).check() // impacota cada um e faz um check
                cy.wrap($radio).should('be.checked') // verifica se todos foram marcados
            })
    })

    it('marca ambos checkbox, e depois desmarcar o ultimo', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixture', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-in-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('selecionando um arquivo utilizando uma fixture para qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica se a politica de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a pagina de politica de privacidade removendo o target e então clicar', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

})
