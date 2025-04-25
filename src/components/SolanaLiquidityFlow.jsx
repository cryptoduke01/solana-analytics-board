import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { motion } from 'framer-motion';

const SolanaLiquidityFlow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const monthlyTxData = [
    { month: 'Jan', DEXs: 6.2, Staking: 2.1, Meme: 1.0, RWAs: 0.4, Lending: 1.2 },
    { month: 'Feb', DEXs: 6.5, Staking: 2.3, Meme: 1.5, RWAs: 0.5, Lending: 1.3 },
    { month: 'Mar', DEXs: 7.0, Staking: 2.4, Meme: 3.2, RWAs: 0.7, Lending: 1.4 },
    { month: 'Apr', DEXs: 7.2, Staking: 2.5, Meme: 4.1, RWAs: 0.8, Lending: 1.6 },
    { month: 'May', DEXs: 7.5, Staking: 2.6, Meme: 4.8, RWAs: 1.0, Lending: 1.7 },
    { month: 'Jun', DEXs: 8.0, Staking: 2.7, Meme: 3.5, RWAs: 1.2, Lending: 1.8 },
    { month: 'Jul', DEXs: 8.3, Staking: 2.8, Meme: 5.5, RWAs: 1.5, Lending: 1.9 },
    { month: 'Aug', DEXs: 8.8, Staking: 3.0, Meme: 6.2, RWAs: 1.8, Lending: 2.1 },
    { month: 'Sep', DEXs: 9.2, Staking: 3.2, Meme: 7.0, RWAs: 2.0, Lending: 2.3 },
    { month: 'Oct', DEXs: 9.8, Staking: 3.4, Meme: 8.2, RWAs: 2.5, Lending: 2.5 },
  ];

  const stablecoinData = [
    { subject: 'USDC Usage', DEXs: 95, Staking: 60, Meme: 85, RWAs: 90, Lending: 95 },
    { subject: 'PYUSD Usage', DEXs: 70, Staking: 40, Meme: 60, RWAs: 85, Lending: 75 },
    { subject: 'USDT Usage', DEXs: 85, Staking: 50, Meme: 80, RWAs: 70, Lending: 80 },
    { subject: 'Other Stablecoins', DEXs: 50, Staking: 30, Meme: 45, RWAs: 60, Lending: 65 },
    { subject: 'Non-Stablecoin', DEXs: 75, Staking: 90, Meme: 95, RWAs: 50, Lending: 70 },
  ];

  const whaleActivityData = [
    { month: 'Jan', DEXs: 25, Staking: 40, Meme: 10, RWAs: 15, Lending: 35 },
    { month: 'Feb', DEXs: 30, Staking: 45, Meme: 15, RWAs: 15, Lending: 35 },
    { month: 'Mar', DEXs: 35, Staking: 45, Meme: 40, RWAs: 20, Lending: 35 },
    { month: 'Apr', DEXs: 40, Staking: 50, Meme: 60, RWAs: 20, Lending: 40 },
    { month: 'May', DEXs: 45, Staking: 50, Meme: 75, RWAs: 25, Lending: 40 },
    { month: 'Jun', DEXs: 50, Staking: 55, Meme: 55, RWAs: 30, Lending: 45 },
    { month: 'Jul', DEXs: 55, Staking: 55, Meme: 80, RWAs: 35, Lending: 45 },
    { month: 'Aug', DEXs: 60, Staking: 60, Meme: 85, RWAs: 40, Lending: 50 },
    { month: 'Sep', DEXs: 65, Staking: 65, Meme: 90, RWAs: 45, Lending: 55 },
    { month: 'Oct', DEXs: 70, Staking: 70, Meme: 95, RWAs: 50, Lending: 60 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-500/30 backdrop-blur-md">
          <p className="text-blue-300 font-bold">{label}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.name}: {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Monthly Transaction Volume AreaChart */}
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-blue-500/20 backdrop-blur"
        variants={itemVariants}
      >
        <h2 className="text-xl text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Monthly Transaction Volume by Sector ($B)
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="month" stroke="#CBD5E0" />
              <YAxis stroke="#CBD5E0" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="DEXs" stackId="1" stroke="#63b3ed" fill="#63b3ed" />
              <Area type="monotone" dataKey="Staking" stackId="1" stroke="#48bb78" fill="#48bb78" />
              <Area type="monotone" dataKey="Meme" stackId="1" stroke="#f56565" fill="#f56565" />
              <Area type="monotone" dataKey="RWAs" stackId="1" stroke="#ed8936" fill="#ed8936" />
              <Area type="monotone" dataKey="Lending" stackId="1" stroke="#9f7aea" fill="#9f7aea" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Stablecoin Usage RadarChart */}
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-blue-500/20 backdrop-blur"
        variants={itemVariants}
      >
        <h2 className="text-xl text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
          Stablecoin Usage by Sector (%)
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={stablecoinData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" stroke="#CBD5E0" />
            <PolarRadiusAxis stroke="#CBD5E0" />
            <Radar name="DEXs" dataKey="DEXs" stroke="#63b3ed" fill="#63b3ed" fillOpacity={0.6} />
            <Radar name="Staking" dataKey="Staking" stroke="#48bb78" fill="#48bb78" fillOpacity={0.6} />
            <Radar name="Meme" dataKey="Meme" stroke="#f56565" fill="#f56565" fillOpacity={0.6} />
            <Radar name="RWAs" dataKey="RWAs" stroke="#ed8936" fill="#ed8936" fillOpacity={0.6} />
            <Radar name="Lending" dataKey="Lending" stroke="#9f7aea" fill="#9f7aea" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Whale Activity LineChart */}
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-blue-500/20 backdrop-blur"
        variants={itemVariants}
      >
        <h2 className="text-xl text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
          Whale Activity Over Time
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={whaleActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="month" stroke="#CBD5E0" />
              <YAxis stroke="#CBD5E0" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="DEXs" stroke="#63b3ed" />
              <Line type="monotone" dataKey="Staking" stroke="#48bb78" />
              <Line type="monotone" dataKey="Meme" stroke="#f56565" />
              <Line type="monotone" dataKey="RWAs" stroke="#ed8936" />
              <Line type="monotone" dataKey="Lending" stroke="#9f7aea" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SolanaLiquidityFlow;
