export const chargeShippingFee = (dis:number) => {
    if(!dis) return null;

    if(+dis <= 5000) {
        return 0
    }else if(5000 < dis && dis <= 20000) { 
        return 15000
    }else if(20000 < dis && dis <= 40000) {
        return 25000
    }else if(40000 < dis && dis <= 60000) {
        return 35000
    }else if(60000 < dis && dis <= 90000) {
        return 40000
    }else if(90000 < dis) {
        return 50000
    }
}