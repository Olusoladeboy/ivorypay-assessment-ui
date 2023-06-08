import axios from "axios";

export interface TransactionInterface {
    id?: number;
    name: string;
    email: string;
    item: string;
    price: number;
}

export const createTransaction = async (transactionData: TransactionInterface) => {
    try {
        const { data, status } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
            transactionData
        )
        if (status !== 201) {
            throw new Error('Error')
        }
        return data
    } catch (error) {
        console.error(error)
    }
}

export const retrieveTransactions = async () => {
    try {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        )
        return data
    } catch (error) {
        console.error(error)
    }
}