const express = require('express');
const cron = require('node-cron');
const app = express();

// Your other routes and middleware...
app.get('/', (req, res) => {
  res.send('Server is running!');
  });

  // Schedule notifications (runs in the background)
  cron.schedule('0 15 * * 6', () => { // Saturday 3 PM
    console.log('Sending Saturday notification...');
      // Call your notification function here (e.g., Firebase FCM, email, etc.)
      });

      cron.schedule('0 14 * * 0', () => { // Sunday 2 PM
        console.log('Sending Sunday notification...');
        });

        cron.schedule('0 13 * * 3', () => { // Wednesday 1 PM
          console.log('Sending Wednesday notification...');
          });

          // Start the server
          app.listen(3000, () => {
            console.log('Server running on port 3000');
            });