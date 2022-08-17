//camelCase for getdiscount
function getdiscount(code) {
	//use const
	//checking case for promocode
	let promo = promos.find(promo => promo.code === code)
	//remove debug code
  console.log(promo)
	
	//shorter if (promo && ...)
  if (promo !== undefined && promo.isActive) {
    console.log(`You get a ${promo.amount}% discount!`)
    return promo.amount / 100;
//proper code formatting with indentation
}
//semicolons consistency across file
return 0;
}
//camelCase for calculatefinalprice
function calculatefinalprice(basePrice, userCode) {
  if (userCode) {
    const discount = getdiscount(userCode)
		//basePrice out of brackets, checking for negative finalPrice
		//round finalPrice
    const finalPrice = basePrice - basePrice * discount
    return finalPrice;
  }
	//else may drop and simple return ...
	 else {
		
    return basePrice;
  }
}

//move to start of the file
const promos = [
	//formatting objects on several lines
  { code: 'TOTALLY10', amount: 10, isActive: true },
  { code: 'PLENTY20', amount: 20, isActive: false },
  { code: 'NIFTY50', amount: 50, isActive: true },
  { code: 'WHOPPING75', amount: 75, isActive: true },
  { code: 'YOLOFREE', amount: 100, isActive: false },
]