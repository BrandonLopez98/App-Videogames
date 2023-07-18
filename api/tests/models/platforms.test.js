const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app'); // Asegúrate de importar tu archivo principal de la aplicación aquí

describe('Platforms API', () => {
  describe('GET /platforms', () => {
    it('should return all platforms', (done) => {
      request(app)
        .get('/platforms')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          
          const platforms = res.body;
          
          // Asegúrate de que el resultado sea un array
          expect(platforms).to.be.an('array');
          
          // Asegúrate de que haya al menos una plataforma
          expect(platforms.length).to.be.greaterThan(0);
          
          // Asegúrate de que cada plataforma tenga un id y un nombre
          platforms.forEach((platform) => {
            expect(platform).to.have.property('id');
            expect(platform).to.have.property('name');
          });
          
          done();
        });
    });
  });
});
