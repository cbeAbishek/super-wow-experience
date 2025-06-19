"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

interface NotificationToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "info" | "warning" | "error";
}

export default function NotificationToast({
  show,
  onClose,
  message,
  type = "success",
}: NotificationToastProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-400" size={20} />;
      default:
        return <CheckCircle className="text-blue-400" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30";
      default:
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-6 right-6 z-50 pointer-events-none"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`bg-gradient-to-r ${getBgColor()} backdrop-blur-md p-4 rounded-xl border max-w-sm pointer-events-auto`}
          >
            <div className="flex items-center gap-3">
              {getIcon()}
              <p className="text-white flex-1">{message}</p>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
                data-interactive
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
