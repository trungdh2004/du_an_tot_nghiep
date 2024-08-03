

export const formatQuantity = (value:number,end?:string) =>{
    if(!value) {
        return "0"
    }

    const formatValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return `${formatValue} ${end ? end : ""}`
}