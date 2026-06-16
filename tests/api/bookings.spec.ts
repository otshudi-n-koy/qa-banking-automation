import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

// Force l'exécution séquentielle dans ce fichier
test.describe.configure({ mode: 'serial' });

test.describe('API — Gestion des réservations', () => {

  let bookingId: number;
  let authToken: string;
  
  // reste du code inchangé...

  // Authentification API — récupération du token
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    authToken = body.token;
    expect(authToken).toBeDefined();
  });

  test('GET /booking — liste toutes les réservations', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST /booking — crée une nouvelle réservation', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: {
        firstname: 'N\'Koy',
        lastname: 'OTSHUDI',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-07-01',
          checkout: '2026-07-07',
        },
        additionalneeds: 'Breakfast',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    bookingId = body.bookingid;
    expect(bookingId).toBeDefined();
    expect(body.booking.firstname).toBe('N\'Koy');
    expect(body.booking.lastname).toBe('OTSHUDI');
  });

  test('GET /booking/:id — récupère une réservation par ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('N\'Koy');
    expect(body.totalprice).toBe(150);
    expect(body.depositpaid).toBeTruthy();
  });

test('PUT /booking/:id — modifie une réservation', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${authToken}`,
    },
    data: {
      firstname: "N'Koy",
      lastname: 'OTSHUDI',
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-07-01',
        checkout: '2026-07-10',
      },
      additionalneeds: 'Breakfast and Dinner',
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.totalprice).toBe(200);
  expect(body.additionalneeds).toBe('Breakfast and Dinner');
});

test('DELETE /booking/:id — supprime une réservation', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${authToken}`,
    },
  });
  expect(response.status()).toBe(201);
});

  test('GET /booking/:id — vérifie la suppression', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.status()).toBe(404);
  });

});