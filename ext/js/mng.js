


var mng = {

	run: function (request, response) {
		console.log("Mng > Run.");
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.write("Mng > Run.");
		response.end();
	}

};


module.exports = mng;
