/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

export default function AnimatedTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-6 py-2.5 sm:w-28 md:w-36 lg:w-64 xl:w-80 hover:bg-slate-300 hover:duration-300 text-base font-normal text-bg_black transition focus-visible:outline-2 ${
            activeTab === tab.id ? "bg-bg_yellow font-semibold" : ""
          }`}
          style={{
            borderBottom:
              activeTab === tab.id ? "3px solid #3D80B3" : "1px solid #DCDCDC",
            color: activeTab === tab.id ? "#3D80B3" : "",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
