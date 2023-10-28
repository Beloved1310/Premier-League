import request from 'supertest';
import express from 'express';
import { createServer } from 'http';
import  User, {UserDocument}  from '../../api/model/user'; 

import app from '../../api/app'; 

describe('Team Routes', () => {
  let server: ReturnType<typeof createServer>;
   let authAdminToken : string;

  beforeAll((done) => {
    const userObject: UserDocument = new User({
      fullname: 'AdminTest',
      email: 'admin@test.com',
      password: 'yourpassword',
      isAdmin: true,
    });
    const auth= userObject.generateAuthToken();
    authAdminToken = `Bearer ${auth}`
    server = createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  const teamPayload = {
    name: 'Super Facolnssyyi',
    country: 'Nigeria',
    founded: 1994,
  };

  it('should create a team', async () => {
    const response = await request(server)
      .post('/team/')
      .set({authorization: authAdminToken})
      .send(teamPayload);
    expect(response.status).toBe(200); // Replace with the appropriate status code
    // Add more assertions as needed
  });

  // it('should view a team', async () => {
  //   const response = await request(server)
  //     .get('/teams/someTeamCode')
  //     .set('Authorization', authToken);

  //   expect(response.status).toBe(200); // Replace with the appropriate status code
  //   // Add more assertions as needed
  // });

  // it('should update a team', async () => {
  //   const response = await request(server)
  //     .put('/teams/someTeamCode')
  //     .set('Authorization', authToken)
  //     .send(teamPayload);

  //   expect(response.status).toBe(200); // Replace with the appropriate status code
  //   // Add more assertions as needed
  // });

  // it('should delete a team', async () => {
  //   const response = await request(server)
  //     .delete('/teams/someTeamCode')
  //     .set('Authorization', authToken);

  //   expect(response.status).toBe(204); // Replace with the appropriate status code
  //   // Add more assertions as needed
  // });

  // it('should list teams', async () => {
  //   const response = await request(server)
  //     .get('/teams')
  //     .set('Authorization', authToken);

  //   expect(response.status).toBe(200); // Replace with the appropriate status code
  //   // Add more assertions as needed
  // });
});
