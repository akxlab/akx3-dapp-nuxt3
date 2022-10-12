import ethers from "ethers"

export type AKXContract = {
    name: String;
    chainId: Number;
    address: String;
    abi: String;
}

export type Network = {
    provider: ethers.providers.Web3Provider;
    chainId?: Number;
    contracts?: [{id: String; data: AKXContract;}];
}

export type AuthRequest = {
    identifier?: String;
    address?: String;
}

export type AuthResponse = {
    success: Boolean;
    error?: Error;
    code?: Number;
    authToken?:String;
}

export type User = {
    uuid: String;
    address: String;
    identifier?: String;
}

export type UserMetas = {
    displayName?: String;
    balance?: String;
    tokenBalance?: String;
    avatar?: String;
}