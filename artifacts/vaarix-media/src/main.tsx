import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

document.documentElement.classList.remove('dark');
document.documentElement.style.colorScheme = 'light';
try { localStorage.removeItem('vaarix-theme'); } catch { /* Storage may be disabled. */ }

createRoot(document.getElementById('root')!).render(<App />);
