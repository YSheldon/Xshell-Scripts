function checkEnvVariable(name) {
	/***************************************************************************
	Version 1.0
	edited by Justin San Agustin: 1/12/2017, 8:29:35 PM
	//
	Checks if given environment variable exists.
	//
	Returns array:
		checkEnvVariable[0] = success (true/false) //true if variable is set
		checkEnvVariable[1] = contents of variable
	***************************************************************************/
	var success;
	var fullName = "%" + name + "%";
	var shell = new ActiveXObject("Wscript.Shell");
	var envVariable = shell.ExpandEnvironmentStrings(fullName);
	// xsh.Dialog.MsgBox(envVariable);
	if (envVariable === fullName) {	success = false; }//envVariable not set
	else { success = true; } //envVariable set
	return [success, envVariable];
}
