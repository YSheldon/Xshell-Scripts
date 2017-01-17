function updatePassFile(file, newPass, pin) {
	/***************************************************************************
	Ver 1.0
	edited by Justin San Agustin: 12/24/2016, 2:25:02 AM
	//
	Encrypts password and writes it to passFile
	//
	Dependencies:
		CryptoJS AES Rollup
	***************************************************************************/
	var fso           = new ActiveXObject("Scripting.FileSystemObject");
	var ForWriting    = 2;
	var passFile      = fso.OpenTextFile(file, ForWriting);
	var encryptedPass = CryptoJS.AES.encrypt(newPass, pin);
	passFile.Write(""); //clear the file
	passFile.Write(encryptedPass); //write the new password to the file
	passFile.Close();
}
