class MileageHelper {

  static miles(meters) {
    var convertedMiles = meters / 1600;
    var roundedMiles = this.roundedOneDecimal(convertedMiles);

    return roundedMiles;
  }

  static roundedOneDecimal(value) {

    if(value === 0) {
      return value
    }

    return this.round(value, 5);
  }

  static round(value, n) {

    var exponent = n;
    var roundedValue = value;

    for(var i = exponent; i >= 0; i--) {

      var divider = Math.pow(10, i);

      if(Number.isInteger(roundedValue * 10)) {
        return Math.round(roundedValue);
      }

      roundedValue = Math.round(roundedValue * divider) / divider;
    }

    return roundedValue;
  }

  static claimedMiles(totalMiles, claim) {

    if(claim) {
      return totalMiles;
    }

    if(totalMiles < 5.0) {
      return 0;
    }

    var roundedMiles = this.roundedOneDecimal(totalMiles - 5.0);
    return roundedMiles;
  }
}

export default MileageHelper;
