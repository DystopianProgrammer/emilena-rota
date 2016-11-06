import { IsNotEmpty, IsDefined, IsMilitaryTime, IsEmail } from 'class-validator';

export enum RoleType {
    STAFF, ADMIN
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

export enum DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
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

    @IsEmail()
    email: string;

    dob: string;

    @IsNotEmpty()
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

export enum ContractType {
    CONTRACT, BANK
}

export enum StaffType {
    SENIOR, SUPPORT
}
