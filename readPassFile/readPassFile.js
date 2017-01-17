function readPassFile(file, pin) {
	/***************************************************************************
	Version 1.01
	edited by Justin San Agustin: 1/14/2017, 2:06:17 PM
		Changed: Removed a redundant 'return pass' statement
	Version 1.0
	edited by Justin San Agustin: 12/24/2016, 2:27:31 AM
	//
	Reads passFile, decrypting if necessary
	Returns contents of file (string)
	//
	Dependencies:
		CryptoJS AES Rollup
	***************************************************************************/
	var fso      = new ActiveXObject("Scripting.FileSystemObject");
	var passFile = fso.OpenTextFile(file);
	var pass     = passFile.ReadAll();
	passFile.Close();
	var charCount      = pass.length; //Gets # of char in the file
	var markerPosition = pass.indexOf("=") + 1; //Finds where "=", but count starts at 0
	if (markerPosition == charCount) {
		//password is encrypted
		decryptedPass = CryptoJS.AES.decrypt(pass, pin);
		pass = decryptedPass.toString(CryptoJS.enc.Utf8);
	}
	return pass;
}
