import { forwardRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';

interface ToastNotificationProps {
  message?: {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail: string;
  };
}

const ToastNotification = forwardRef<Toast | null, ToastNotificationProps>(({ message }, ref) => {
  
  useEffect(() => {
    if (message && ref && typeof ref !== 'function') {
      ref?.current?.show({
        severity: message.severity,
        summary: message.summary,
        detail: message.detail,
        life: 3000, 
      });
    }
  }, [message, ref]);

  return <Toast ref={ref} className="responsive-toast" />;
});

export default ToastNotification;
