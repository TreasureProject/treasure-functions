const axios = require("axios");

const {
  MINE_NAME_MAPPING,
  CONTRACT_CRAFTING,
  CONTRACT_ADVANCED_QUESTING,
  BRIDGEWORLD_LEGION_CONTRACTS,
} = require("../constants");
const {
  getCorruptionInfo,
  getCorruptionBalances,
} = require("../contracts/corruption");
const { getEmissionsRatePerSecond } = require("../contracts/masterOfCoin");
const { getHarvesterShares } = require("../contracts/middleman");

const querySubgraph = async (query, subgraph = "bridgeworld") => {
  const { data } = await axios.post(
    `https://subgraph.satsuma-prod.com/${process.env.SATSUMA_API_KEY}/treasure/${subgraph}/api`,
    { query }
  );
  return data.data;
};

exports.getCorruption = async () => {
  const harvesterAddresses = Object.keys(MINE_NAME_MAPPING);
  const [
    [
      forgeCorruptionBalance,
      ivoryTowerCorruptionBalance,
      ...harvestersCorruptionBalances
    ],
    forgeCorruptionInfo,
    ivoryTowerCorruptionInfo,
    ...harvestersCorruptionInfo
  ] = await Promise.all([
    getCorruptionBalances([
      CONTRACT_CRAFTING,
      CONTRACT_ADVANCED_QUESTING,
      ...harvesterAddresses,
    ]),
    getCorruptionInfo(CONTRACT_CRAFTING),
    getCorruptionInfo(CONTRACT_ADVANCED_QUESTING),
    ...harvesterAddresses.map(getCorruptionInfo),
  ]);
  return [
    {
      name: "The Forge",
      balance: forgeCorruptionBalance,
      ...forgeCorruptionInfo,
    },
    {
      name: "Ivory Tower",
      balance: ivoryTowerCorruptionBalance,
      ...ivoryTowerCorruptionInfo,
    },
    ...harvestersCorruptionInfo.map((corruption, i) => ({
      name: MINE_NAME_MAPPING[harvesterAddresses[i]],
      balance: harvestersCorruptionBalances[i],
      ...corruption,
    })),
  ];
};

exports.getMines = async () => {
  const [{ addresses, shares, totalShare }, emissionsRatePerSecond] =
    await Promise.all([getHarvesterShares(), getEmissionsRatePerSecond()]);
  return addresses
    .map((address, i) => {
      const emissionsShare = shares[i] / totalShare;
      return {
        address,
        name: MINE_NAME_MAPPING[address],
        emissionsShare,
        emissionsPerSecond: emissionsRatePerSecond * emissionsShare,
      };
    })
    .sort((a, b) => b.emissionsShare - a.emissionsShare);
};

const getInventoryLegionUsers = async () => {
  let users = [];
  let offset = "0";
  while (true) {
    const { userTokens = [] } = await querySubgraph(`{
      userTokens(
        first: 5000
        where: {
          user_: {
            id_not_in: [${BRIDGEWORLD_LEGION_CONTRACTS.map(
              (address) => `"${address}"`
            ).join(", ")}]
          }
          token_: {
            category: Legion
            generation_not: 2
            tokenId_gt: "${offset}"
          }
        }
        orderBy: token__tokenId
        orderDirection: asc
      ) {
        user {
          id
        }
        token {
          tokenId
        }
      }
    }`);
    if (userTokens.length === 0) {
      break;
    }

    users = [...users, ...userTokens.map(({ user }) => user.id)];
    offset = userTokens[userTokens.length - 1].token.tokenId;
  }
  return new Set(users);
};

const getStakedLegionUsers = async () => {
  let users = [];
  let offset = "0";
  while (true) {
    const { stakedTokens = [] } = await querySubgraph(`{
      stakedTokens(
        first: 5000
        where: {
          token_: {
            category: Legion
            generation_not: 2
            tokenId_gt: "${offset}"
          }
        }
        orderBy: token__tokenId
        orderDirection: asc
      ) {
        user {
          id
        }
        token {
          tokenId
        }
      }
    }`);
    if (stakedTokens.length === 0) {
      break;
    }

    users = [...users, ...stakedTokens.map(({ user }) => user.id)];
    offset = stakedTokens[stakedTokens.length - 1].token.tokenId;
  }
  return new Set(users);
};

const getQuestingLegionUsers = async () => {
  let users = [];
  let offset = "0";
  while (true) {
    const { advancedQuests = [] } = await querySubgraph(`{
      advancedQuests(
        first: 5000
        where: {
          status_not: Finished
          token_: {
            generation_not: 2
          }
          requestId_gt: "${offset}"
        }
        orderBy: requestId
        orderDirection: asc
      ) {
        requestId
        user {
          id
        }
      }
    }`);
    if (advancedQuests.length === 0) {
      break;
    }

    users = [...users, ...advancedQuests.map(({ user }) => user.id)];
    offset = advancedQuests[advancedQuests.length - 1].requestId;
  }
  return new Set(users);
};

const getCraftingLegionUsers = async () => {
  let users = [];
  let offset = "0";
  while (true) {
    const { crafts = [] } = await querySubgraph(`{
      crafts(
        first: 5000
        where: {
          status_not: Finished
          random_: {
            requestId_gt: "${offset}"
          }
        }
        orderBy: random__requestId
        orderDirection: asc
      ) {
        random {
          requestId
        }
        user {
          id
        }
      }
    }`);
    if (crafts.length === 0) {
      break;
    }

    users = [...users, ...crafts.map(({ user }) => user.id)];
    offset = crafts[crafts.length - 1].random.requestId;
  }
  return new Set(users);
};

const getCryptsLegionUsers = async () => {
  let users = [];
  let offset = "0";
  while (true) {
    const { cryptsSquads = [] } = await querySubgraph(
      `{
      cryptsSquads(
        first: 5000
        where: {
          characters_: {
            collection: "0xfe8c1ac365ba6780aec5a985d989b327c27670a1"
          }
          squadId_gt: "${offset}"
        }
        orderBy: squadId
        orderDirection: asc
      ) {
        squadId
        user {
          id
        }
      }
    }`,
      "bridgeworld-corruption"
    );
    if (cryptsSquads.length === 0) {
      break;
    }

    users = [...users, ...cryptsSquads.map(({ user }) => user.id)];
    offset = cryptsSquads[cryptsSquads.length - 1].squadId;
  }
  return new Set(users);
};

exports.getLegionHolders = async () => {
  const [
    inventoryUsers,
    stakedUsers,
    questingUsers,
    craftingUsers,
    cryptsUsers,
  ] = await Promise.all([
    getInventoryLegionUsers(),
    getStakedLegionUsers(),
    getQuestingLegionUsers(),
    getCraftingLegionUsers(),
    getCryptsLegionUsers(),
  ]);
  const users = new Set([
    ...inventoryUsers,
    ...stakedUsers,
    ...questingUsers,
    ...craftingUsers,
    ...cryptsUsers,
  ]);
  return [...users];
};
