var assert = require('assert');
const checkEnvVariables=require('../checkEnvVariables');
describe('Test suite for checkEnvVaribles', function () {
 it('should return true if exactly 5 env variables are set', function () {
        assert.equal(checkEnvVariables(), true);
    });

});