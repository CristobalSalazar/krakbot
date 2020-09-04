export default interface IAssetPair {
  altname: string;
  wsname: string;
  aclass_base: string;
  base: string;
  aclass_quote: string;
  quote: string;
  lot: string;
  pair_decimals: number;
  lot_decimals: number;
  lot_multiplier: number;
  leverage_buy: number[];
  leverage_sell: number[];
  fees: [string[]];
  fees_maker: [string[]];
  fee_volume_currency: string;
  margin_call: number;
  margin_stop: number;
  ordermin: string;
}
