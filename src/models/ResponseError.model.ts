export class ResponseError{
	code:string='';
	description:string='';
	information:string='';

	constructor(code:string,description:string,information:string) {
		this.code=code;
		this.description=description;
		this.information=information;
	}

}
