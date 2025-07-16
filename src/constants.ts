interface AddressMapping {
  [name: string]: string[];
}

interface MineNameMapping {
  [address: string]: string;
}

export const BURN_ADDRESS = "0x0000000000000000000000000000000000000000";
export const CONTRACT_BEACON = "0x990eb28e378659b93a29d46ff41f08dc6316dd98";
export const CONTRACT_BEACON_PETS_STAKING_RULES =
  "0x2c6c166832a4b5a501dd7a4b7acc8e13fb6968ec";
export const CONTRACT_BEACON_QUESTING =
  "0xd58d40a9a1aaeebd48a90bbb8197e0772d0e9b51";
export const CONTRACT_BEACON_WRIT_OF_PASSAGE =
  "0x5d541b55763a9277f61a739f40b6021a16c2d3d8";
export const CONTRACT_MAGIC = "0x539bde0d7dbd336b79148aa742883198bbf60342";
export const CONTRACT_MAGIC_L1 = "0xB0c7a3Ba49C7a6EaBa6cD4a96C55a1391070Ac9A";
export const CONTRACT_MAGIC_TREASURE =
  "0x000000000000000000000000000000000000800A"; // native token
export const CONTRACT_MAGIC_WETH_LP =
  "0xb7e50106a5bd3cf21af210a755f9c8740890a8c9";
export const CONTRACT_SUSHISWAP_ROUTER =
  "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506";
export const CONTRACT_WETH_USDC_LP =
  "0x905dfcd5649217c42684f23958568e533c711aa3";
// SMOL contract addresses
export const CONTRACT_SMOL_L1 = "0x53ccE6d10e43d1B3D11872Ad22eC2aCd8d2537B8";
export const CONTRACT_SMOL_SOL = "5KHQeeQvM4qBtmX3WnaCMGpM3Th7jYpqcHf3c6qzPodM";
export const CONTRACT_SMOL_TREASURE =
  "0xb73e4f558f7d4436d77a18f56e4ee9d01764c641";

export const TOTAL_SUPPLY_EXCLUDED: AddressMapping = {
  "MagicBurner legacy (eth)": ["0x10E0554eD8caD1432256B7DAe97B9fC9995E9cd1"],
  "MagicBurner (eth)": ["0x1d166c799bbd99b7039f91bc17a6322274590b78"],
  // "MagicBridgeArb (arb1)": [""], // Include in future if L1 Hyperlane WarpRoute exists.
  "L1 Withdrawal Escrow (arb1)": ["0xCB8258DC51d1B6A78d765ce6847b78aC2f2f72b1"],
  "Warp Route (arb1)": ["0x240d04a70B038369C8DF703B78B3b47332EeE116"],
  "Burn Addresses (arb1)": [
    "0x0000000000000000000000000000000000000000",
    "0x000000000000000000000000000000000000dead",
  ],
  "Burn Addresses (eth)": [
    "0x0000000000000000000000000000000000000000",
    "0x000000000000000000000000000000000000dead",
  ],
  // "CollateralProvider (treasure)": [
  //   "0x24DF29723B54DE65f5fbC66a610053e90534631d",
  // ],
  // "Warp Route (treasure)": ["0x01c94f24F8D72BB9C3f61c4ED0b9b86BfC23BADd"],
  // "Burn Addresses (treasure)": [
  //   "0x0000000000000000000000000000000000000000",
  //   "0x000000000000000000000000000000000000dead",
  // ],
};

export const CIRCULATING_SUPPLY_EXCLUDED: AddressMapping = {
  "Treasure | DA Staking (arb1)": [
    "0x81fa605235e4c32d8b440eebe43d82e9e083166b",
  ],
  "Treasure | Liquidity (arb1)": ["0x64bfb08217b30b70f287a1b7f0670bdd49f8a13f"],
  "Treasure | Ecofund (arb1)": ["0x482729215aaf99b3199e41125865821ed5a4978a"],
  "Treasure | Ecofund (eth)": ["0x8BEB7513F0962869eDb62a19522B21b668a3F63A"],
  "Treasure | Magna Partner vesting (eth)": [
    "0xE98CdAA6cDB1c6953b087c08f7f55C69DbCca2E2",
  ],
  "Treasure | Magna Contributor vesting (eth)": [
    "0xD3c0f3583275a6295183896E4424e644039A4Ce6",
  ],
  "Treasure | Contributor Allocation (eth)": [
    "0xe044c20429E448175ba00aBa5f255678c6F00e8d",
  ],
  "Treasure | Operations (eth)": ["0x4ef220fc6d1c8951aab7b804b5b5eed21d7a5150"],

  "Treasure | Contributor Allocation (arb1)": [
    "0x4D3aAA252850EE7C82b299CB5778925BBE92f1fC", // Multisig
    "0xfC05C3C2814DFCfD77Bf8F6796dF413D8BE3D346", // Liquifi Escrow Contract"
    "0x3a3292102de78c48470a2ff5281a99d36629cfcd", // Magna
  ],
  "Treasure | Treasury (eth)": ["0xEc834bD1F492a8Bd5aa71023550C44D4fB14632A"],
  "Treasury Divestment #1 (Nov 2021) (eth)": [
    "0xa71556db2af85d9d8da00f0eb68d150c53ba030e",
    "0x26788f3a43b07b079383d4972d98938b9f7e3f3d",
    "0x42e43a48a71ea7c022c5096007d477f88e4d1cda",
    "0x18880842ac3a6bc7b11aa0c9374c4318fad1716c",
    "0x5ba4e9083358e1662544d8d6acbedf62219a85da",
    "0x384C329Be356e52C3285564900af5e2E13a2375d",
    "0xeaede4bfdd57026a073ac79ae43922e198f7751e",
    "0x7595639ad17a248e01eaac2b9a88ce7b4b277715",
    "0xe3fbac93506359fc56cb51d7ce62057cd51215ac",
    "0xc2922d690e2d682456aa56aee484eef02a73c3b6",
    "0xcb0b0b6dbd7e32c6d2d8d398e3f21a4df969bd4c",
    "0x665521f62eddb444e48585f59f710476f621ca53",
    "0xfb89b3c1ccb23fcef7f37dcba47fe999e572df64",
    "0x61c386c6e830d15d85de99f92954ff7add29c033",
    "0xfd55c474260c302e63042b0c5f9a898f3d7b0618",
    "0x5414471d0de677d915e510fe82430a4243b5aa5f",
    "0x98c1158389b145af0e11c49659906a8940ef6de3",
    "0xcd37a5ad7a46c6ddb27c0ada7f1103d2ef4a01c9",
    "0x8a31e1d4aaf6d62de81a014dad2349fec0c194c2",
    "0x02f6de6f0272d6a273e0436ec2d072d3f21bc652",
    "0x8771a5cce0959768d709d54b3befd3815d9aca6c",
    "0xf89c823188cca29fb7e17b4fb3c32a2d425a436f",
    "0x452fe9b7403f600f736c18b8fb1039d910421594",
  ],
  "Treasury Divestment #2 (Oct 2022) (eth)": [
    "0xbac017957e28f3f969c769bc70155692a530e00b",
    "0xaea7a5c29bcb20fd31718e5604566e899cf76258",
    "0x592f884ab5dab6ab377c352632258b89ff089c86",
    "0x009d4e2986a4a0d33b84d3e4d162e08e8d9bb19b",
    "0xdd9d1c87d071a4ea63583d0a67bd64479b4bfb25",
    "0x4375bcdec6ef198814f3c50ced6df821c802308f",
    "0xb8d795c77c02a35c6c5065d6abaed8ea73446b7e",
    "0x642689fcb3fb8c753529d60c6da41432729e2b72",
    "0x17be3a18f1888e944d7996f194e87be47fb0d734",
    "0x84784a5e5ed29f4afa217d4cf0ab8a009171c94e",
    "0xAB6437C7Ba5aAccd681b56445B74ECB4e143D0d4",
    "0x6e8f249974110d508f21220dafe10bf932551cfc",
    "0x0d24b4d1972d41676be6dd090b1980f958350691",
    "0xa51d17dceaaef4488e5936f40d804c12aae5b0d2",
  ],
  "Contributor Token Allocation (Nov 2021) (eth)": [
    "0x1532aeea51706b1195303a6711699eebc4c825c7",
    "0x98b40a1f51623e76842170cb7356c620a4d5abd3",
    "0x7dd44fdbff62fd1ff998f83adde314d4b8f0ad28",
    "0x52f733cdf640b0f0c775da40d16a00261dd9f10c",
    "0x44d3bbdc7198266587d1636331b6974445788040",
    "0xf611d1851dda4c7ac40abe2dd6c12a931a5b3a2a",
    "0x1ab0860cee529a39cca2535a179b7e108c79f694",
    "0x9d8c5291508a5eace7bf48222cd2b32bb75e5916",
    "0x6bcf027decaae13e0f507e8eab1860aa6f3ad85d",
    "0x7bc3136da3c2a9fb25278d1425885b54434c423a",
    "0x5967fe60ea096658f5b116c6375356f173c95a32",
    "0xd32c8fce63c7e940dfaeb6356eb8b5279c6f26c9",
  ],
  "Treasure | Smol Treasury (eth)": [
    "0xe40bcd82e46c28daaf135717d4b2f6966bcb4e3e",
  ],
  "Treasure | Revenue (eth)": ["0x142417ca4604750675250f4aad4e8e429df48b44"],
  "Treasure | Revenue (arb1)": ["0x142417ca4604750675250f4aad4e8e429df48b44"],
  "Flowdesk Custody (eth)": ["0xB9AF9c653E75D4C8e43C723694572982612d4DD6"],

  // "Treasure | DA Staking (treasure)": [
  //   "0x74fe6b821abc46c208d374a384ff7bcde5fc6f69",
  // ],
  // "Treasure | Liquidity (treasure)": [
  //   "0x519583a364c0f4988506be990e57d0d7fbeacecc",
  // ],
  // "Treasure | Ecofund (treasure)": [
  //   "0x3418e91949e17ac887c2daeaf7f0799ea9f38f22",
  // ],
  // "Treasure | Contributor Allocation (treasure)": [
  //   "0x40143a989f7476e5eb526102671e070e292cd4c8", // Multisig
  // ],
  // "Treasure | Exchange escrow (treasure)": [
  //   "0x2cd4697a4d7fffdd00946d1cb46318174d25da61",
  // ],
};

export const CIRCULATING_SUPPLY_EXCLUDED_EXTENDED: AddressMapping = {
  "Treasure | Liquidity Incentives Sushi ETH-MAGIC (arb1)": [
    "0x1a9c20e2b0aC11EBECbDCA626BBA566c4ce8e606",
  ],
  "Treasure | Treasury (arb1)": ["0x0eB5B03c0303f2F47cD81d7BE4275AF8Ed347576"],
  "Treasure | Marketplace (arb1)": [
    "0xDb6Ab450178bAbCf0e467c1F3B436050d907E233",
  ],
  "Treasure | Developer (arb1)": ["0xE8409cd2aBae06871D166E808D75aDdb0537033A"],
  "Treasure | Smol Treasury (arb1)": [
    "0x674295B530A1F69a4Bc217FFFB7E8BcDF9971678",
  ],
  "Treasure | Community Grants (arb1)": [
    "0x1054E9D9091dC55a1738F9c8Fc0c79E59E222804",
  ],
  "Treasure | Community Gamification Fund (arb1)": [
    "0x3Fe5d6AE3470b2De09eD062Ac78444E44Aa0cACe",
  ],
  "Treasure | Community Ecosystem Fund (arb1)": [
    "0x45236EB7C47a68aE63f62F7e38f7C2F864f2Ad14",
  ],
  "Treasure | Master of Coin (arb1)": [
    "0x3563590E19d2B9216E7879D269a04ec67Ed95A87",
  ],
  "Bridgeworld | Treasury (arb1)": [
    "0xf9E197Aa9fa7C3b27A1A1313CaD5851B55F2FD71",
  ],
  "Bridgeworld | Atlas Mine (arb1)": [
    "0xA0A89db1C899c49F98E6326b764BAFcf167fC2CE",
  ],
  "Bridgeworld | Harvester (Kameji) (arb1)": [
    "0xdf9f9ca6ee5c3024b64dcecbadc462c0b896147a",
  ],
  "Bridgeworld | Harvester (Shinoba) (arb1)": [
    "0x2b1de6d22e6cb9178b3ecbcb7f20b62fcce925d4",
  ],
  "Bridgeworld | Harvester (Asiterra) (arb1)": [
    "0x88bf661446c8f5a7072c0f75193dae0e18ae40bc",
  ],
  "Bridgeworld | Harvester (Lupus Magus) (arb1)": [
    "0x3fbfcdc02f649d5875bc9f97281b7ef5a7a9c491",
  ],
  "Bridgeworld | Harvester (Afarit) (arb1)": [
    "0x70a75ac9537f6cdac553f82b6e39484acc521067",
  ],
  "Bridgeworld | Harvester (Emerion) (arb1)": [
    "0x587dc30014e10b56907237d4880a9bf8b9518150",
  ],
  "Bridgeworld | Harvester (Thundermane) (arb1)": [
    "0x25d6a1e968bdbebf444997286de7137df1490328",
  ],
  "Bridgeworld | Harvester (Emberwing) (arb1)": [
    "0x36882e71d11eadd9f869b0fd70d18d5045939986",
  ],
  "Summoning (arb1)": ["0xc8dbdc58289474ab3e01568eb5f88f440bde6b46"],
  "Crafting (arb1)": ["0xb9c9ed651eb173ca7fbc3a094da9ce33ec145a29"],
  "NftHandler (Thundermane) (arb1)": [
    "0xdc5a294470b88d9751af9bab4f8de67e8d040f48",
  ],
};

export const MINE_NAME_MAPPING: MineNameMapping = {
  "0xdf9f9ca6ee5c3024b64dcecbadc462c0b896147a": "Kameji",
  "0x2b1de6d22e6cb9178b3ecbcb7f20b62fcce925d4": "Shinoba",
  "0x88bf661446c8f5a7072c0f75193dae0e18ae40bc": "Asiterra",
  "0x3fbfcdc02f649d5875bc9f97281b7ef5a7a9c491": "Lupus Magus",
  "0x70a75ac9537f6cdac553f82b6e39484acc521067": "Afarit",
  "0x587dc30014e10b56907237d4880a9bf8b9518150": "Emerion",
  "0x25d6a1e968bdbebf444997286de7137df1490328": "Thundermane",
  "0x36882e71d11eadd9f869b0fd70d18d5045939986": "Emberwing",
};

export const BRIDGEWORLD_LEGION_CONTRACTS: string[] = [
  "0xc8dbdc58289474ab3e01568eb5f88f440bde6b46", // Summoning
  "0xda3cad5e4f40062ceca6c1b979766bc0baed8e33", // Questing
  "0xb9c9ed651eb173ca7fbc3a094da9ce33ec145a29", // Crafting
  "0xa0a89db1c899c49f98e6326b764bafcf167fc2ce", // Atlas Mine
  "0x737eaf14061fe68f04ff4ca8205acf538555fcc8", // Advanced Questing
  "0xa0515709fa0f520241659a91d868151e1ad263d8", // NftHandler (Kameji)
  "0x85f1bfd98e190b482d5348fd6c987ae3da7a4df6", // NftHandler (Shinoba)
  "0x2ef99434b0be1511ed2a1589dc987e48298e059e", // NftHandler (Asiterra)
  "0x0c73a18364850239571afca78dd5d39193f288be", // NftHandler (Lupus Magus)
  "0x5aa865ac69f481d43a7c67cde7d20781733eb612", // NftHandler (Afarit)
  "0x02d1922d34724a09eb1533b6276fb7e4775a1b37", // NftHandler (Emerion)
  "0xdc5a294470b88d9751af9bab4f8de67e8d040f48", // NftHandler (Thundermane)
  "0x22cafc3819a35cddbdafb6417db5e8fcd5ca49e7", // NftHandler (Emberwing)
  "0x447c73f3ee46050d618fd956c1641274860b6c74", // Corruption Crypts
  "0x26fa96b3c9d77d42a1b810589798b3d9e56d681d", // Corruption Crypts Legion Handler
];
