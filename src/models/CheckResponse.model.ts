export class CheckResponse {

	valid:boolean=false;
	address:string='';
	account:string='';
	client:string='';
	duration:number=0;
	remaining:number=0;
	generation:number=0;
	expiration:number=0;

	constructor(data:any) {
		this.valid=data.valid;
		this.address=data.address;
		this.account=data.account;
		this.client=data.client;
		this.duration=data.duration;
		this.remaining=data.remaining;
		this.generation=data.generation;
		this.expiration=data.expiration;
	}

}
