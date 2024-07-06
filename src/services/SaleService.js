import axios from 'axios';

const SALE_API_BASE_URL = "http://localhost:8080/api/v1/sales";

class SaleService {

    getSales(){
        return axios.get(SALE_API_BASE_URL);
    }

    createSale(sale){
        return axios.post(SALE_API_BASE_URL, sale);
    }

    getSaleById(saleId){
        return axios.get(SALE_API_BASE_URL + '/' + saleId);
    }

    updateSale(sale, saleId){
        return axios.put(SALE_API_BASE_URL + '/' + saleId, sale);
    }

    deleteSale(saleId){
        return axios.delete(SALE_API_BASE_URL + '/' + saleId);
    }
}

export default new SaleService();
