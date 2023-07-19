const { expect } = require('chai');
const request = require('supertest');
const express = require('express');

const router = require('../src/routes/platformsRouter'); // Asegúrate de importar tu archivo de rutas aquí

const app = express();
app.use('/', router);

describe('Platforms API', () => {
  describe('GET /', () => {
    it('should return all platforms', (done) => {
      request(app)
        .get('/')
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

  // Agrega más pruebas para las otras rutas según sea necesario

});
