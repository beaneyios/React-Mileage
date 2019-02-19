class MileageHelper {

  static miles(meters) {
    var convertedMiles = meters / 1600;
    var roundedMiles = this.roundedOneDecimal(convertedMiles);

    // debugger;
    return roundedMiles;
  }

  static roundedOneDecimal(value) {
    if(value === 0) {
      return value
    }

    var roundedToOneDecimal = Math.floor(value * 10) / 10;

    return Math.round(roundedToOneDecimal);
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
