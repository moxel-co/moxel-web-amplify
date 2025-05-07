import React from 'react';
import { Link } from 'react-router-dom';

export const Privacy = () => {
  return (
    <div className="bg-dark min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-white opacity-60 hover:opacity-80 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 opacity-80">
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide to us when you use our contact form, 
            including your name and email address.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to:
            - Respond to your inquiries
            - Improve our services
            - Send you updates about our products and services
          </p>
        </div>
      </div>
    </div>
  );
}