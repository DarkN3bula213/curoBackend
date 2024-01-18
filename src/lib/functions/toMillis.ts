export function toMillis(input: string | number): number | undefined {
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  if (typeof input === 'string') {
    if (input.includes('m') || input.includes('mins')) {
      return parseInt(input.replace('m', '').replace('mins', '')) * minute;
    }
    if (input.includes('h') || input.includes('hour')) {
      return parseInt(input.replace('h', '').replace('hour', '')) * hour;
    }
    if (input.includes('d') || input.includes('day')) {
      return parseInt(input.replace('d', '').replace('day', '')) * day;
    }
    if (input.includes('w') || input.includes('week')) {
      return parseInt(input.replace('w', '').replace('week', '')) * week;
    }
      
  }
  if (typeof input === 'number') {
    return input * minute;
  }
  return undefined;
}
