export interface Cliente{

	id: string;

	name: string,
	email : string,
	company : string,
//	password : string,
	cpfCnpj : string | null,
	mobilePhone : string,
	phone : string,
	postalCode : string,
	 address : string ,
	state : string,
    province: string,
	city : string,
	addressNumber : string,
	complement : string,
	municipalInscription: string,
	stateInscription: string,
	additionalEmails: Array<string>
    externalReference: string | null,
    notificationDisabled: boolean | null,
    observations: string,
}