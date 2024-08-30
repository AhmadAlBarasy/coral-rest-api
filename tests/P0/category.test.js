/* eslint-disable */
import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/database';
import User from '../../src/db-files/models/User';
let token, categoryId;

beforeAll(async() => {
  // create a user and update their role to 'admin' to use for categories endpoints
  await request(app).post('/api/auth/signup').send({
    firstName: "Test",
    lastName: "Test",
    email: "testuser3p0@gmail.com",
    mobileNumber: "+970567112233",
    password: "Test@test1234",
    confirmPassword: "Test@test1234"
  });
  await User.update(
    {
      role: 'admin'
    },
    {
      where: {
        email: 'testuser3p0@gmail.com'
      }
    }
  );
  // login using that user's credintials to get the token
  const res = await request(app).post('/api/auth/login').send({
    email: 'testuser3p0@gmail.com',
    password: 'Test@test1234',
  });
  console.log(`Category P0 tests, Login Status: ${res.status}`);
  token = res.body.token;
});

describe('Get all Categories', () => {
  it('should return a 200 status code response with an array of objects that represents categories', async() => {
    const res = await request(app)
      .get('/api/categories')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

describe('Create a Category', () => {
  it('should return a 201 status code response with a response body that contains the created category', async() => {
    const res = await request(app)
      .post('/api/categories')
      .set('authorization', `Bearer ${token}`)
      .field('name', 'Test-Category')
      .field('description', 'Test')
      .attach('image', './tests/P0/Temp-Adidas.png');
    expect(res.status).toBe(201);
    categoryId = res.body.category.id;
  });
});

describe('Update a category', () => {
  it('should return a 200 status code response with a response body that contains the updated category', async() => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'Test-Category-2' });
    expect(res.status).toBe(200);
  });
});


describe('Delete a category', () => {
  it('should return a 204 status code response', async() => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('authorization', `Bearer ${token}`)
      expect(res.status).toBe(204);
  });
});



afterAll(async() => {
  await User.destroy({
    where: {
      email: 'testuser2p0@gmail.com',
    },
  });
  await sequelize.close(); // Close the database connection after all tests
});
