import detectEthereumProvider from "@metamask/detect-provider";
import {ethers} from "ethers"


import { Network } from "../types"

const SALE_ABI = [{"inputs":[{"internalType":"address","name":"w1","type":"address"},{"internalType":"address","name":"w2","type":"address"},{"internalType":"uint256","name":"_bp","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ContractCannotBuy","type":"error"},{"inputs":[],"name":"ContractCannotDeposit","type":"error"},{"inputs":[],"name":"EmptyOrZeroEthSend","type":"error"},{"inputs":[],"name":"NoZeroAddress","type":"error"},{"inputs":[],"name":"NotEnoughtSupply","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"akxAmount","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"feeVault","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"fwAddress","type":"address"}],"name":"FeeWalletSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"akxAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTime","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"onTimestamp","type":"uint256"}],"name":"PresaleCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"onTimestamp","type":"uint256"}],"name":"PresalePaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"onTimestamp","type":"uint256"}],"name":"PresaleStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"twAddress","type":"address"}],"name":"TreasurySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"onTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"treasuryWallet","type":"address"}],"name":"WithdrawToTreasury","type":"event"},{"inputs":[],"name":"ADMIN_HELPER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AKX_HOLDER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AKX_OPERATOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAO_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxFounderPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Operations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PreSalePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Reserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SYSADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"ts","type":"uint64"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"canTransfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"ts","type":"uint64"}],"name":"endPresale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"getMaxCirculating","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"getOperationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"getPercentForFounder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"getPresaleSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"uint256","name":"amount2","type":"uint256"}],"name":"getRatePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"getReserveAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getTxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxCirculating","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingTransferToTreasury","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEndedOn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleMaxDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_fw","type":"address"}],"name":"setFeeWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tw","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ticker","type":"address"}],"name":"setUnderlyingToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"txFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updatePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawToTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

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


    const getSaleContract = async (address:string) => {

       const prov = await getProvider();
       if(prov) {
           const signer = await prov.getSigner()
           const contract = new ethers.Contract(address, SALE_ABI, signer)
           contract.attach(address)
           return contract;
       }

    }


    



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
    await connection.provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x13881' }] })
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
    loadConnectedWallet,
      isMetamaskInstalled,
      getSaleContract
  }

  


}