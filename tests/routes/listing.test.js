// Mongoose and mocking requests
const sinon = require('sinon');
const mongoose = require('mongoose')
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Listing = mongoose.model('Listing')

var Mock = sinon.mock(Listing)

beforeEach(() => {
	Mock.restore(); // Unwraps the spy
	Mock = sinon.mock(Listing)
});

afterEach( () => {
	Mock.verify();
});


describe('Sale Integration tests', () => {
	const request = {
		coordinates: {
			lat: 32,
			lng: 44
		},
			address: {
				street: "Nils",
				number: 44
			},
			summary: {
			 condo: true,
			 villa: false,
				price: 312312312,
				fee: 3212,
				bidding: true
			},
				location: "Öland"
	}

	const expected = {
		coordinates: {
			lat: 32,
			lng: 44
	},
 address: {
			street: "Nils",
			number: 44
	},
	summary: {
			condo: true,
			villa: false,
			price: 312312312,
			fee: 3212,
			bidding: true
	},
	_id: "5d00df7cde03af4dd8ac21e3",
	location: "Öland",
	__v: 0
	}

describe('listing.get', ()  => {
	it('Should return an array of all listings', (done) => {
		// Given (preconditions)
		Mock
		.expects('find')
		.chain('exec')
		.resolves([expected]);

		// When (something happens)
		agent
		.get('/listings')
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
		});
	});
});

// // POST TEST
describe('listing.post', () => {
	it('Should be able to create a sale', (done) => {
		// Given (preconditions)
		Mock
			.expects('create')
			.withArgs(request)
			.chain('exec')
			.resolves(expected);

		// When (something happens)
		agent
			.post('/listings')
			.send(request)
			.end((err, res) => {
				// Then (something should happen)
				expect(res.status).to.equal(201);
				expect(res.body).to.eql(expected);
				done();
			});
	});
});

describe('listing.put', () => {
	it('Should be able to create a sale', (done) => {
		// Given (preconditions)
		Mock
			.expects('updateOne')
			.withArgs({
				_id: "5d00df7cde03af4dd8ac21e3"
			}, request)
			.chain('exec')
			.resolves({
				n: 1,
				nModified: 0,
				upserted: [{
					index: 0,
					_id: "5d00df7cde03af4dd8ac21e3"
				}],
				ok: 1
			});

		// When (something happens)
		agent
			.put('/listings/5d00df7cde03af4dd8ac21e3')
			.send(request)
			.end((err, res) => {
				// Then (something should happen)
				expect(res.status).to.equal(201);
				done();
			});
	});
});
});