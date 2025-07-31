import { serviceDirectory } from "@acme/globals";
import axios from "axios";
import { env } from "../env";

export default async function testSetup() {
	axios.defaults.baseURL = serviceDirectory.api[env.ENVIRONMENT].endpoint;
}
