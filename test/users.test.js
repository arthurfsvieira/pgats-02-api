const request = require('supertest');
const { expect } = require ('chai');

describe ('USERS', () => {
    describe ('POST /users/register', () => {
        it ('Retornar com 201 quando realizar cadastro com credenciais obrigatórias.', async () => {
            const resposta = await request ('http://localhost:3000')
                .post('/users/register')
                .set ('Content-Type', 'application/json')
                .send ({
                    'username': 'josé',
                    'password': '654321',
                    'favorecidos': [
                        ''
                    ]
                })
            
            expect (resposta.status).to.equal(201);

        })

        it ('Retornar com 201 quando realizar cadastro de usuário com favorecido atribuído.', async () => {
            const resposta = await request ('http://localhost:3000')
                .post('/users/register')
                .set ('Content-Type', 'application/json')
                .send ({
                    'username': 'joaquim',
                    'password': '123456',
                    'favorecidos': ['julio']
                })
            
            expect (resposta.status).to.equal(201);

        })

        it ('Retornar com 400 quando registrar usuário com username já cadastrado.', async () => {
            const resposta = await request ('http://localhost:3000')
                .post('/users/register')
                .set ('Content-Type', 'application/json')
                .send ({
                    'username': 'julio',
                    'password': '123456',
                    'favorecidos': [
                        ''
                    ]
                })
            
            expect (resposta.status).to.equal(400);
        })
        
        it ('Retornar com 400 quando registrar usuário com campos obrigatórios em branco.', async () => {
            const resposta = await request ('http://localhost:3000')
                .post('/users/register')
                .set ('Content-Type', 'application/json')
                .send ({
                    'username': '',
                    'password': 'eutenhoasenha',
                    'favorecidos': [
                        ''
                    ]
                })
            
            expect (resposta.status).to.equal(400);
        })

        
    })

    describe ('POST /users/login', () => {
        it ('Retornar com 200 quando realizar login com credenciais válidas.', async () => {
            const resposta = await request ('http://localhost:3000')
                .post('/users/login')
                .set ('Content-Type', 'application/json')
                .send ({
                    'username': 'julio',
                    'password': '123456'
                })
            
            expect (resposta.status).to.equal(200);

        })

        it ('Retornar com 400 quando realizar login com credenciais inválidas.', async () => {
            const resposta = await request ('http://localhost:3000')
                .post('/users/login')
                .set ('Content-Type', 'application/json')
                .send ({
                    'username': 'joaogomes',
                    'password': '12345'
                })
            
            expect (resposta.status).to.equal(400);

        })

        // it ('Retornar com 422 quando realizar login com uma das credenciais vazias.', async () => {
        //     const resposta = await request ('http://localhost:3000')
        //         .post('/users/login')
        //         .set ('Content-Type', 'application/json')
        //         .send ({
        //             'username': 'joaogomes',
        //             'password': ''
        //         })

        //     console.log(resposta.status)
            
        //     expect (resposta.status).to.equal(422);

        // })


    })

    describe ('GET /users', () => {
        it ('Retornar com 200 quando listar usuários.', async () => {
            const resposta = await request ('http://localhost:3000')
                .get('/users')
                .set ('Content-Type', 'application/json')

            console.log(resposta.status)
            console.log(resposta.body)
            
            expect (resposta.status).to.equal(200);

        })
    })
})