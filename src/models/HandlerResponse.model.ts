export class HandlerResponse {
	uid: string = "";
	uidAccount: string = "";
	handler: string = "";
	identifier: string = "";
	enabled: boolean;

	constructor(data:any) {
		this.uid=data.uid;
		this.uidAccount=data.uidAccount;
		this.handler=data.handler;
		this.identifier=data.identifier;
		this.enabled=data.enabled;
	}

}
