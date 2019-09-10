let sleep = require('util').promisify(setTimeout);
const libra = require('libra-core')
const client = new libra.LibraClient({ network: libra.LibraNetwork.Testnet });

var getAccountByAddress = function(address,tsOffset,callback) {
	if(isValidAddress(address)) {
		var account = fetchBlockchainByAddress(address)
		account.then(function(acc){
			var retval = {
				"accountAddress": address,
				"accountBalance": convertBigNumberCorrectly(acc.balance.toString()),
				"sequenceNumber": acc.sequenceNumber.toString(),
				"sentEventsCount": acc.sentEvents.count.toString(),
				"receivedEventsCount": acc.receivedEvents.count.toString(),
				"transactionArray": []
			}
			var maxseq = acc.sequenceNumber.toNumber();
			
			fetchTransactions(address, maxseq, tsOffset, function(tl){
				console.log("fin " + tl.length)
				callback(retval)
			})

		})
	}
}



var decorticateTransaction = function(ts) {
	console.log()
	var cleanedTransaction = {
		"transactionCode": ts.signedTransaction.transaction.program.code.toString(),
		"transactionArgs": ts.signedTransaction.transaction.program.arguments.toString(),
		"gasUnitPrice": ts.signedTransaction.transaction.gasContraint,
		"maxGas": ts.signedTransaction.transaction.maxGasAmount,
		"expirationTime": ts.signedTransaction.transaction.expirationTime,
		"senderAddress": ts.signedTransaction.transaction.sendersAddress.addressBytes,
		"transactionSequenceNumber": ts.signedTransaction.transaction.sequenceNumber,
		"": "",

	}

}

async function fetchTransactions(add,seqmax,tsOffset,callback) {
	let tl = []
	var calcStart = ((seqmax - 1) - tsOffset);
	var endPoint = calcStart - 25;
	
        if(calcStart < 0 || endPoint < 0 || tsOffset < 0) return []

	for(var i = calcStart ; i > endPoint; i--) {
		await sleep(10)
		t = await client.getAccountTransaction(add, i)
		console.log(t)
		console.log(i)
		tl.push(t)
	}
	callback(tl);
}

var convertBigNumberCorrectly = function(bigstring){
	toAppend = remvDupZero(bigstring.substring( bigstring.length - 6, bigstring.length));
	toPrepend = formatNumber(bigstring.substring(0, bigstring.length - 6));
	temp = toPrepend + toAppend;
	return temp;
}
var remvDupZero = function(str) {
	if(str.match("^0*")) {
		return "";
	} else {
		return "." + str;
	}
}

var formatNumber = function(str) {
	return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

var isValidAddress = function(address) {
	if(address == "") {
		return false;
	}
	if(address.length > 128){
		return false;
	}
	if(!address.match("^[A-Fa-f0-9]+$")) {
		return false;
	}
	return true
}


var fetchBlockchainByAddress = async function(address) {
	const account = await client.getAccountState(address);
	return account;
}

var restcallAccount = function() {
	return fetchBlockchainByAddress()
}


module.exports = {
	getAccountByAddress
} 



