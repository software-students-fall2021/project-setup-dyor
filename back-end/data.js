//A constructor that create a user data object for all the data pertaining to a user
class OwnedAsset {
    constructor(id, quantityPurchased, unitPrice, datePurchased) {
        this.id = id;
        this.quantityPurchased = quantityPurchased;
        this.unitPrice = unitPrice;
        const [year, month, day] = datePurchased.split("/").reverse();
        this.datePurchased = Date(year, month, day);
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
                new OwnedAsset("Bitcoin", 2, 30000, "10/05/2021"),
                new OwnedAsset("Ethereum", 20, 2000, "12/06/2021"),
                new OwnedAsset("Polkadot", 2, 30, "13/08/2021"),
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
        tweets: [],
        fb: [],
    },
    {
        name: "Ethereum",
        symbol: "ETH",
        tweets: [],
        fb: [],
    },
    {
        name: "Binance Coin",
        symbol: "BNB",
        tweets: [],
        fb: [],
    },
    {
        name: "Tether",
        symbol: "USDT",
        tweets: [],
        fb: [],
    },
    {
        name: "Solana",
        symbol: "SOL",
        tweets: [],
        fb: [],
    },
    {
        name: "Cardano",
        symbol: "ADA",
        tweets: [],
        fb: [],
    },
    {
        name: "XRP",
        symbol: "XRP",
        tweets: [],
        fb: [],
    },
    {
        name: "Polkadot",
        symbol: "DOT",
        tweets: [],
        fb: [],
    },
    {
        name: "SHIBA INU",
        symbol: "SHIB",
        tweets: [],
        fb: [],
    },
    {
        name: "Dogecoin",
        symbol: "DOGE",
        tweets: [],
        fb: [],
    },
    {
        name: "USD Coin",
        symbol: "USDC",
        tweets: [],
        fb: [],
    },
    {
        name: "Terra",
        symbol: "LUNA",
        tweets: [],
        fb: [],
    },
    {
        name: "Uniswap",
        symbol: "UNI",
        tweets: [],
        fb: [],
    },
    {
        name: "Avalanche",
        symbol: "AVAX",
        tweets: [],
        fb: [],
    },
    {
        name: "Chainlink",
        symbol: "LINK",
        tweets: [],
        fb: [],
    },
    {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        tweets: [],
        fb: [],
    },
    {
        name: "Polygon",
        symbol: "MATIC",
        tweets: [],
        fb: [],
    },
    {
        name: "Litecoin",
        symbol: "LTC",
        tweets: [],
        fb: [],
    },
    {
        name: "Binance USD",
        symbol: "BUSD",
        tweets: [],
        fb: [],
    },
    {
        name: "Algorand",
        symbol: "ALGO",
        tweets: [],
        fb: [],
    },
    {
        name: "Bitcoin Cash",
        symbol: "BCH",
        tweets: [],
        fb: [],
    },
    {
        name: "Stellar",
        symbol: "XLM",
        tweets: [],
        fb: [],
    },
    {
        name: "VeChain",
        symbol: "VET",
        tweets: [],
        fb: [],
    },
    {
        name: "Axie Infinity",
        symbol: "AXS",
        tweets: [],
        fb: []
    },
    {
        name: "Internet Computer",
        symbol: "ICP",
        tweets: [],
        fb: []
    },
    {
        name: "Cosmos",
        symbol: "ATOM",
        tweets: [],
        fb: []
    },
    {
        name: "Filecoin",
        symbol: "FIL",
        tweets: [],
        fb: []
    },
    {
        name: "TRON",
        symbol: "TRX",
        tweets: [],
        fb: []
    },
    {
        name: "THETA",
        symbol: "THETA",
        tweets: [],
        fb: []
    },
    {
        name: "FTX Token",
        symbol: "FTT",
        tweets: [],
        fb: []
    },
    {
        name: "Ethereum Classic",
        symbol: "ETC",
        tweets: [],
        fb: []
    },
    {
        name: "Fantom",
        symbol: "FTM",
        tweets: [],
        fb: []
    },
    {
        name: "Bitcoin BEP2",
        symbol: "BTCB",
        tweets: [],
        fb: []
    },
    {
        name: "Dai",
        symbol: "DAI",
        tweets: [],
        fb: []
    },
    {
        name: "Crypto.com Coin",
        symbol: "CRO",
        tweets: [],
        fb: []
    },
    {
        name: "Hedera",
        symbol: "HBAR",
        tweets: [],
        fb: []
    },
    {
        name: "NEAR Protocol",
        symbol: "NEAR",
        tweets: [],
        fb: []
    },
    {
        name: "Decentraland",
        symbol: "MANA",
        tweets: [],
        fb: []
    },
    {
        name: "Tezos",
        symbol: "XTZ",
        tweets: [],
        fb: []
    },
    {
        name: "Elrond",
        symbol: "EGLD",
        tweets: [],
        fb: []
    },
    {
        name: "Monero",
        symbol: "XMR",
        tweets: [],
        fb: []
    },
    {
        name: "The Graph",
        symbol: "GRT",
        tweets: [],
        fb: []
    },
    {
        name: "Klaytn",
        symbol: "KLAY",
        tweets: [],
        fb: []
    },
    {
        name: "EOS",
        symbol: "EOS",
        tweets: [],
        fb: []
    },
    {
        name: "PancakeSwap",
        symbol: "CAKE",
        tweets: [],
        fb: []
    },
    {
        name: "Flow",
        symbol: "FLOW",
        tweets: [],
        fb: []
    },
    {
        name: "THORChain",
        symbol: "RUNE",
        tweets: [],
        fb: []
    },
    {
        name: "Aave",
        symbol: "AAVE",
        tweets: [],
        fb: []
    },
    {
        name: "IOTA",
        symbol: "MIOTA",
        tweets: [],
        fb: []
    },
    {
        name: "Kusama",
        symbol: "KSM",
        tweets: [],
        fb: []
    },
    {
        name: "eCash",
        symbol: "XEC",
        tweets: [],
        fb: []
    },
    {
        name: "Quant",
        symbol: "QNT",
        tweets: [],
        fb: []
    },
    {
        name: "Neo",
        symbol: "NEO",
        tweets: [],
        fb: []
    },
    {
        name: "Bitcoin SV",
        symbol: "BSV",
        tweets: [],
        fb: []
    },
    {
        name: "UNUS SED LEO",
        symbol: "LEO",
        tweets: [],
        fb: []
    },
    {
        name: "Harmony",
        symbol: "ONE",
        tweets: [],
        fb: []
    },
    {
        name: "Chiliz",
        symbol: "CHZ",
        tweets: [],
        fb: []
    },
    {
        name: "Helium",
        symbol: "HNT",
        tweets: [],
        fb: []
    },
    {
        name: "Maker",
        symbol: "MKR",
        tweets: [],
        fb: []
    },
    {
        name: "TerraUSD",
        symbol: "UST",
        tweets: [],
        fb: []
    },
    {
        name: "Waves",
        symbol: "WAVES",
        tweets: [],
        fb: []
    },
    {
        name: "BitTorrent",
        symbol: "BTT",
        tweets: [],
        fb: []
    },
    {
        name: "The Sandbox",
        symbol: "SAND",
        tweets: [],
        fb: []
    },
    {
        name: "Stacks",
        symbol: "STX",
        tweets: [],
        fb: []
    },
    {
        name: "Enjin Coin",
        symbol: "ENJ",
        tweets: [],
        fb: []
    },
    {
        name: "Holo",
        symbol: "HOT",
        tweets: [],
        fb: [],
    },
    {
        name: "Arweave",
        symbol: "AR",
        tweets: [],
        fb: [],
    },
    {
        name: "Amp",
        symbol: "AMP",
        tweets: [],
        fb: [],
    },
    {
        name: "Zcash",
        symbol: "ZEC",
        tweets: [],
        fb: [],
    },
    {
        name: "Celo",
        symbol: "CELO",
        tweets: [],
        fb: [],
    },
    {
        name: "Compound",
        symbol: "COMP",
        tweets: [],
        fb: [],
    },
    {
        name: "Dash",
        symbol: "DASH",
        tweets: [],
        fb: [],
    },
    {
        name: "OMG Network",
        symbol: "OMG",
        tweets: [],
        fb: [],
    },
    {
        name: "NEM",
        symbol: "XEM",
        tweets: [],
        fb: [],
    },
    {
        name: "Theta Fuel",
        symbol: "TFUEL",
        tweets: [],
        fb: [],
    },
    {
        name: "Nexo",
        symbol: "NEXO",
        tweets: [],
        fb: [],
    },
    {
        name: "Loopring",
        symbol: "LRC",
        tweets: [],
        fb: [],
    },
    {
        name: "Huobi Token",
        symbol: "HT",
        tweets: [],
        fb: [],
    },
    {
        name: "Curve DAO Token",
        symbol: "CRV",
        tweets: [],
        fb: [],
    },
    {
        name: "Qtum",
        symbol: "QTUM",
        tweets: [],
        fb: [],
    },
    {
        name: "ICON",
        symbol: "ICX",
        tweets: [],
        fb: [],
    },
    {
        name: "SushiSwap",
        symbol: "SUSHI",
        tweets: [],
        fb: [],
    },
    {
        name: "KuCoin Token",
        symbol: "KCS",
        tweets: [],
        fb: [],
    },
    {
        name: "Decred",
        symbol: "DCR",
        tweets: [],
        fb: [],
    },
    {
        name: "Basic Attention Token",
        symbol: "BAT",
        tweets: [],
        fb: [],
    },
    {
        name: "Secret",
        symbol: "SCRT",
        tweets: [],
        fb: [],
    },
    {
        name: "Revain",
        symbol: "REV",
        tweets: [],
        fb: [],
    },
    {
        name: "Zilliqa",
        symbol: "ZIL",
        tweets: [],
        fb: []
    },
    {
        name: "OKB",
        symbol: "OKB",
        tweets: [],
        fb: []
    },
    {
        name: "yearn.finance",
        symbol: "YFI",
        tweets: [],
        fb: []
    },
    {
        name: "Mina",
        symbol: "MINA",
        tweets: [],
        fb: []
    },
    {
        name: "Ravencoin",
        symbol: "RVN",
        tweets: [],
        fb: []
    },
    {
        name: "Audius",
        symbol: "AUDIO",
        tweets: [],
        fb: []
    },
    {
        name: "XDC Network",
        symbol: "XDC",
        tweets: [],
        fb: []
    },
    {
        name: "Synthetix",
        symbol: "SNX",
        tweets: [],
        fb: []
    },
    {
        name: "TrueUSD",
        symbol: "TUSD",
        tweets: [],
        fb: []
    },
    {
        name: "Perpetual Protocol",
        symbol: "PERP",
        tweets: [],
        fb: []
    },
    {
        name: "Bitcoin Gold",
        symbol: "BTG",
        tweets: [],
        fb: []
    },
    {
        name: "Kadena",
        symbol: "KDA",
        tweets: [],
        fb: []
    },
    {
        name: "Ankr",
        symbol: "ANKR",
        tweets: [],
        fb: []
    },
    {
        name: "0x",
        symbol: "ZRX",
        tweets: [],
        fb: []
    },
    {
        name: "renBTC",
        symbol: "RENBTC",
        tweets: [],
        fb: []
    },
    {
        name: "Bancor",
        symbol: "BNT",
        tweets: [],
        fb: []
    },
    {
        name: "Serum",
        symbol: "SRM",
        tweets: [],
        fb: []
    },
    {
        name: "Celsius",
        symbol: "CEL",
        tweets: [],
        fb: []
    },
    {
        name: "Siacoin",
        symbol: "SC",
        tweets: [],
        fb: []
    },
    {
        name: "Telcoin",
        symbol: "TEL",
        tweets: [],
        fb: []
    },
    {
        name: "Horizen",
        symbol: "ZEN",
        tweets: [],
        fb: []
    },
    {
        name: "Ren",
        symbol: "REN",
        tweets: [],
        fb: []
    },
    {
        name: "Pax Dollar",
        symbol: "USDP",
        tweets: [],
        fb: []
    },
    {
        name: "IOST",
        symbol: "IOST",
        tweets: [],
        fb: []
    },
    {
        name: "dYdX",
        symbol: "DYDX",
        tweets: [],
        fb: []
    },
    {
        name: "Dogelon Mars",
        symbol: "ELON",
        tweets: [],
        fb: []
    },
    {
        name: "Ontology",
        symbol: "ONT",
        tweets: [],
        fb: []
    },
    {
        name: "OriginTrail",
        symbol: "TRAC",
        tweets: [],
        fb: []
    },
    {
        name: "Raydium",
        symbol: "RAY",
        tweets: [],
        fb: []
    },
    {
        name: "SKALE Network",
        symbol: "SKL",
        tweets: [],
        fb: []
    },
    {
        name: "DigiByte",
        symbol: "DGB",
        tweets: [],
        fb: []
    },
    {
        name: "1inch Network",
        symbol: "1INCH",
        tweets: [],
        fb: []
    },
    {
        name: "WAX",
        symbol: "WAXP",
        tweets: [],
        fb: []
    },
    {
        name: "Moonriver",
        symbol: "MOVR",
        tweets: [],
        fb: []
    },
    {
        name: "Nano",
        symbol: "NANO",
        tweets: [],
        fb: []
    },
    {
        name: "Mdex",
        symbol: "MDX",
        tweets: [],
        fb: []
    },
    {
        name: "UMA",
        symbol: "UMA",
        tweets: [],
        fb: []
    },
    {
        name: "IoTeX",
        symbol: "IOTX",
        tweets: [],
        fb: []
    },
    {
        name: "Dent",
        symbol: "DENT",
        tweets: [],
        fb: []
    },
    {
        name: "Celer Network",
        symbol: "CELR",
        tweets: [],
        fb: []
    },
    {
        name: "Gnosis",
        symbol: "GNO",
        tweets: [],
        fb: []
    },
    {
        name: "Voyager Token",
        symbol: "VGX",
        tweets: [],
        fb: []
    },
    {
        name: "WOO Network",
        symbol: "WOO",
        tweets: [],
        fb: []
    },
    {
        name: "Livepeer",
        symbol: "LPT",
        tweets: [],
        fb: []
    },
    {
        name: "Fetch.ai",
        symbol: "FET",
        tweets: [],
        fb: []
    },
    {
        name: "Ocean Protocol",
        symbol: "OCEAN",
        tweets: [],
        fb: []
    },
    {
        name: "NuCypher",
        symbol: "NU",
        tweets: [],
        fb: []
    },
    {
        name: "SwissBorg",
        symbol: "CHSB",
        tweets: [],
        fb: []
    },
    {
        name: "Storj",
        symbol: "STORJ",
        tweets: [],
        fb: []
    },
    {
        name: "WINkLink",
        symbol: "WIN",
        tweets: [],
        fb: []
    },
    {
        name: "Neutrino USD",
        symbol: "USDN",
        tweets: [],
        fb: []
    },
    {
        name: "WazirX",
        symbol: "WRX",
        tweets: [],
        fb: []
    },
    {
        name: "Golem",
        symbol: "GLM",
        tweets: [],
        fb: []
    },
    {
        name: "Nervos Network",
        symbol: "CKB",
        tweets: [],
        fb: []
    },
    {
        name: "Kava",
        symbol: "KAVA",
        tweets: [],
        fb: []
    },
    {
        name: "XYO",
        symbol: "XYO",
        tweets: [],
        fb: []
    },
    {
        name: "Reserve Rights",
        symbol: "RSR",
        tweets: [],
        fb: []
    },
    {
        name: "Reef",
        symbol: "REEF",
        tweets: [],
        fb: []
    },
    {
        name: "Alpha Finance Lab",
        symbol: "ALPHA",
        tweets: [],
        fb: []
    },
    {
        name: "Velas",
        symbol: "VLX",
        tweets: [],
        fb: []
    },
    {
        name: "DigitalBits",
        symbol: "XDB",
        tweets: [],
        fb: []
    },
    {
        name: "Polymath",
        symbol: "POLY",
        tweets: [],
        fb: []
    },
    {
        name: "COTI",
        symbol: "COTI",
        tweets: [],
        fb: []
    },
    {
        name: "Function X",
        symbol: "FX",
        tweets: [],
        fb: []
    },
    {
        name: "GateToken",
        symbol: "GT",
        tweets: [],
        fb: []
    },
    {
        name: "Injective Protocol",
        symbol: "INJ",
        tweets: [],
        fb: []
    },
    {
        name: "Swipe",
        symbol: "SXP",
        tweets: [],
        fb: []
    },
    {
        name: "Numeraire",
        symbol: "NMR",
        tweets: [],
        fb: []
    },
    {
        name: "Lisk",
        symbol: "LSK",
        tweets: [],
        fb: []
    },
    {
        name: "VeThor Token",
        symbol: "VTHO",
        tweets: [],
        fb: []
    },
    {
        name: "Orchid",
        symbol: "OXT",
        tweets: [],
        fb: []
    },
    {
        name: "Bitcoin Standard Hashrate Token",
        symbol: "BTCST",
        tweets: [],
        fb: []
    },
    {
        name: "Fei USD",
        symbol: "FEI",
        tweets: [],
        fb: []
    },
    {
        name: "MediBloc",
        symbol: "MED",
        tweets: [],
        fb: []
    },
    {
        name: "Bitcoin Diamond",
        symbol: "BCD",
        tweets: [],
        fb: []
    },
    {
        name: "BakeryToken",
        symbol: "BAKE",
        tweets: [],
        fb: []
    },
    {
        name: "iExec RLC",
        symbol: "RLC",
        tweets: [],
        fb: []
    },
    {
        name: "Verge",
        symbol: "XVG",
        tweets: [],
        fb: []
    },
    {
        name: "BORA",
        symbol: "BORA",
        tweets: [],
        fb: []
    },
    {
        name: "Origin Protocol",
        symbol: "OGN",
        tweets: [],
        fb: []
    },
    {
        name: "Cartesi",
        symbol: "CTSI",
        tweets: [],
        fb: []
    },
    {
        name: "NKN",
        symbol: "NKN",
        tweets: [],
        fb: []
    },
    {
        name: "Verasity",
        symbol: "VRA",
        tweets: [],
        fb: []
    },
    {
        name: "Ardor",
        symbol: "ARDR",
        tweets: [],
        fb: []
    },
    {
        name: "Unibright",
        symbol: "UBT",
        tweets: [],
        fb: []
    },
    {
        name: "Conflux",
        symbol: "CFX",
        tweets: [],
        fb: []
    },
    {
        name: "StormX",
        symbol: "STMX",
        tweets: [],
        fb: []
    },
    {
        name: "ASD",
        symbol: "ASD",
        tweets: [],
        fb: []
    },
    {
        name: "Constellation",
        symbol: "DAG",
        tweets: [],
        fb: []
    },
    {
        name: "MyNeighborAlice",
        symbol: "ALICE",
        tweets: [],
        fb: []
    },
    {
        name: "Band Protocol",
        symbol: "BAND",
        tweets: [],
        fb: []
    },
    {
        name: "Status",
        symbol: "SNT",
        tweets: [],
        fb: []
    },
    {
        name: "Ontology Gas",
        symbol: "ONG",
        tweets: [],
        fb: []
    },
    {
        name: "aelf",
        symbol: "ELF",
        tweets: [],
        fb: []
    },
    {
        name: "Casper",
        symbol: "CSPR",
        tweets: [],
        fb: []
    },
    {
        name: "Civic",
        symbol: "CVC",
        tweets: [],
        fb: []
    },
    {
        name: "PAX Gold",
        symbol: "PAXG",
        tweets: [],
        fb: []
    },
    {
        name: "Hive",
        symbol: "HIVE",
        tweets: [],
        fb: []
    },
    {
        name: "SingularityNET",
        symbol: "AGIX",
        tweets: [],
        fb: []
    },
    {
        name: "Prometeus",
        symbol: "PROM",
        tweets: [],
        fb: []
    },
    {
        name: "Energy Web Token",
        symbol: "EWT",
        tweets: [],
        fb: []
    },
    {
        name: "Venus",
        symbol: "XVS",
        tweets: [],
        fb: []
    },
    {
        name: "Chromia",
        symbol: "CHR",
        tweets: [],
        fb: []
    },
    {
        name: "Badger DAO",
        symbol: "BADGER",
        tweets: [],
        fb: []
    },
    {
        name: "Ampleforth",
        symbol: "AMPL",
        tweets: [],
        fb: []
    },
    {
        name: "Ergo",
        symbol: "ERG",
        tweets: [],
        fb: []
    },
    {
        name: "Oasis Network",
        symbol: "ROSE",
        tweets: [],
        fb: []
    },
    {
        name: "Stratis",
        symbol: "STRAX",
        tweets: [],
        fb: []
    },
    {
        name: "Orbs",
        symbol: "ORBS",
        tweets: [],
        fb: []
    },
    {
        name: "Augur",
        symbol: "REP",
        tweets: [],
        fb: []
    },
    {
        name: "Ark",
        symbol: "ARK",
        tweets: [],
        fb: []
    },
    {
        name: "Proton",
        symbol: "XPR",
        tweets: [],
        fb: []
    },
    {
        name: "MaidSafeCoin",
        symbol: "MAID",
        tweets: [],
        fb: []
    },
];

var database = (module.exports = {
    assetNews: assetNews,
    cryptoNews: cryptoNews,
    allImages: allImages,
    cryptoSymbols: cryptoSymbolsData,
    Users: Users,
});
