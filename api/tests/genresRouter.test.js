const { expect } = require('chai');
const request = require('supertest');
const express = require('express');

const router = require('../src/routes/genresRouter');

const app = express();
app.use('/', router);

describe('Genres API', () => {
  describe('GET /', () => {
    it('should return all genres', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const genres = res.body;

          // Asegúrate de que el resultado sea un array
          expect(genres).to.be.an('array');

          // Asegúrate de que haya al menos un género
          expect(genres.length).to.be.greaterThan(0);

          // Asegúrate de que cada género tenga un id y un nombre
          genres.forEach((genre) => {
            expect(genre).to.have.property('id');
            expect(genre).to.have.property('name');
          });

          done();
        });
    });
  });

  // Agrega más pruebas para las otras rutas (POST, DELETE, etc.) según sea necesario
});
