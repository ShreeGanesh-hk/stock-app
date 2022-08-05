import { IException, setException } from "../data-manage/features/exception";
import { ICandle } from "../data-manage/model/Candle";
import { ISymbol } from "../data-manage/model/Symbol";
import { Constants } from "../utils/constants";
import { fetchJson } from "./requestUtil";

export const GetSymbols = async (token: string): Promise<ISymbol[]> => {
    return fetchJson(Constants.STOCK_SYMBOL + token).then((data) => data).catch((error) => { throw error });
}

export const validateToken = async (token: string): Promise<any> => {
    return (await fetchJson(Constants.FOREX_EXCHANGE + token).then((data) => { return data }).catch((error) => { throw error }));
    // return fetchJson(Constants.FOREX_EXCHANGE + token).then((data) => data).catch((error) => { throw error });
}

export const GetChartData = async (selectedSymbols: ISymbol[], fromDate: string, toDate: string, token: string): Promise<any> => {
    const urls: string[] = [];
    const symbols = ["AIT", "MATX", "PYS"]
    function constructURL() {
        selectedSymbols.map((stockSymbol) => {
            const symbol = stockSymbol.symbol;
            const resolution = "D";
            const from = new Date(fromDate).getTime();
            const to = new Date(toDate).getTime();
            urls.push(Constants.STOCK_CANDLE + `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`)
        });

        // symbols.map((stockSymbol) => {
        //     const symbol = stockSymbol;
        //     const resolution = "D";
        //     const from = new Date(fromDate).getTime();
        //     const to = new Date(toDate).getTime();
        //     urls.push(Constants.STOCK_CANDLE + `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`)
        // });
        console.log(urls);
    }
    constructURL();
    const candleData: ICandle[] = [];
    let requests = urls.map(url => fetchJson(url));
    const promiseData = await Promise.all(requests)
        .then(responses => {
            responses.forEach(
                (response) => (
                    candleData.push({ ...response as ICandle })))
        }).then(() => {
            return candleData;
        })
        .catch((error) => {
            throw error
        });
    return promiseData;

}