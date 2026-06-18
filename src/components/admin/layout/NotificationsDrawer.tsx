"use client";

import React, { useState } from "react";
import { X, Truck, AlertTriangle, UserPlus, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationItem {
  id: string;
  type: "dispatch" | "alert" | "partner" | "review";
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "dispatch",
      title: "Order dispatched",
      message: "Order #1835 is out for delivery via BlueDart to Mumbai.",
      time: "18 min ago",
      isUnread: true,
    },
    {
      id: "2",
      type: "alert",
      title: "Low stock alert",
      message: "Safawi Dates (500g) has only 8 units remaining.",
      time: "2 hr ago",
      isUnread: true,
    },
    {
      id: "3",
      type: "partner",
      title: "New partner registered",
      message: "Rahul Sharma applied for the affiliate program.",
      time: "5 hr ago",
      isUnread: true,
    },
    {
      id: "4",
      type: "review",
      title: "New review received",
      message: "Ajwa Dates (250g) received a 5-star review from Maryam.",
      time: "1 day ago",
      isUnread: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isUnread: false })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n)));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "dispatch":
        return <Truck size={18} className="text-[#4A5E28]" />;
      case "alert":
        return <AlertTriangle size={18} className="text-red-600" />;
      case "partner":
        return <UserPlus size={18} className="text-blue-600" />;
      case "review":
        return <Star size={18} className="text-amber-500" fill="currentColor" />;
    }
  };

  const getIconBg = (type: NotificationItem["type"]) => {
    switch (type) {
      case "dispatch":
        return "bg-brand-green-pale";
      case "alert":
        return "bg-red-50";
      case "partner":
        return "bg-blue-50";
      case "review":
        return "bg-amber-50";
    }
  };

  const getDotColor = (type: NotificationItem["type"]) => {
    switch (type) {
      case "dispatch":
        return "bg-[#768C3A]";
      case "alert":
        return "bg-red-500";
      case "partner":
        return "bg-blue-500";
      case "review":
        return "bg-amber-500";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 w-full max-w-[450px] bg-[#FDFAF3] z-[55] shadow-2xl flex flex-col select-none border-l border-[#F2EADA] font-poppins"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-[#5A3E2B]/15 bg-white">
              <div className="flex items-center gap-2.5">
                <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#3A2418]">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#5A3E2B] text-[11px] font-bold text-white leading-none">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="bg-white rounded-full w-10 h-10 shadow-sm border border-[#F2EADA] flex items-center justify-center text-[#3A2418] hover:bg-gray-50 focus:outline-none transition-all cursor-pointer"
                aria-label="Close notifications drawer"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-b border-gray-100/80">
              <span className="text-xs font-semibold text-gray-505 text-gray-500">
                {unreadCount} unread
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[#768C3A] hover:text-brand-green font-bold text-xs cursor-pointer focus:outline-none bg-transparent border-0"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm">
                  No notifications found
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleToggleRead(n.id)}
                    className={`flex gap-4 p-5 hover:bg-black/[0.01] transition-colors cursor-pointer relative ${
                      n.isUnread ? "bg-white" : "bg-white opacity-70"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(n.type)}`}
                    >
                      {getIcon(n.type)}
                    </div>

                    <div className="flex-1 text-left space-y-1 pr-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-brand-brown leading-tight">
                          {n.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#7D6B5E] leading-normal font-medium">
                        {n.message}
                      </p>
                      <span className="text-[10px] text-gray-400 block pt-0.5">{n.time}</span>
                    </div>

                    {n.isUnread && (
                      <div className="absolute right-6 top-6 flex items-center justify-center">
                        <span className={`w-2.5 h-2.5 rounded-full ${getDotColor(n.type)}`} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-white">
              <button
                onClick={onClose}
                className="w-full bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3] py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDrawer;
