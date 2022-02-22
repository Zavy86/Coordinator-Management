import {ResponseError} from "./ResponseError.model";

export class HandlerResponse{
	error:boolean=false;
	errors:ResponseError[]=[];
	object:string='';
	data:any;

	constructor(error:boolean,errors:any[],object:string,data:any) {
		this.error=error;
		this.object=object;
		this.data=data;
		errors.forEach(error=>this.errors.push(new ResponseError(error.code,error.description,error.information)));
	}

}
