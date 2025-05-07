import React from 'react';
import { Link } from 'react-router-dom';

export const Terms = () => {
  return (
    <div className="bg-dark min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-white opacity-60 hover:opacity-80 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
        
        <div className="space-y-6 opacity-80">
          <p>
            By accessing and using this website, you accept and agree to be bound by the 
            terms and provision of this agreement.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Website Use</h2>
          <p>
            You agree to use the website for lawful purposes and in a way that does not 
            infringe the rights of, restrict or inhibit anyone else's use and enjoyment 
            of the website.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content included on this website, such as text, graphics, logos, images, 
            and software, is the property of Moxel or its content suppliers and protected 
            by international copyright laws.
          </p>
        </div>
      </div>
    </div>
  );
}