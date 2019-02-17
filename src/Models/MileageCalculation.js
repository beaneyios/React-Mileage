
class MileageCalculation {
  constructor(id, startPostcode, endPostcode, miles, mileageCost, claim) {
    this.id = id;
    this.startPostcode = startPostcode;
    this.endPostcode = endPostcode;
    this.miles = miles;
    this.mileageCost = mileageCost;
    this.claim = claim;
  }
}

export default MileageCalculation;
