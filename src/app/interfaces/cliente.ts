export interface Cliente{
    name: string;
    email: string;
    phone: string | null; 
    mobilePhone: string | null;
    cpfCnpj: string | null;
    postalCode: string | null;
    address: string;
    addressNumber: string | null; 
    complement: string;
    province: string;
    city: string;
    state: string;
    externalReference: string;
    notificationDisabled: boolean;
    additionalEmails: string;
    municipalInscription: string;
    stateInscription: string;
    observations: string;
}