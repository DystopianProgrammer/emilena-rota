import { IsNotEmpty, IsDefined, IsMilitaryTime, IsEmail, IsMobilePhone, IsNumber } from 'class-validator';

export enum RoleType {
    STAFF, ADMIN
}

export enum ContractType {
    CONTRACT, BANK
}

export enum StaffType {
    SENIOR, SUPPORT
}

export enum DayOfWeek {
    MONDAY, 
    TUESDAY, 
    WEDNESDAY, 
    THURSDAY, 
    FRIDAY, 
    SATURDAY, 
    SUNDAY
}

export class SystemUser {
    id: number;
    userName: string;
    password: string;
    roleType: RoleType;
}

export class Address {
    houseNumber: string;
    @IsNotEmpty()
    firstLine: string;
    @IsNotEmpty()
    secondLine: string;
    @IsNotEmpty()
    town: string;
    @IsNotEmpty()
    postCode: string;
}

export class Availability {
    id: number;
    @IsMilitaryTime()
    fromTime: string;
    @IsMilitaryTime()
    toTime: string;
    @IsDefined()
    dayOfWeek: DayOfWeek;
    numberOfHours: number;
}

export abstract class Person {
    id: number;
    @IsNotEmpty()
    forename: string;
    @IsNotEmpty()
    surname: string;
    email: string;
    personType: string;
    dob: string;
    @IsNumber()
    telephoneNumber: string;
    address: Address;
    availabilities: Availability[];
    preferences: string;
}

export class Client extends Person {
    staff: Staff[];
}

export class Staff extends Person {
    contractType: ContractType;
    staffType: StaffType;
    systemUser: SystemUser;
}

export class Rota {
    id: number;
    weekStarting: string;
    rotaItems: RotaItem[];
}

export class RotaItem {
    id: number;
    dayOfWeek: DayOfWeek;
    supportDate: string;
    start: string;
    finish: string;
    client: Client;
    staff: Staff;
}

export class Invoice {
    id: number;
    rotaItem: RotaItem;
    amount: string;
    issued: string;
    created: string;
    duration: string;
}

export class Traffic {
    id: number;
    ipAddress: string;
}