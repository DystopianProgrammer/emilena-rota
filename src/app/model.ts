import { 
        IsNotEmpty, 
        IsDefined, 
        IsMilitaryTime, 
        IsEmail, 
        IsMobilePhone, 
        IsNumber
    } from 'class-validator';

export class Days {
    private static  _MONDAY: string = 'MONDAY';
    private static _TUESDAY: string = 'TUESDAY';
    private static _WEDNESDAY: string = 'WEDNESDAY';
    private static _THURSDAY: string = 'THURSDAY';
    private static _FRIDAY: string = 'FRIDAY';
    private static _SATURDAY: string = 'SATURDAY';
    private static _SUNDAY: string = 'SUNDAY';

    static get monday() {
        return this._MONDAY;
    }

    static get tuesday() {
        return this._TUESDAY;
    }

    static get wednesday() {
        return this._WEDNESDAY;
    }

    static get thursday() {
        return this._THURSDAY;
    }

    static get friday() {
        return this._FRIDAY;
    }

    static get saturday() {
        return this._SATURDAY;
    }

    static get sunday() {
        return this._SUNDAY;
    }
}

export class PersonType {
    private static _STAFF = 'STAFF';
    private static _CLIENT = 'CLIENT';

    static get staff() {
        return this._STAFF;
    }

    static get client() {
        return this._CLIENT;
    }
}

export class SystemUser {
    id: number;
    userName: string;
    password: string;
    roleType: string;
}

export class Address {
    @IsNotEmpty()
    firstLine: string;

    @IsNotEmpty()
    secondLine: string;

    @IsNotEmpty()
    town: string;

    @IsNotEmpty()
    postCode: string;

    @IsNotEmpty()
    location: Location;
}

export class Location {
    id: number;
    longitude: number;
    latitude: number;
}

export class Availability {

    id: number;
    
    @IsMilitaryTime()
    fromTime: string;
    
    @IsMilitaryTime()
    toTime: string;
    
    @IsDefined()
    dayOfWeek: string;
    
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

    @IsNotEmpty()
    telephoneNumber: string;

    @IsNotEmpty()
    address: Address;

    @IsNotEmpty()
    availabilities: Availability[];

    preferences: string;

    active: boolean;
}

export class Client extends Person {
    staff: Staff[];
}

export class Staff extends Person {
    contractType: string;
    staffType: string;
    systemUser: SystemUser;
}

export class Rota {
    id: number;
    weekStarting: string;
    rotaItems: RotaItem[];
}

export class RotaItem {
    id: number;
    dayOfWeek: string;
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