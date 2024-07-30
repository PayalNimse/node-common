import { injectable } from "inversify";
import { config } from "dotenv";

@injectable()
class EnvConfig {
	public readonly ENV: string;
	public readonly CONNECTION_STRING: string;
	public readonly PORT: string;
	public readonly BASEURL : string;

	constructor() {
		config();
		this.ENV = process.env.NODE_ENV || "development";
		//this.CONNECTION_STRING = process.env.CONNECTION_STRING || "";
		this.CONNECTION_STRING = "mongodb://127.0.0.1:27017/user-data";
		this.PORT = process.env.PORT || "3000";
		this.BASEURL = 'https://dev-recruitment-api.huhoka.com';
	}
}

export default EnvConfig;
