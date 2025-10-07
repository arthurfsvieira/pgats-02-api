const request = require('supertest');
const { expect } = require('chai');

describe('TRANSFERS', () => {
    let token;

    before(async () => {
        // Captura o token do usuário de origem antes dos testes
        const respostaLogin = await request('http://localhost:3000')
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send ({
                'username': 'julio',
                'password': '123456'
            })
        token = respostaLogin.body.token;
    });

    describe('POST /transfers', () => {
        it('Deve retornar 201 ao realizar transferência entre usuários válidos.', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    from: "julio",
                    to: "priscila",
                    value: 100
                });
            expect(resposta.status).to.equal(201);
        });
    });

    describe('GET /transfers', () => {
        it('Retornar com 401 quando não enviar token de autenticação.', async () => {
            const resposta = await request('http://localhost:3000')
                .get('/transfers')
                .set('Content-Type', 'application/json');
            expect(resposta.status).to.equal(401);
        });
    });
});