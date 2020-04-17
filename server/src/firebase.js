const admin = require('firebase-admin');

require('dotenv').config();

let serviceAccountJson = JSON.parse(
  Buffer.from(
    'eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6InRocmVhZGVyLTY5ZTgxIiwicHJpdmF0ZV9rZXlfaWQiOiJmMGFmY2I0NGU4YmE3OGI2NzZmZjQ5M2JlNDU1ZTE0OWYxOWU1YzhmIiwicHJpdmF0ZV9rZXkiOiItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2d0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktrd2dnU2xBZ0VBQW9JQkFRQzNBVjBTYThabmUzU2dcbjI5Qk9LRTB5Sk9WNUgyTWhxS0JtRDN5SUZXR3NRRG9iYmpic0p6WE9PRTBwK2hCNm5FQkVSYkpMZkRDUVdiVnFcbm9BWGxVR1ZKejBXYzEwbTZLdWFaK0VUbHVQOFhvUUFuKzh0RGpyN29wZU9vMDY0V29PVnJGZG9WM21EUlU4SC9cbm12cUhjNGhyNWRmTHVoQW5Xajd3VllaRXFMR1R2QzhHK1FVL0d0RzFnRWlwaU9OYWVwWlFvY0E0eGVNSFA3WmhcbjJ6UVBZbVhPSEJOTHNFdy9NOGpaYUlEdlhaWk1BWWJBWEZNOUF6amN5SWNUZ0RLSVp0NmZWVnBHdVdxUkV2L2NcbjltdHJQSURBM0FWc3JLdWxQNXJ4UWVnL3RiT2E5K1U4N3YwRU1XNUt6czZ3a2J5ek9mWmRFaUV5YXhPQkN4Zmxcbm9ZQmJQWHBiQWdNQkFBRUNnZ0VBR05kV2l1bVdSUFc5SHhpM2JlU0tsZ1BzSWtUZ2IvRXoxS2JGZ0xObVRydHBcbko5QU9KSUF1RFpBVzZWdklZTnhVM08rWkJDWVhjWUM3MzMxWlQ0ZGFPR3FxU0YvdzRoUnd1UFc2WkhSNEsvenVcbnlINmxXTVpIbzh6ZzJrbmhsN0MvYzRuRDBMUWU4RXN1U2tQL1BlT3c0UFNTRmxWclcrd2tIdnQ4L2xUbnhlWEtcbm1LcU9QZ1JHb0l1bkczeWE5RnMrVTQrN2FLem9YRWd0UldYS3lVQ1AwMVZaZEZicTZLSmdFcm5IZk83YzdKK25cblhZWFJTZXJaZjRVTVpZeHNtODYzdHE2MW1PSmpQZkZUek5zaW9LSUlXejV6eFBvdmluWVhsbnBDZXIxSkpVYi9cbmUwYVhlVi9pam1XN21reDZnU1NVSEZra0QyWFhSK1crVkx6R3c5NStBUUtCZ1FEbk1EVThoM3pxTGUxU0V1em9cblRHQ1UrRGZiTUVFT0NFaVF6YTNkTWx3dWVXOFRXaktMLzZHRWExSHdpQUtzQmJiSkEwSTh0b2NhZ0NZVERpQzRcbkRjaGZLOHhoWllHdmNIN2Z5Y3ZBY0szeGNFMmxVbzhmT015dk1MbUlhSXB3S2xWNkttUkRUaHNlcjNGaTJ2MXFcblhiRk92RVdOcjJEWGJha0dINFY1eXQ1dzNRS0JnUURLcFZtdm0zVkF0dTdVVDVpU2dtbVZMYVk5cDViQ1VISkVcbmYxNlpwMG1qYTR4bXpSczlmNlpHbGR5M1dPWWthem1YSk1lMGRnVTZuRGRLUnZYNlBmb0Z2ZkN0Sm9OYWJWYldcbmRVVHRaeFdyQk5sMFF5Y1dhMTJ1blFhOFBrLzhkYkh2bkg4aXNNK0ZodDRONThPYm5IZDN0M0I2WnlFUVpsaXVcbmVyMU9YMm9JbHdLQmdRRFlSOXBXRVM3RWFranVFblI5OGc0Yzc0WlowVy9hNzlicldQQUIwcjQ0WURTUTl6MzRcbmlTTVNuZEFmWlM2U3ZobTlQZ1kyaEZBcWM1NnJEdmwvRnEzUWswbjJDQjltQUtsQk5Ta2ZsSXEySitrTDlBdWZcbkd1VXFORHd1S0JielRqZC9QYTlrNCtvdEw5YTBzOGlHUExiR3dRMlV1bkN2dVpCNkFQMCs3cEpoSlFLQmdRQ09cbmJLcGRKdWpBNUJGMWZML2g4UENlSFdoaW10LzFrQzdQZjZtUVdxZ0J5SHYwWUtHTmxxTFpwMGhxUUh2NENyaCtcblJ5Wm82aTRBcEh5am9yNE04L1EraHVHYUFLQi9OS3U4ck0wV0FjYVQzU09zZCtvSDhzdjBCbjhPWE1sQXljT1dcbmdhcEZTbm1BQW1zYzROQjFGUUpPVE1vcjdVR3EwaFB3QlduNXBFdlUzd0tCZ1FEVUdmajRwanNLVkl4UDRjeUJcbnkvMW1iYmlsV2hOZ2VwbjlxcWEzWWUxcGx6NmlDcG1TcHRaZVUxN3FTdFVJNWFpN2xZOEJuWGE4MjVXcUx0ZGpcbkJJMGdSdE9zdWN0YkZBc0VuVWZZRWo5aGVLMnd0LzkzTWRsbnpuOFBuL0IraXV6cTBsdnltNUlEWFJXd2FtRTZcbnpYUFJCQVFIM1ZuNmI2UjhnWTQ2L09ydnlRPT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsImNsaWVudF9lbWFpbCI6InRocmVhZGVyLXNlcnZpY2UtYWNjQHRocmVhZGVyLTY5ZTgxLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiY2xpZW50X2lkIjoiMTAwNTc3Mzc3Nzk4NjU2NjYwMjA0IiwiYXV0aF91cmkiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsInRva2VuX3VyaSI6Imh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjoiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwiY2xpZW50X3g1MDlfY2VydF91cmwiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L3RocmVhZGVyLXNlcnZpY2UtYWNjJTQwdGhyZWFkZXItNjllODEuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQo',
    'base64',
  ),
);

if (!process.env.CI) {
  serviceAccountJson = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64'));
}

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  databaseURL: 'https://threader-69e81.firebaseio.com',
});

module.exports = firebaseApp;
