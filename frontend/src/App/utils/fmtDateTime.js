export default function fmtDateTime (datetime) {
  const date = new Date(datetime)

  const dd = date.getDate().toString().padStart(2, '0')
  const mm = date.getMonth().toString().padStart(2, '0')
  const yyyy = date.getFullYear().toString().padStart(4, '0')
  const hh = date.getHours().toString().padStart(2, '0')
  const MM = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  return `${dd}.${mm}.${yyyy} ${hh}:${MM}:${ss}`
}
