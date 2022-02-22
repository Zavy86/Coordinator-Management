export class LoginResponse {
	token: string = "";
	duration: number = 0;
	generation: number = 0;
	expiration: number = 0;

	constructor(data:any) {
		this.token=data.token;
		this.duration=data.duration;
		this.generation=data.generation;
		this.expiration=data.expiration;
	}

}
