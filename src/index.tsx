'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import {
  createKChart,
  type KChartConfiguration,
  type KChartController
} from '@keneth80/k-chart';

export type KChartReactProps<T = any> = Omit<KChartConfiguration<T>, 'selector' | 'className'> & {
  className?: string;
  style?: CSSProperties;
  chartClassName?: string;
  onReady?: (chart: KChartController<T>) => void;
};

export function KChart<T = any>({
  className,
  style,
  chartClassName,
  onReady,
  ...config
}: KChartReactProps<T>) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<KChartController<T> | null>(null);
  const rootClassName = ['kchart-react-root', className].filter(Boolean).join(' ');

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    chartRef.current?.destroy();
    chartRef.current = createKChart<T>({
      ...config,
      selector: rootRef.current,
      width: config.width ?? rootRef.current.clientWidth,
      height: config.height ?? rootRef.current.clientHeight,
      className: chartClassName
    }).render();

    onReady?.(chartRef.current);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [chartClassName, config, onReady]);

  useEffect(() => {
    if (!rootRef.current || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) {
        return;
      }

      chartRef.current?.resize({
        width: Math.max(rect.width, 320),
        height: Math.max(rect.height, 260)
      });
    });

    observer.observe(rootRef.current);

    return () => observer.disconnect();
  }, []);

  return <div ref={rootRef} className={rootClassName} style={style} />;
}

export type { KChartController };
