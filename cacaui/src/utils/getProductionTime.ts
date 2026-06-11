export function getProductionTime(
  totalBombons: number
) {
  if (totalBombons <= 20) {
    return "2 dias úteis";
  }

  if (totalBombons <= 50) {
    return "4 dias úteis";
  }

  if (totalBombons <= 100) {
    return "7 dias úteis";
  }

  return "Prazo sob consulta";
}