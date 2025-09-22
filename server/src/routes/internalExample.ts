import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { serverToken } from '../main.js';

export const internalHealthcheck = onRequest({
  secrets: [serverToken],
  memory: '256MiB',
  timeoutSeconds: 30
}, async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const providedToken = req.headers['x-server-token'];
    if (!providedToken || providedToken !== serverToken.value()) {
      logger.error('❌ Token serveur invalide');
      res.status(401).json({ success: false, error: 'Non autorisé' });
      return;
    }

    res.status(200).json({ success: true, status: 'ok' });
  } catch (error) {
    logger.error('Erreur fonction interne:', error);
    res.status(200).send('OK'); // 200 pour éviter retries Cloud Tasks
  }
});


