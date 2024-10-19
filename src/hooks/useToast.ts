import { useState } from 'react';

type ToastMessage = {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
};

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const showToast = (
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
  ) => {
    setToastMessage({ severity, summary, detail });
  };

  return { toastMessage, showToast };
};