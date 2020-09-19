import fs from "fs";
import color from "cli-color";

export default class Logger {
  private getTimestamp() {
    return `[${new Date().toLocaleString()}]`;
  }

  coinFormat(msg: string) {
    return color.yellowBright(msg);
  }

  logFile(msg: string) {
    fs.appendFileSync("./krakbot.log", msg + "\n");
  }

  info(msg: string) {
    const ts = this.getTimestamp();
    const log = `${color.blueBright(ts)} ${color.cyanBright("INFO")} ${msg}`;
    const file = `${ts} INFO: ${msg}`;
    this.logFile(file);
    console.log(log);
  }

  balance(amount: number) {
    const ts = this.getTimestamp();
    const log = `${color.blueBright(ts)} BALANCE ${this.coinFormat(
      amount.toString()
    )}`;
    console.log(log);
    this.logFile(`${ts} BALANCE ${amount}`);
  }

  buy(amount: number, coin: string, price: number) {
    const ts = this.getTimestamp();
    const log = `${color.blueBright(ts)} ${color.greenBright(
      "BUY"
    )} ${amount} ${coin.toUpperCase()} @ ${this.coinFormat(price.toString())}`;
    const file = `${ts} BUY ${coin.toUpperCase()} @ ${price}`;
    this.logFile(file);
    console.log(log);
  }

  sell(amount: number, coin: string, price: number) {
    const ts = this.getTimestamp();
    const log = `${color.blueBright(ts)} ${color.redBright(
      "SELL"
    )} ${amount} ${coin.toUpperCase()} @ ${this.coinFormat(price.toString())}`;
    const file = `${ts} SELL ${coin.toUpperCase()} @ ${price}`;
    this.logFile(file);
    console.log(log);
  }

  error(msg: string) {
    const ts = this.getTimestamp();
    const log = `${color.bgBlueBright(ts)} ${color.redBright("ERROR:")} ${msg}`;
    const file = `${ts} ERROR: ${msg}`;
    this.logFile(file);
    console.log(log);
  }
}
