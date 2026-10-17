import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function AnnouncementBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(() => sessionStorage.getItem('blushify-announcement-dismissed') !== 'true');
  if (!visible) return null;
  return <div className="announcement-bar" role="status">{t('announcement.freeShipping')} <button type="button" aria-label={t('announcement.dismiss')} onClick={() => { sessionStorage.setItem('blushify-announcement-dismissed', 'true'); setVisible(false); }}>×</button></div>;
}
