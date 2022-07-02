export class feedback{
    firstName!: string;
    lastName!: string;
    telNumber!: number;
    email!: string;
    agree!:boolean;
    contactType!: string;
    message!:string;
}

export const contactType = ['None','Tel','Email'];