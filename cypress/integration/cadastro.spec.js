/// <reference types="cypress" />

import cadastro from '../pages/CadastroPage'

describe('Cadastro', () => {

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function () {
        cadastro.go()
        cadastro.fillForm(this.deliver.cadastro)
        cadastro.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cadastro.modalContentShouldBe(expectedMessage)

    })

    it('CPF Incorreto', function () {
        cadastro.go()
        cadastro.fillForm(this.deliver.cpf_invalido)
        cadastro.submit()
        cadastro.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Email Inválido', function () {
        cadastro.go()
        cadastro.fillForm(this.deliver.email_invalido)
        cadastro.submit()
        cadastro.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    it('Campos Obrigatórios', function () {
        cadastro.go()
        cadastro.submit()
        cadastro.alertMessageShouldBe('É necessário informar o nome')
        cadastro.alertMessageShouldBe('É necessário informar o CPF')
        cadastro.alertMessageShouldBe('É necessário informar o email')
        cadastro.alertMessageShouldBe('É necessário informar o CEP')
        cadastro.alertMessageShouldBe('É necessário informar o número do endereço')
        cadastro.alertMessageShouldBe('Selecione o método de entrega')
        cadastro.alertMessageShouldBe('Adicione uma foto da sua CNH')
    })
})

