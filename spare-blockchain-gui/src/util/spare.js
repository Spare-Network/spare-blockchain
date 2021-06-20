const Big = require('big.js');
const units = require('./units');

// TODO: use bigint instead of float
const convert = (amount, from, to) => {
  if (Number.isNaN(Number.parseFloat(amount)) || !Number.isFinite(amount)) {
    return 0;
  }

  const amountInFromUnit = Big(amount).times(units.getUnit(from));

  return Number.parseFloat(amountInFromUnit.div(units.getUnit(to)));
};

class Spare {
  constructor(value, unit) {
    this._value = value;
    this._unit = unit;
  }

  to(newUnit) {
    this._value = convert(this._value, this._unit, newUnit);
    this._unit = newUnit;

    return this;
  }

  value() {
    return this._value;
  }

  format() {
    const displayUnit = units.getDisplay(this._unit);

    const { format, fractionDigits, trailing } = displayUnit;

    let options = { maximumFractionDigits: fractionDigits };

    if (trailing) {
      options = { minimumFractionDigits: fractionDigits };
    }

    let value;

    if (fractionDigits !== undefined) {
      const fractionPower = Big(10).pow(fractionDigits);
      value = Number.parseFloat(
        Big(Math.floor(Big(this._value).times(fractionPower))).div(
          fractionPower,
        ),
      );
    } else {
      value = this._value;
    }

    let formatted = format.replace(
      '{amount}',
      Number.parseFloat(value).toLocaleString(undefined, options),
    );

    if (displayUnit.pluralize && this._value !== 1) {
      formatted += 's';
    }

    return formatted;
  }

  toString() {
    const displayUnit = units.getDisplay(this._unit);
    const { fractionDigits } = displayUnit;
    const options = { maximumFractionDigits: fractionDigits };
    return Number.parseFloat(this._value).toLocaleString(undefined, options);
  }
}

export const spare_formatter = (value, unit) => new Spare(value, unit);

spare_formatter.convert = convert;
spare_formatter.setDisplay = units.setDisplay;
spare_formatter.setUnit = units.setUnit;
spare_formatter.getUnit = units.getUnit;
spare_formatter.setFiat = (currency, rate, display = null) => {
  units.setUnit(currency, 1 / rate, display);
};

export const graviton_to_spare = (graviton) => {
  return spare_formatter(Number.parseInt(graviton), 'graviton').to('spare').value();
};

export const spare_to_graviton = (spare) => {
  return spare_formatter(Number.parseFloat(Number(spare)), 'spare')
    .to('graviton')
    .value();
};

export const graviton_to_spare_string = (graviton) => {
  return spare_formatter(Number(graviton), 'graviton').to('spare').toString();
};

export const graviton_to_colouredcoin = (graviton) => {
  return spare_formatter(Number.parseInt(graviton), 'graviton')
    .to('colouredcoin')
    .value();
};

export const colouredcoin_to_graviton = (colouredcoin) => {
  return spare_formatter(Number.parseFloat(Number(colouredcoin)), 'colouredcoin')
    .to('graviton')
    .value();
};

export const graviton_to_colouredcoin_string = (graviton) => {
  return spare_formatter(Number(graviton), 'graviton').to('colouredcoin').toString();
};
