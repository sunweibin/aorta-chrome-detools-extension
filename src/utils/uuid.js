let id = 0;

export default function uuid() {
  const stamp = (new Date()).getTime();
  return `${stamp}_${id++}`;
}
