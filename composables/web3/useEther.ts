import detectEthereumProvider from "@metamask/detect-provider";
import {ethers} from "ethers"


import { Network } from "../types"

const ETH_NETWORKS = [0x01, 0x05];
const POLYGON = 0x69;
const MUMBAI = 0x1329;

export default function () {

    const config = useRuntimeConfig();

    let connection;
    let signer;
    let providerData;
    const userLoading = useState("userLoading", () => false);

    const loadUserData = async (_addy) => {};

    const loadConnectedWallet = async (prov:any) => {
      try {
        userLoading.value = true
        await getCurrentUser()
          .then(res => loadUserData(res))
      } catch (error) {
        console.log(error)
      } finally {
        userLoading.value = false
      }
    }
  
    const connectUser = async (prov:any) => {
      try {
        userLoading.value = true
        await requestAccounts()
          .then(res => loadUserData(res))
      } catch (error) {
        console.log(error)
      } finally {
        userLoading.value = false
      }
    }

    const getProvider = async () => {
        if (typeof window !== 'undefined') {
            providerData = detectEthereumProvider({ timeout: 10000 })
            connection = new ethers.providers.Web3Provider(await providerData)
            signer = connection.getSigner()
            return connection;
        }
    }

    const provider = (async () => await getProvider())();


    const isMetamaskInstalled = computed(() => Boolean(provider))




    



  const signMessage = async (message) => await signer.signMessage(message).then(res => console.log(res))

  const requestAccounts = async () => await connection.send('eth_requestAccounts', [])

  const getCurrentUser = async () => await connection.send('eth_accounts', [])

  const getBalance = async (address) => await connection.getBalance(address)

  const request = async (payload) => {
   
    await getProvider();
     await providerData.request(payload)
    
  }
  const switchNetwork = async () => {
    connection = await getProvider();
    await connection.provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: useRuntimeConfig().public.NETWORK_ID }] })
  }

  const addToken = async () => {
    connection = await getProvider();
    await connection.provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: config.CONTRACTS.goerli.token,
          symbol: 'AKX',
          decimals: 18,
          image: 'https://www.akxipfs.com/ipfs/QmUo7nywxScoWnwoMekNxFPTaJmoKKaDNiqnVeiY4eJBBk'
        }
      }
    })
  }

  const getChainId = async () => {
    connection = await getProvider();
   
    return connection.provider.chainId;
  };



  const getSigner = () => signer

  return {
    getProvider,
    switchNetwork,
    signMessage,
    addToken,
    getChainId,
    getCurrentUser,
    getBalance,
    getSigner,
    connectUser,
    loadConnectedWallet
  }

  


}