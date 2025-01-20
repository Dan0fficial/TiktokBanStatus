const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Serve static files (Frontend)
app.use(express.static('public'));

// Route to check TikTok redirection
app.get('/check-tiktok', async (req, res) => {
  console.log('🚀 Checking TikTok redirection...');

  let browser;
  
  try {
    console.log('🟢 Launching Puppeteer...');
    
    // Launch Puppeteer in headless mode
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set a real user-agent to avoid bot detection
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    console.log(`🟡 Setting User-Agent: ${userAgent}`);
    await page.setUserAgent(userAgent);

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9' // Emulating a U.S.-based user
    });

    console.log('🌐 Navigating to TikTok...');
    
    // Navigate to TikTok
    await page.goto('https://www.tiktok.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Get the final URL after potential redirection
    const currentUrl = page.url();
    console.log(`🔍 Final URL: ${currentUrl}`);

    // Determine if redirection happened
    const redirected = currentUrl.includes('/us-landing');
    const statusMessage = redirected ? '❌ Tiktok is banned' : '✅ Tiktok is not banned';

    console.log(`🟢 Status: ${statusMessage}`);

    // Close browser
    await browser.close();

    // Return JSON response
    res.json({
      status: statusMessage,
      url: currentUrl,
      timestamp: new Date().toLocaleString()
    });

  } catch (error) {
    console.error('❌ ERROR: Checking TikTok failed:', error);

    // Return error response
    res.status(500).json({
      status: '⚠️ Error checking TikTok',
      error: error.message
    });

  } finally {
    if (browser) {
      console.log('📴 Closing browser...');
      await browser.close().catch(err => console.error('❌ Error closing browser:', err));
    }
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
