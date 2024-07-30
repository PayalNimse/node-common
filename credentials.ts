import { injectable } from "inversify";

@injectable()
class Credentials {
	public userDType: any;

	constructor() {
		this.userDType = "user";
	}
}

export default Credentials;
