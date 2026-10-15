import { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('blushify-announcement-dismissed') !== 'true');
  if (!visible) return null;
  return <div className="announcement-bar" role="status">Free shipping on orders over $50 <button type="button" aria-label="Dismiss announcement" onClick={() => { sessionStorage.setItem('blushify-announcement-dismissed', 'true'); setVisible(false); }}>×</button></div>;
}
