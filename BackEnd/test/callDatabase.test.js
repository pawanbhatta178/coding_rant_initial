const assert = require('assert');
const { expect } = require('chai');
const { isArray } = require('util');
const { callDatabase } = require('../models/callDatabase');
const {getUserDetailsFromId}=require("../models/User")
describe('callDatabase()', function() {
    it('returns null when supplying no args', async function () {
      const res = await callDatabase();
        assert.equal(res,null);
    });
    it('returns 1 record values when supplied with get id from a table', async function () {
        const query = {
            text: 'SELECT * from "Challenges" where "id"=$1 ',
            values: [17],
        }
        const {rows} = await callDatabase(query);
        console.log(rows);
       expect(rows).to.have.length(1);
    });
    it('can return multiple record', async function () {
      const query = {
          text: 'SELECT * from "Challenges" where "id">$1 ',
          values: [1],
      }
      const {rows} = await callDatabase(query);
      console.log(rows);
     expect(rows).to.have.length.greaterThan(0);
  });
});
  

describe('user()', function () {
  it('error message is logged when non existent user id is passed', async function () {
    const ans = await getUserDetailsFromId('asasas');
  })
  it('returns valid users when supplied with valid id', async function () {
    const ans = await getUserDetailsFromId('24e5d775-f5b5-44c2-b12b-5855a8c9b64d');
    expect(ans).to.have.property('id');
  } )
})
