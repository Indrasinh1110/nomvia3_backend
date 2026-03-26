const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log('Firebase Admin Initialized');
        }
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
        // We don't exit here because local dev might run without firebase initially if just testing DB
    }
};

module.exports = { admin, initializeFirebase };
