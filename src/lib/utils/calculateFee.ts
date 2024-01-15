export const  calculateFee = (fee:number, feeType:string):number => {
    let amount = fee;
  
    if (feeType == "Full") {
        amount  
    }
    if (feeType == "Half") {
        amount /= 2;
    }
    if (feeType == "Free") {
        amount =0
    }
  
    return amount;
}