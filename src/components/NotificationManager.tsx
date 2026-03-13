import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  url?: string;
}

export const NotificationManager: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  );
  const [toasts, setToasts] = useState<Notification[]>([]);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      addToast('Erro', 'Este navegador não suporta notificações desktop.', 'warning');
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted') {
      addToast('Sucesso', 'Notificações ativadas com sucesso!', 'success');
      new Notification('TechSteps', {
        body: 'Você agora receberá alertas de novas vagas!',
        icon: '/favicon.ico'
      });
    }
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info', url?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, url }]);
    setTimeout(() => {
      removeToast(id);
    }, 8000); // Increased time for user to click
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Expose addToast to window for global access (simple way for this demo)
  useEffect(() => {
    (window as any).showTechStepsNotification = addToast;
  }, []);

  return (
    <>
      {/* Permission Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={permission === 'granted' ? undefined : requestPermission}
          className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all active:scale-95 ${
            permission === 'granted'
              ? 'bg-zinc-900 border border-zinc-800 text-emerald-500 cursor-default'
              : 'bg-emerald-500 text-black hover:bg-emerald-400'
          }`}
          title={permission === 'granted' ? 'Notificações Ativas' : 'Ativar Notificações'}
        >
          {permission === 'granted' ? <Bell size={24} /> : <BellOff size={24} />}
          <span className="font-bold text-sm hidden md:block">
            {permission === 'granted' ? 'Alertas Ativos' : 'Me avisar de novas vagas'}
          </span>
        </button>
      </div>

      {/* Toast Container */}
      <div className="fixed top-24 right-6 z-[60] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl pointer-events-auto flex gap-4 items-start"
            >
              <div className={`p-2 rounded-xl ${
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                toast.type === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                'bg-blue-500/20 text-blue-500'
              }`}>
                {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              </div>
              <div className="flex-grow">
                <h4 className="text-zinc-100 font-bold text-sm">{toast.title}</h4>
                <p className="text-zinc-500 text-xs mt-1">{toast.message}</p>
                {toast.url && (
                  <a
                    href={toast.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-emerald-500 text-xs font-bold hover:text-emerald-400 transition-colors underline underline-offset-2"
                  >
                    Ver Vaga →
                  </a>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
