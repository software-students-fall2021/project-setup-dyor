//A constructor that create a user data object for all the data pertaining to a user
class OwnedAsset {
  constructor(id, quantityPurchased, unitPrice, datePurchased) {
    this.id = id;
    this.quantityPurchased = quantityPurchased;
    this.unitPrice = unitPrice;
    const [year, month, day] = datePurchased.split("/").reverse();
    this.datePurchased = new Date(year, month, day);
  }
}

//News Data
var assetNews = {};
var cryptoNews = [];
var allImages = [];

//will be a database that will store all the data pertaining to all the users, each user will have some assets that he owns, and password details
const Users = [
  {
    id: "John",
    data: {
      email: "john@gmail.com",
      assets: [
        new OwnedAsset("Bitcoin", 2, 30000, "10/05/2020"),
        new OwnedAsset("Ethereum", 20, 2000, "12/06/2020"),
        new OwnedAsset("Polkadot", 2, 30, "13/08/2020"),
      ],
      password: "123456",
    },
  },
];

//Data Pertaining to all the cyptocurrencies that shall be supported by our platform
const cryptoSymbolsData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
  },
  {
    name: "Tether",
    symbol: "USDT",
  },
  {
    name: "Solana",
    symbol: "SOL",
  },
  {
    name: "Cardano",
    symbol: "ADA",
  },
  {
    name: "XRP",
    symbol: "XRP",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
  },
  {
    name: "SHIBA INU",
    symbol: "SHIB",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    name: "Terra",
    symbol: "LUNA",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
  },
  {
    name: "Algorand",
    symbol: "ALGO",
  },
  {
    name: "Bitcoin Cash",
    symbol: "BCH",
  },
  {
    name: "Stellar",
    symbol: "XLM",
  },
  {
    name: "VeChain",
    symbol: "VET",
  },
  {
    name: "Axie Infinity",
    symbol: "AXS",
  },
  {
    name: "Internet Computer",
    symbol: "ICP",
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
  },
  {
    name: "Filecoin",
    symbol: "FIL",
  },
  {
    name: "TRON",
    symbol: "TRX",
  },
  {
    name: "THETA",
    symbol: "THETA",
  },
  {
    name: "FTX Token",
    symbol: "FTT",
  },
  {
    name: "Ethereum Classic",
    symbol: "ETC",
  },
  {
    name: "Fantom",
    symbol: "FTM",
  },
  {
    name: "Bitcoin BEP2",
    symbol: "BTCB",
  },
  {
    name: "Dai",
    symbol: "DAI",
  },
  {
    name: "Crypto.com Coin",
    symbol: "CRO",
  },
  {
    name: "Hedera",
    symbol: "HBAR",
  },
  {
    name: "NEAR Protocol",
    symbol: "NEAR",
  },
  {
    name: "Decentraland",
    symbol: "MANA",
  },
  {
    name: "Tezos",
    symbol: "XTZ",
  },
  {
    name: "Elrond",
    symbol: "EGLD",
  },
  {
    name: "Monero",
    symbol: "XMR",
  },
  {
    name: "The Graph",
    symbol: "GRT",
  },
  {
    name: "Klaytn",
    symbol: "KLAY",
  },
  {
    name: "EOS",
    symbol: "EOS",
  },
  {
    name: "PancakeSwap",
    symbol: "CAKE",
  },
  {
    name: "Flow",
    symbol: "FLOW",
  },
  {
    name: "THORChain",
    symbol: "RUNE",
  },
  {
    name: "Aave",
    symbol: "AAVE",
  },
  {
    name: "IOTA",
    symbol: "MIOTA",
  },
  {
    name: "Kusama",
    symbol: "KSM",
  },
  {
    name: "eCash",
    symbol: "XEC",
  },
  {
    name: "Quant",
    symbol: "QNT",
  },
  {
    name: "Neo",
    symbol: "NEO",
  },
  {
    name: "Bitcoin SV",
    symbol: "BSV",
  },
  {
    name: "UNUS SED LEO",
    symbol: "LEO",
  },
  {
    name: "Harmony",
    symbol: "ONE",
  },
  {
    name: "Chiliz",
    symbol: "CHZ",
  },
  {
    name: "Helium",
    symbol: "HNT",
  },
  {
    name: "Maker",
    symbol: "MKR",
  },
  {
    name: "TerraUSD",
    symbol: "UST",
  },
  {
    name: "Waves",
    symbol: "WAVES",
  },
  {
    name: "BitTorrent",
    symbol: "BTT",
  },
  {
    name: "The Sandbox",
    symbol: "SAND",
  },
  {
    name: "Stacks",
    symbol: "STX",
  },
  {
    name: "Enjin Coin",
    symbol: "ENJ",
  },
  {
    name: "Holo",
    symbol: "HOT",
  },
  {
    name: "Arweave",
    symbol: "AR",
  },
  {
    name: "Amp",
    symbol: "AMP",
  },
  {
    name: "Zcash",
    symbol: "ZEC",
  },
  {
    name: "Celo",
    symbol: "CELO",
  },
  {
    name: "Compound",
    symbol: "COMP",
  },
  {
    name: "Dash",
    symbol: "DASH",
  },
  {
    name: "OMG Network",
    symbol: "OMG",
  },
  {
    name: "NEM",
    symbol: "XEM",
  },
  {
    name: "Theta Fuel",
    symbol: "TFUEL",
  },
  {
    name: "Nexo",
    symbol: "NEXO",
  },
  {
    name: "Loopring",
    symbol: "LRC",
  },
  {
    name: "Huobi Token",
    symbol: "HT",
  },
  {
    name: "Curve DAO Token",
    symbol: "CRV",
  },
  {
    name: "Qtum",
    symbol: "QTUM",
  },
  {
    name: "ICON",
    symbol: "ICX",
  },
  {
    name: "SushiSwap",
    symbol: "SUSHI",
  },
  {
    name: "KuCoin Token",
    symbol: "KCS",
  },
  {
    name: "Decred",
    symbol: "DCR",
  },
  {
    name: "Basic Attention Token",
    symbol: "BAT",
  },
  {
    name: "Secret",
    symbol: "SCRT",
  },
  {
    name: "Revain",
    symbol: "REV",
  },
  {
    name: "Zilliqa",
    symbol: "ZIL",
  },
  {
    name: "OKB",
    symbol: "OKB",
  },
  {
    name: "yearn.finance",
    symbol: "YFI",
  },
  {
    name: "Mina",
    symbol: "MINA",
  },
  {
    name: "Ravencoin",
    symbol: "RVN",
  },
  {
    name: "Audius",
    symbol: "AUDIO",
  },
  {
    name: "XDC Network",
    symbol: "XDC",
  },
  {
    name: "Synthetix",
    symbol: "SNX",
  },
  {
    name: "TrueUSD",
    symbol: "TUSD",
  },
  {
    name: "Perpetual Protocol",
    symbol: "PERP",
  },
  {
    name: "Bitcoin Gold",
    symbol: "BTG",
  },
  {
    name: "Kadena",
    symbol: "KDA",
  },
  {
    name: "Ankr",
    symbol: "ANKR",
  },
  {
    name: "0x",
    symbol: "ZRX",
  },
  {
    name: "renBTC",
    symbol: "RENBTC",
  },
  {
    name: "Bancor",
    symbol: "BNT",
  },
  {
    name: "Serum",
    symbol: "SRM",
  },
  {
    name: "Celsius",
    symbol: "CEL",
  },
  {
    name: "Siacoin",
    symbol: "SC",
  },
  {
    name: "Telcoin",
    symbol: "TEL",
  },
  {
    name: "Horizen",
    symbol: "ZEN",
  },
  {
    name: "Ren",
    symbol: "REN",
  },
  {
    name: "Pax Dollar",
    symbol: "USDP",
  },
  {
    name: "IOST",
    symbol: "IOST",
  },
  {
    name: "dYdX",
    symbol: "DYDX",
  },
  {
    name: "Dogelon Mars",
    symbol: "ELON",
  },
  {
    name: "Ontology",
    symbol: "ONT",
  },
  {
    name: "OriginTrail",
    symbol: "TRAC",
  },
  {
    name: "Raydium",
    symbol: "RAY",
  },
  {
    name: "SKALE Network",
    symbol: "SKL",
  },
  {
    name: "DigiByte",
    symbol: "DGB",
  },
  {
    name: "1inch Network",
    symbol: "1INCH",
  },
  {
    name: "WAX",
    symbol: "WAXP",
  },
  {
    name: "Moonriver",
    symbol: "MOVR",
  },
  {
    name: "Nano",
    symbol: "NANO",
  },
  {
    name: "Mdex",
    symbol: "MDX",
  },
  {
    name: "UMA",
    symbol: "UMA",
  },
  {
    name: "IoTeX",
    symbol: "IOTX",
  },
  {
    name: "Dent",
    symbol: "DENT",
  },
  {
    name: "Celer Network",
    symbol: "CELR",
  },
  {
    name: "Gnosis",
    symbol: "GNO",
  },
  {
    name: "Voyager Token",
    symbol: "VGX",
  },
  {
    name: "WOO Network",
    symbol: "WOO",
  },
  {
    name: "Livepeer",
    symbol: "LPT",
  },
  {
    name: "Fetch.ai",
    symbol: "FET",
  },
  {
    name: "Ocean Protocol",
    symbol: "OCEAN",
  },
  {
    name: "NuCypher",
    symbol: "NU",
  },
  {
    name: "SwissBorg",
    symbol: "CHSB",
  },
  {
    name: "Storj",
    symbol: "STORJ",
  },
  {
    name: "WINkLink",
    symbol: "WIN",
  },
  {
    name: "Neutrino USD",
    symbol: "USDN",
  },
  {
    name: "WazirX",
    symbol: "WRX",
  },
  {
    name: "Golem",
    symbol: "GLM",
  },
  {
    name: "Nervos Network",
    symbol: "CKB",
  },
  {
    name: "Kava",
    symbol: "KAVA",
  },
  {
    name: "XYO",
    symbol: "XYO",
  },
  {
    name: "Reserve Rights",
    symbol: "RSR",
  },
  {
    name: "Reef",
    symbol: "REEF",
  },
  {
    name: "Alpha Finance Lab",
    symbol: "ALPHA",
  },
  {
    name: "Velas",
    symbol: "VLX",
  },
  {
    name: "DigitalBits",
    symbol: "XDB",
  },
  {
    name: "Polymath",
    symbol: "POLY",
  },
  {
    name: "COTI",
    symbol: "COTI",
  },
  {
    name: "Function X",
    symbol: "FX",
  },
  {
    name: "GateToken",
    symbol: "GT",
  },
  {
    name: "Injective Protocol",
    symbol: "INJ",
  },
  {
    name: "Swipe",
    symbol: "SXP",
  },
  {
    name: "Numeraire",
    symbol: "NMR",
  },
  {
    name: "Lisk",
    symbol: "LSK",
  },
  {
    name: "VeThor Token",
    symbol: "VTHO",
  },
  {
    name: "Orchid",
    symbol: "OXT",
  },
  {
    name: "Bitcoin Standard Hashrate Token",
    symbol: "BTCST",
  },
  {
    name: "Fei USD",
    symbol: "FEI",
  },
  {
    name: "MediBloc",
    symbol: "MED",
  },
  {
    name: "Bitcoin Diamond",
    symbol: "BCD",
  },
  {
    name: "BakeryToken",
    symbol: "BAKE",
  },
  {
    name: "iExec RLC",
    symbol: "RLC",
  },
  {
    name: "Verge",
    symbol: "XVG",
  },
  {
    name: "BORA",
    symbol: "BORA",
  },
  {
    name: "Origin Protocol",
    symbol: "OGN",
  },
  {
    name: "Cartesi",
    symbol: "CTSI",
  },
  {
    name: "NKN",
    symbol: "NKN",
  },
  {
    name: "Verasity",
    symbol: "VRA",
  },
  {
    name: "Ardor",
    symbol: "ARDR",
  },
  {
    name: "Unibright",
    symbol: "UBT",
  },
  {
    name: "Conflux",
    symbol: "CFX",
  },
  {
    name: "StormX",
    symbol: "STMX",
  },
  {
    name: "ASD",
    symbol: "ASD",
  },
  {
    name: "Constellation",
    symbol: "DAG",
  },
  {
    name: "MyNeighborAlice",
    symbol: "ALICE",
  },
  {
    name: "Band Protocol",
    symbol: "BAND",
  },
  {
    name: "Status",
    symbol: "SNT",
  },
  {
    name: "Ontology Gas",
    symbol: "ONG",
  },
  {
    name: "aelf",
    symbol: "ELF",
  },
  {
    name: "Casper",
    symbol: "CSPR",
  },
  {
    name: "Civic",
    symbol: "CVC",
  },
  {
    name: "PAX Gold",
    symbol: "PAXG",
  },
  {
    name: "Hive",
    symbol: "HIVE",
  },
  {
    name: "SingularityNET",
    symbol: "AGIX",
  },
  {
    name: "Prometeus",
    symbol: "PROM",
  },
  {
    name: "Energy Web Token",
    symbol: "EWT",
  },
  {
    name: "Venus",
    symbol: "XVS",
  },
  {
    name: "Chromia",
    symbol: "CHR",
  },
  {
    name: "Badger DAO",
    symbol: "BADGER",
  },
  {
    name: "Ampleforth",
    symbol: "AMPL",
  },
  {
    name: "Ergo",
    symbol: "ERG",
  },
  {
    name: "Oasis Network",
    symbol: "ROSE",
  },
  {
    name: "Stratis",
    symbol: "STRAX",
  },
  {
    name: "Orbs",
    symbol: "ORBS",
  },
  {
    name: "Augur",
    symbol: "REP",
  },
  {
    name: "Ark",
    symbol: "ARK",
  },
  {
    name: "Proton",
    symbol: "XPR",
  },
  {
    name: "MaidSafeCoin",
    symbol: "MAID",
  },
];

var database = (module.exports = {
  assetNews: assetNews,
  cryptoNews: cryptoNews,
  allImages: allImages,
  cryptoSymbols: cryptoSymbolsData,
  Users: Users,
});
