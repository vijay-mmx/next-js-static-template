"use client";
import React, { useEffect, useRef, useState } from "react";

type StatItem = {
  number: number;
  suffix?: string;
  labelTop: string;
  labelBottom: string;
};

const statsData: StatItem[] = [
  { number: 1990, suffix: "", labelTop: "Founding Year", labelBottom: "" },
  { number: 36, suffix: "", labelTop: "Years of Excellence", labelBottom: "" },
  { number: 8, suffix: "", labelTop: "", labelBottom: "Countries" },
  { number: 12, suffix: "k+", labelTop: "Dedicated Workforce", labelBottom: "" },
];

function useCountUp(
  target: number,
  duration: number = 2000,
  start: boolean = false,
  delay: number = 0
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const timer = setTimeout(() => {
      let startTime: number | null = null;

      const step = (ts: number) => {
        if (!startTime) startTime = ts;

        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(Math.floor(eased * target));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [start, target, duration, delay]);

  return count;
}

type StatCardProps = {
  item: StatItem;
  index: number;
  inView: boolean;
};

const StatCard = ({ item, index, inView }: StatCardProps) => {
  const count = useCountUp(item.number, 2000 + index * 200, inView, index * 150);
  return (
    <div className="statItem" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="statNumber">
        <span className="countValue">{inView ? count : 0}</span>
        {item.suffix && <span className="suffix">{item.suffix}</span>}
      </div>
      <div className="statLabel">
        <span className="labelTop">{item.labelTop}</span>
        <span className="labelBottom">{item.labelBottom}</span>
      </div>
      {index < statsData.length - 1 && <div className="divider" />}
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="inner">
        <div className="statsGrid">
          {statsData.map((item, index) => (
            <StatCard key={index} item={item} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;