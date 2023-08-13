export const EPSILON = 10e-6;

export type Maybe<T> = T | null | undefined;

export function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function removeElementFromArray<T>(arrayLike: Array<T>, element: T) {
  const index = arrayLike.indexOf(element);
  if (index > -1) arrayLike.splice(index, 1);

  return arrayLike;
}

export function pickElementFromArray(arrayLike: Array<any>) {
  const length = Array.isArray(arrayLike) ? arrayLike.length : 0;
  return length ? arrayLike[Math.floor(Math.random() * length)] : undefined;
}
