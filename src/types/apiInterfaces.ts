export interface IStockPlotData {
  price: number | string;
  time: number | string;
}

export interface IRealTimeStockData {
  p: number
  s: string,
  t: number,
  v: number
}

export interface IStockQuoteData {
  c: number,
  h: number,
  l: number,
  o: number,
  pc: number,
  t: number,
}