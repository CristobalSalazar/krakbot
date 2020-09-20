import fs from "fs";
import color from "cli-color";

export default class Logger {
  private getTimestamps(): [console: string, file: string] {
    const str = `[${new Date().toLocaleString()}]`;
    return [color.whiteBright(str), str];
  }

  amountfmt(msg: string) {
    return color.yellowBright(msg);
  }

  coinfmt(coin: string) {
    return color.bold(color.cyan(coin));
  }

  logFile(msg: string) {
    fs.appendFileSync("./krakbot.log", msg + "\n");
  }

  info(msg: string) {
    // console timestamp file timestamp
    const [cts, fts] = this.getTimestamps();
    const log = `${cts} ${color.cyanBright("INFO")} ${msg}`;
    const file = `${fts} INFO ${msg}`;
    this.logFile(file);
    console.log(log);
  }

  intro() {
    const banner = fs.readFileSync("./banner.txt");
    console.log(color.yellowBright(banner.toString()));
  }

  buyThreshold(amount: number) {
    const [cts, fts] = this.getTimestamps();
    const log = `${cts} ${color.cyanBright("BUY THRESHOLD")} = ${this.amountfmt(
      amount.toString() + "%"
    )}`;
    const file = `${fts} BUY THRESHOLD = ${amount.toString()}%`;
    console.log(log);
    this.logFile(file);
  }

  balance(amount: number) {
    const [cts, fts] = this.getTimestamps();
    const log = `${cts} ${color.yellowBright("BALANCE")} = ${this.amountfmt(
      amount.toString()
    )}`;
    console.log(log);
    this.logFile(`${fts} BALANCE = ${amount}`);
  }

  buy(amount: number, coin: string, price: number) {
    const [cts, fts] = this.getTimestamps();
    const log = `${cts} ${color.greenBright("BUY")} ${amount} ${this.coinfmt(
      coin.toUpperCase()
    )} @ ${this.amountfmt(price.toString())}`;
    const file = `${fts} BUY ${coin.toUpperCase()} @ ${price}`;
    this.logFile(file);
    console.log(log);
  }

  sell(amount: number, coin: string, price: number) {
    const [cts, fts] = this.getTimestamps();
    const log = `${cts} ${color.redBright("SELL")} ${amount} ${this.coinfmt(
      coin.toUpperCase()
    )} @ ${this.amountfmt(price.toString())}`;
    const file = `${fts} SELL ${coin.toUpperCase()} @ ${price}`;
    this.logFile(file);
    console.log(log);
  }

  error(msg: string) {
    const [cts, fts] = this.getTimestamps();
    const log = `${cts} ${color.redBright("ERROR:")} ${msg}`;
    const file = `${fts} ERROR: ${msg}`;
    this.logFile(file);
    console.log(log);
  }
}
