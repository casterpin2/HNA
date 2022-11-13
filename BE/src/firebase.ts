
import admin  from 'firebase-admin';

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert('educ-5445f-firebase-adminsdk-vaady-00a5199765.json'),
  storageBucket: 'educ-5445f.appspot.com'
})
// Cloud storage
export const bucket = admin.storage().bucket();

