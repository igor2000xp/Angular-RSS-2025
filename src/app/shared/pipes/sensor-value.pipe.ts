import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sensorValue',
  standalone: true,
})
export class SensorValuePipe implements PipeTransform {
  transform(value: { amount: number; unit: string }): string {
    if (!value) return '';

    // Special handling for certain units
    if (value.unit === '°C') {
      return `${value.amount.toFixed(1)}${value.unit}`;
    } else if (value.unit === '%') {
      return `${value.amount.toFixed(1)}${value.unit}`;
    } else if (value.unit === 'clear') {
      return 'Clear';
    } else if (value.unit === 'detected') {
      return 'Motion Detected';
    }

    return `${value.amount} ${value.unit}`;
  }
}
