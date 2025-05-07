import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { Desktop } from './screens/Desktop';
import { About } from './screens/About/About';
import { Privacy } from './screens/Privacy/Privacy';
import { Terms } from './screens/Terms/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="moxelCookieConsent"
        style={{ background: "rgba(43, 55, 59, 0.5)" }}
        buttonStyle={{ background: "#ffffff", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </BrowserRouter>
  );
}