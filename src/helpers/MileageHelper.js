class MileageHelper {

  static miles(meters) {
    var convertedMiles = meters / 1600;
    var roundedMiles = this.roundedTwoDecimals(convertedMiles);

    // debugger;
    return roundedMiles;
  }

  static roundedTwoDecimals(value) {
    if(value === 0) {
      return value
    }

    return Math.floor(value * 100) / 100
  }

  static claimedMiles(totalMiles, claim) {

    if(claim) {
      return totalMiles;
    }

    if(totalMiles < 5.0) {
      return 0;
    }

    var roundedMiles = this.roundedTwoDecimals(totalMiles - 5.0);
    return roundedMiles;
  }
}

export default MileageHelper;
