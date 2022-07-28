export class ProfileResponse {
	uid: string = "";
	account: string = "";
	fullname: string = "";
	firstname: string = "";
	lastname: string = "";
	gender: string = "";
	handlers: string[] = [];
	actions: object = {};

	constructor(data:any) {
		this.uid=data.uid;
		this.account=data.account;
		this.fullname=data.firstname+' '+data.lastname;
		this.firstname=data.firstname;
		this.lastname=data.lastname;
		this.gender=data.gender;
		this.handlers=data.handlers;
		this.actions=data.actions;
	}

}
