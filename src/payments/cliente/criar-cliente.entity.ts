import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CriarCliente {
  @PrimaryGeneratedColumn()
    id: number
    
//@Column()
name: string;
cpfCnpj: string;
email: string;
phone: number;
mobilePhone: number;
address: string;
addressNumber: number;
complement: string;
province: string;
postalCode: number;
externalReference: string;
notificationDisabled: boolean;
additionalEmails: string;
municipalInscription: string;
stateInscription: string;
observations: string;
groupName: string;

}