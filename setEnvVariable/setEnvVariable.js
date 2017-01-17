function setEnvVariable(name, string, type) {
	/***************************************************************************
	Version 1.0
	edited by Justin San Agustin: 1/12/2017, 8:30:50 PM
	//
	Sets given environment variable. If "type" is not given, then it will be
		"Process"
	***************************************************************************/
	var shell = new ActiveXObject("Wscript.Shell");
	if (type === undefined) { type = "Process";	}
	shell.Environment(type).Item(name) = string;
}
