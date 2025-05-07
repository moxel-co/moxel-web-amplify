import React, { useState, useEffect, useRef } from "react";
import "./Desktop.css";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MenuIcon,
  X
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

// import { API } from '@aws-amplify/api'
import { generateClient } from "aws-amplify/api";

const client = generateClient();
import { createCandidate } from '../../graphql/mutations'

export const Desktop = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    enquiretype: "General Enquiry",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for sections that will fade in
  const valuePropositionRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    // Observe all elements with fade-in class
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const name = formData.name;
    const email = formData.email;
    const message = formData.message;
    const enquiretype = formData.enquiretype;

    try {
      await client.graphql({
        query: createCandidate,
        variables: {
          input: {
            name,
            email,
            enquiretype,
            message,
          },
        },
      });

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully!',
      });
      setFormData({ name: "", email: "", message: "", enquiretype: "General Enquiry" });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlay = (index: number) => {
    setPlayingIndex(index);
  };

  const navItems = ["Home", "About Us", "Contact"];
  const workItems = [
    { title: "Guitar", type: "PRODUCT CONFIGURATOR", thumbnail: "./thumbnails/car.jpg" },
    { title: "Car", type: "PRODUCT CONFIGURATOR", thumbnail: "./thumbnails/car.jpg" },
    { title: "Shirt", type: "PRODUCT CONFIGURATOR", thumbnail: "./thumbnails/car.jpg" },
  ];
  const footerLinks = ["PRIVACY POLICY", "TERMS OF USE"];
  const socialIcons = [
    {
      icon: <FacebookIcon className="w-12 h-12 text-white" />,
      alt: "Facebook",
      link: "https://www.facebook.com/moxelco",
    },
    {
      icon: <InstagramIcon className="w-12 h-12 text-white" />,
      alt: "Instagram",
      link: "https://www.instagram.com/moxelco",
    },
    {
      icon: <LinkedinIcon className="w-12 h-12 text-white" />,
      alt: "LinkedIn",
      link: "https://www.linkedin.com/company/moxelco/",
    },
  ];

  return (
    <div className="bg-dark flex-center w-full">
      <div className="bg-dark overflow-hidden w-full max-w-1440 relative">
        {/* Hero Section */}
        <section className="hero-section">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23D9D9D9'/%3E%3C/svg%3E"
          >
            <source src="./video-bg.mp4" type="video/mp4" />
          </video>

          <header className="hero-header">
            <div className="hero-header-container">
              <div className="logo-container">
                <img
                  src="./moxel_wordmark_white_h_320x132.png"
                  alt="Moxel Logo"
                  className="logo-image"
                />
              </div>

              <button 
                className="mobile-menu-button md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-white" />
                )}
              </button>

              <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
                {navItems.map((item, index) => (
                  <div key={index} className="nav-item">
                    {item === "Home" && (
                      <a href="/" className="nav-item-text">
                        {item}
                      </a>
                    )}
                    {item === "About Us" && (
                      <a href="/about" className="nav-item-text">
                        {item}
                      </a>
                    )}
                    {item === "Contact" && (
                      <a href="#contact-form" className="nav-item-text">
                        {item}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </header>
        </section>

        {/* Main Content Section */}
        <section className="main-content">
          {/* Value Proposition */}
          <div ref={valuePropositionRef} className="value-proposition fade-in">
            <div className="value-proposition-title">
              Tailoring Your Immersive 3d Product Experience
            </div>

            <div className="value-proposition-subtitle">
              We want to build an impactful application — with you, for your customers.
            </div>

            <div className="value-proposition-description">
              Increase engagement and conversion rate with your audience by letting
              your customers explore, customise and connect with your products with a
              fun, visually stunning experience.
            </div>
          </div>

          {/* Our Works Section */}
          <div ref={worksRef} className="works-section fade-in">
            <h2 className="works-title">OUR WORKS</h2>

            <div className="works-grid">
              {workItems.map((item, index) => (
                <div key={index} className="work-item fade-in">
                  <div className="work-item-image">
                    <video
                      className="work-item-video"
                      poster={item.thumbnail}
                      muted
                      loop
                      playsInline
                      ref={(video) => {
                        if (video && index === playingIndex) {
                          video.play();
                        } else if (video) {
                          video.pause();
                        }
                      }}
                    >
                      <source src="./video-bg.mp4" type="video/mp4" />
                    </video>
                    {playingIndex !== index && (
                      <div
                        className="play-button-overlay"
                        onClick={() => setPlayingIndex(index)}
                      >
                        ▶
                      </div>
                    )}
                    {playingIndex === index && (
                      <div
                        className="pause-button-overlay"
                        onClick={() => setPlayingIndex(null)}
                      >
                        ❚❚
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center w-full py-4">
                    <div className="work-item-title">{item.title}</div>
                    <div className="work-item-type">{item.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section ref={contactRef} id="contact-form" className="contact-section fade-in">
          <h2 className="contact-title">CONTACT US</h2>

          <Card className="contact-card">
            <CardContent className="contact-card-content">
              <div className="contact-info">
                <div className="contact-header">
                  <h3 className="contact-subtitle">Let's Chat</h3>
                  <p className="contact-description">
                    Talk to us to find out how we can build something special
                    for you to engage your customer in a new, special way.
                    <br />
                    <br />
                    Feel free to reach out to us on our socials as well, if
                    you prefer to start the conversation that way.
                  </p>
                </div>

                <div className="social-icons">
                  {socialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label={social.alt}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <Input
                  className="contact-input"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  className="contact-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <select
                  className="contact-input"
                  name="enquiretype"
                  value={formData.enquiretype || "General Enquiry"}
                  onChange={handleChange}
                  required
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Demo Request">Demo Request</option>
                </select>

                <Textarea
                  className="contact-textarea"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                {submitStatus.type && (
                  <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}

                <Button 
                  className="submit-button" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="submit-button-text">
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-links">
              {footerLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link === "PRIVACY POLICY" ? "/privacy" : "/terms"} 
                  className="footer-link-item"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="footer-copyright">
              © 2025 MOXEL PTE LTD ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};