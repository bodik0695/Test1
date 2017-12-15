process.env.NODE_ENV = 'test';

const testDb = require('../config/testDB');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const server = require('../api');
const morgan = require('morgan');

const { describe } = mocha;
const { beforeEach } = mocha;
const { it } = mocha;
const { before } = mocha;
const { expect } = chai;
const should = chai.should();

server.listen();
chai.use(chaiHttp);
// server.use(morgan('combined'));

describe('todos', () => {
    before(() => {
        MongoClient.connect(testDb.url, (error, db) => {
            db.collection('toDoList').remove({}, () => {
                console.log('todos deleted');
            });
        });
    });
    describe('GET /todos', () => {
        it('it should GET all the todos', (done) => {
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    before(() => {
        MongoClient.connect(testDb.url, (error, db) => {
            const item = {
                _id: ObjectId('5a31607345023319e8ba6a7e'),
                title: 'title',
                text: 'text',
                status: 0,
                createAt: new Date().toString(),
                changeAt: new Date().toString(),
            };
            db.collection('toDoList').insertOne(item, () => { });
        });
    });
    describe('GET /todos/:id', () => {
        it('it should GET one of the todos', (done) => {
            chai.request(server)
                .get('/todos/5a31607345023319e8ba6a7e')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('POST /todos', () => {
        it('it should bad POST a todo', (done) => {
            const todo = {
                title: 'title',
                status: 0,
            };
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('it should good POST a todo', (done) => {
            const todo = {
                title: 'title',
                text: 'text',
                status: 0,
            };
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('todo created!');
                    done();
                });
        });
    });
    describe('PUT /todos', () => {
        it('it should UPDATE a todo given the id', (done) => {
            const todo = {
                _id: '5a31607345023319e8ba6a7e',
                title: 'title1',
                text: 'text1',
                status: 0,
            };
            chai.request(server)
                .put('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('todo updated!');
                    done();
                });
        });
    });
    describe('DELETE /todos/:id', () => {
        it('it should DELETE a todo given the id', (done) => {
            chai.request(server)
                .delete('/todos/5a31607345023319e8ba6a7e')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('todo deleted!');
                    done();
                });
        });
    });
});

