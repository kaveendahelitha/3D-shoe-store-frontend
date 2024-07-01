import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SaleService from '../services/SaleService';

const ListSaleComponent = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        SaleService.getSales().then((res) => {
            setSales(res.data);
        });
    }, []);

    const deleteSale = (id) => {
        SaleService.deleteSale(id).then((res) => {
            setSales(sales.filter(sale => sale.id !== id));
        });
    };

    return (
        <div>
            <h2 className="text-center">Sales List</h2>
            <div className="row">
                <Link to="/add-sale/_add" className="btn btn-primary">Add Sale</Link>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Item Id </th>
                            <th> Item Name </th>
                            <th> Given Price </th>
                            <th> Sold Price </th>
                            <th> Profit </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales.map(
                                sale => 
                                <tr key={sale.id}>
                                    <td> {sale.id} </td>
                                    <td> {sale.itemName} </td>
                                    <td> {sale.givenPrice} </td>
                                    <td> {sale.soldPrice} </td>
                                    <td> {sale.profit} </td>
                                    <td>
                                        <Link to={`/update-sale/${sale.id}`} className="btn btn-info">Update</Link>
                                        <button onClick={() => deleteSale(sale.id)} className="btn btn-danger" style={{marginLeft: "10px"}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSaleComponent;
