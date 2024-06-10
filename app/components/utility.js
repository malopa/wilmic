export const formatNumber = (number)=>{
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(
    number,
  )
}
