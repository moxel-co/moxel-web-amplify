import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="bg-dark min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-white opacity-60 hover:opacity-80 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">About Moxel</h1>
        
        <div className="space-y-6 opacity-80">
          <p>
            Moxel is at the forefront of creating immersive 3D product experiences 
            that revolutionize how customers interact with products online.
          </p>
          
          <p>
            Our mission is to bridge the gap between physical and digital shopping 
            experiences by providing cutting-edge 3D visualization and configuration 
            tools that help businesses showcase their products in the most engaging way possible.
          </p>
          
          <p>
            With our expertise in 3D modeling, web development, and user experience design, 
            we create custom solutions that increase engagement, boost conversion rates, 
            and provide valuable insights into customer preferences.
          </p>
        </div>
      </div>
    </div>
  );
}