import AxiosClient from './AxiosClient'


const getToken = async (): Promise<any> => {
    try {
        const response = await AxiosClient.post('/auth', { apiKey: "23567b218376f79d9415" })
        return response.data
    } catch (error) {
        throw Error(error)
    }
}

export default getToken