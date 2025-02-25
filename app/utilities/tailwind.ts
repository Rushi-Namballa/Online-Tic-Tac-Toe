export default function merge(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
