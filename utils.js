
const libra = require('libra-core')
const client = new libra.LibraClient({ network: libra.LibraNetwork.Testnet });

var getAccountByAddress = function(address, callback) {
	if(isValidAddress(address)) {
		var account = fetchBlockchainByAddress(address)
		account.then(function(acc){
			console.log(acc)
			var retval = {
				"accountAddress": address,
				"accountBalance": convertBigNumberCorrectly(acc.balance.toString()),
				"sequenceNumber": acc.sequenceNumber.toString(),
				"sentEventsCount": acc.sentEventsCount.toString(),
				"receivedEventsCount": acc.receivedEventsCount.toString()
			}
			callback(retval)
		})
	}
}

var convertBigNumberCorrectly = function(bigstring){
	console.log(bigstring)
	console.log(bigstring.length)
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



