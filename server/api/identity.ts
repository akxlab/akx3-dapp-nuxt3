import {ethers} from "ethers";
import IdentityABI from "../abi/Identity.json";
import {createRouter, getQuery, readBody} from "h3";


const router = createRouter();


const abi = IdentityABI.abi;
const Address = process.env.NUXT_APP_TEST_IDENTITY_LOCAL;
const localURI = "http://localhost:8545";
const localPK = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
/*
export defineEventHandler(async (event) => {


})*/


const provider = new ethers.providers.JsonRpcProvider(localURI);
const wallet = new ethers.Wallet(localPK);
const w =  wallet.connect(provider);
const contract = new ethers.Contract(Address, abi, w);
contract.attach(Address);


const CreateAccount = async (event) => {
    const body = await readBody(event);
    const {user} = body
    const res = await contract.create(user)
    await res.wait(1);

};

const GetID = async (event) => {
    const query = getQuery(event);
    const {wid} = query;
    return await contract.getID(wid);
}

router.get('/', (event) => "akx internal api v1.0")

router.post('/create', async (event) => await CreateAccount)
router.get('/id', async (event) => await GetID)

export default router