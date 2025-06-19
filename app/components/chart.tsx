import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Server,
  Globe,
  Download,
  BarChart3,
  Activity,
  Cloud,
  Database,
  Cpu,
} from "lucide-react";

type MetricCardProps = {
  title: string;
  value: number;
  unit: string;
  change: number;
  trend: "up" | "down";
  data: { year: number; value: number }[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  delay?: number;
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  trend,
  data,
  icon: Icon,
  delay = 0,
}) => {
  const [animated, setAnimated] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
      // Animate the number counting up
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCurrentValue(value);
          clearInterval(counter);
        } else {
          setCurrentValue(Math.floor(current));
        }
      }, duration / steps);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  interface FormatNumber {
    (num: number): string;
  }

  const formatNumber: FormatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="group relative bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-700/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-gray-300 text-sm font-medium mb-2 group-hover:text-gray-100 transition-colors duration-300">
        {title}
      </h3>

      {/* Value */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
          {animated ? formatNumber(currentValue) : "0"}
        </span>
        <span className="text-lg text-gray-400 font-medium">{unit}</span>
      </div>

      {/* Trend */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {change}%
        </div>
        <span className="text-xs text-gray-500">from 2019</span>
      </div>

      {/* Mini Chart */}
      <div className="relative h-12 mb-4">
        <div className="flex items-end justify-between h-full gap-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group/bar"
            >
              <div
                className={`w-full bg-gradient-to-t from-blue-400 to-purple-500 rounded-t transition-all duration-1000 hover:from-blue-500 hover:to-purple-600 ${
                  animated ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  height: animated ? `${(item.value / maxValue) * 100}%` : "0%",
                  transitionDelay: `${index * 100}ms`,
                }}
              ></div>
              <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-gray-200 hover:text-white rounded-xl transition-all duration-300 group-hover:shadow-lg">
        <Download className="w-4 h-4" />
        <span className="text-sm font-medium">Download data</span>
      </button>
    </div>
  );
};

const TechMetricsDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const metricsData: MetricCardProps[] = [
    {
      title: "Cloud Infrastructure Usage",
      value: 89425,
      unit: "GB/month",
      change: 34,
      trend: "up",
      icon: Cloud,
      data: [
        { year: 2019, value: 65200 },
        { year: 2020, value: 71800 },
        { year: 2021, value: 78300 },
        { year: 2022, value: 85100 },
        { year: 2023, value: 89425 },
      ],
    },
    {
      title: "API Response Time",
      value: 127,
      unit: "ms",
      change: 18,
      trend: "down",
      icon: Zap,
      data: [
        { year: 2019, value: 155 },
        { year: 2020, value: 148 },
        { year: 2021, value: 142 },
        { year: 2022, value: 134 },
        { year: 2023, value: 127 },
      ],
    },
    {
      title: "Active Users",
      value: 2840567,
      unit: "users",
      change: 67,
      trend: "up",
      icon: Users,
      data: [
        { year: 2019, value: 1700000 },
        { year: 2020, value: 2100000 },
        { year: 2021, value: 2350000 },
        { year: 2022, value: 2650000 },
        { year: 2023, value: 2840567 },
      ],
    },
    {
      title: "Data Processing",
      value: 156789,
      unit: "TB/day",
      change: 45,
      trend: "up",
      icon: Database,
      data: [
        { year: 2019, value: 108000 },
        { year: 2020, value: 125000 },
        { year: 2021, value: 138000 },
        { year: 2022, value: 147000 },
        { year: 2023, value: 156789 },
      ],
    },
    {
      title: "Server Uptime",
      value: 99.97,
      unit: "%",
      change: 0.3,
      trend: "up",
      icon: Server,
      data: [
        { year: 2019, value: 99.2 },
        { year: 2020, value: 99.5 },
        { year: 2021, value: 99.7 },
        { year: 2022, value: 99.8 },
        { year: 2023, value: 99.97 },
      ],
    },
    {
      title: "CPU Efficiency",
      value: 87.3,
      unit: "%",
      change: 12,
      trend: "up",
      icon: Cpu,
      data: [
        { year: 2019, value: 78.0 },
        { year: 2020, value: 81.2 },
        { year: 2021, value: 83.8 },
        { year: 2022, value: 85.9 },
        { year: 2023, value: 87.3 },
      ],
    },
    {
      title: "Global Reach",
      value: 147,
      unit: "countries",
      change: 23,
      trend: "up",
      icon: Globe,
      data: [
        { year: 2019, value: 119 },
        { year: 2020, value: 128 },
        { year: 2021, value: 135 },
        { year: 2022, value: 142 },
        { year: 2023, value: 147 },
      ],
    },
    {
      title: "System Performance",
      value: 94.8,
      unit: "score",
      change: 8,
      trend: "up",
      icon: Activity,
      data: [
        { year: 2019, value: 87.8 },
        { year: 2020, value: 89.4 },
        { year: 2021, value: 91.2 },
        { year: 2022, value: 93.1 },
        { year: 2023, value: 94.8 },
      ],
    },
    {
      title: "Data Analytics",
      value: 45892,
      unit: "insights/day",
      change: 56,
      trend: "up",
      icon: BarChart3,
      data: [
        { year: 2019, value: 29400 },
        { year: 2020, value: 34200 },
        { year: 2021, value: 38700 },
        { year: 2022, value: 42500 },
        { year: 2023, value: 45892 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black p-8">
      {/* Header */}
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            TechFlow Analytics
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Real-time performance metrics and insights for our cloud
          infrastructure, user engagement, and system optimization across global
          operations.
        </p>

        {/* Floating particles */}
        <div className="relative mt-8">
          <div
            className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {metricsData.map((metric, index) => (
          <MetricCard key={index} {...metric} delay={index * 150} />
        ))}
      </div>

      {/* Footer Stats */}
      <div
        className={`mt-20 text-center transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-8 p-6 bg-slate-800 border border-gray-700/50 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-200">50M+</div>
            <div className="text-sm text-gray-400">Requests/Day</div>
          </div>
          <div className="w-px h-8 bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-200">99.9%</div>
            <div className="text-sm text-gray-400">Reliability</div>
          </div>
          <div className="w-px h-8 bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-200">24/7</div>
            <div className="text-sm text-gray-400">Monitoring</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechMetricsDashboard;
