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
      style={{ width: '100%', height: 420 }}
    />
  );
}
```

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
