
const libra = require('libra-core')
const client = new libra.LibraClient({ network: libra.LibraNetwork.Testnet });

var getAccountByAddress = function(address, callback) {
	if(isValidAddress(address)) {
		var account = fetchBlockchainByAddress(address)
		account.then(function(acc){
			var retval = {
				"accountAddress": address,
				"accountBalance": convertBigNumberCorrectly(acc.balance.toString()),
				"sequenceNumber": acc.sequenceNumber.toString(),
				"sentEventsCount": acc.sentEventsCount.toString(),
				"receivedEventsCount": acc.receivedEventsCount.toString(),
				"transactionArray": []
			}
			console.log(address, " ", acc.sequenceNumber.toNumber())
			var transactionList = fetchTransactions(address, 1)
			transactionList.then(function(tl) {

			})


			callback(retval)
		})
	}
}

var fetchTransactions = async function(add, seq, callback) {
	tl = await client.getAccountTransaction(add, seq)
	console.log(tl) 


	return null;
}

var convertBigNumberCorrectly = function(bigstring){
	bigstring = bigstring.substring(0, bigstring.length - 6) + "," + bigstring.substring( bigstring.length - 6, bigstring.length)
	return bigstring;
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


module.exports = {
	getAccountByAddress
} 



