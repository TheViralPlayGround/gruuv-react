import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Privacy Policy for Gruuv</h1>
      <p><strong>Last updated: October 25, 2025</strong></p>

      <h2>Introduction</h2>
      <p>Gruuv ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.</p>

      <h2>Information We Collect</h2>
      
      <h3>Personal Information</h3>
      <ul>
        <li><strong>Email Address</strong>: Used for account creation and authentication</li>
        <li><strong>Password</strong>: Encrypted and stored securely for account access</li>
      </ul>

      <h3>Usage Data</h3>
      <ul>
        <li><strong>Achievement Data</strong>: Your personal goals, descriptions, and effort tracking</li>
        <li><strong>Progress Data</strong>: Daily effort levels and progress history</li>
        <li><strong>App Usage</strong>: How you interact with the app features</li>
      </ul>

      <h3>Technical Information</h3>
      <ul>
        <li><strong>Device Information</strong>: Device type, operating system version</li>
        <li><strong>App Performance</strong>: Crash reports and performance metrics</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and maintain the Gruuv service</li>
        <li>Authenticate your account and secure your data</li>
        <li>Sync your data across devices</li>
        <li>Improve app performance and user experience</li>
        <li>Provide customer support</li>
      </ul>

      <h2>Data Storage and Security</h2>
      <ul>
        <li>Your data is stored securely using Firebase (Google Cloud Platform)</li>
        <li>All data is encrypted in transit and at rest</li>
        <li>We use industry-standard security measures to protect your information</li>
        <li>Your password is hashed and never stored in plain text</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>We do not sell, trade, or share your personal information with third parties, except:</p>
      <ul>
        <li><strong>Firebase/Google</strong>: For data storage and authentication services</li>
        <li><strong>Legal Requirements</strong>: When required by law or to protect our rights</li>
      </ul>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Delete your account and data</li>
        <li>Export your data</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2>Data Retention</h2>
      <p>We retain your data for as long as your account is active. You can delete your account at any time, which will permanently remove all your data.</p>

      <h2>Children's Privacy</h2>
      <p>Gruuv is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>

      <h2>Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the app.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <ul>
        <li>Email: support@gruuv.app</li>
        <li>Website: https://gruuv.vercel.app</li>
      </ul>

      <h2>Compliance</h2>
      <p>This Privacy Policy complies with:</p>
      <ul>
        <li>Google Play Store requirements</li>
        <li>General Data Protection Regulation (GDPR)</li>
        <li>California Consumer Privacy Act (CCPA)</li>
        <li>Children's Online Privacy Protection Act (COPPA)</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
