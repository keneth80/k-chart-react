# KChart React

React wrapper component for [`@keneth80/k-chart`](https://github.com/keneth80/k-chart).

## Install

```bash
npm install @keneth80/k-chart @keneth80/k-chart-react
```

`react` and `react-dom` are peer dependencies.

## Usage

```tsx
'use client';

import { useMemo } from 'react';
import { createLineSeries } from '@keneth80/k-chart';
import { KChart } from '@keneth80/k-chart-react';

type Point = {
  x: number;
  value: number;
  volume: number;
};

export function DashboardChart({ data }: { data: Point[] }) {
  const series = useMemo(() => [
    createLineSeries<Point>({
      selector: 'value',
      displayName: 'Value',
      xField: 'x',
      yField: 'value',
      color: '#5db8ff',
      curve: true
    }),
    createLineSeries<Point>({
      selector: 'volume',
      displayName: 'Volume',
      xField: 'x',
      yField: 'volume',
      color: '#56d08f',
      curve: true
    })
  ], []);

  return (
    <KChart<Point>
      data={data}
      axes={[
        { field: 'x', type: 'number', placement: 'bottom', title: 'Index' },
        { field: 'value', type: 'number', placement: 'left', title: 'Value' }
      ]}
      series={series}
      grid={{ visible: true, y: true }}
      legend={{ visible: true, placement: 'top', selectable: true }}
      tooltip={{ visible: true }}
      zoom={{
        enabled: true,
        mode: 'both',
        direction: 'x',
        resetOnDoubleClick: true
      }}
      style={{ width: '100%', height: 420 }}
    />
  );
}
```

## Zoom

`@keneth80/k-chart-react@0.2.0` targets `@keneth80/k-chart@1.3.0` and supports the chart-level zoom API.

```tsx
<KChart<Point>
  data={data}
  axes={[
    { field: 'x', type: 'number', placement: 'bottom' },
    { field: 'value', type: 'number', placement: 'left' }
  ]}
  series={series}
  zoom={{
    enabled: true,
    mode: 'both',
    direction: 'x',
    scaleExtent: [1, 80],
    resetOnDoubleClick: true
  }}
/>
```

- `mode: 'wheel'`: wheel/trackpad zoom and drag pan.
- `mode: 'select'`: drag-selection zoom.
- `mode: 'both'`: wheel/trackpad zoom and drag-selection zoom.

## Props

`KChart` accepts the same configuration as `createKChart`, except `selector`.

Additional React-only props:

- `className`: class name for the root div.
- `style`: style for the root div.
- `chartClassName`: class name passed to the KChart container configuration.
- `onReady`: callback called with the `KChartController` after render.

## Next.js

KChart touches the DOM, so use this component from a Client Component. If your Next.js app needs package transpilation, add:

```js
const nextConfig = {
  transpilePackages: ['@keneth80/k-chart', '@keneth80/k-chart-react']
};

export default nextConfig;
```

## Development

```bash
npm install
npm run typecheck
npm run build
```
