import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaleService from '../../services/SaleService';


const CreateSaleComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemName, setItemName] = useState('');
    const [givenPrice, setGivenPrice] = useState('');
    const [soldPrice, setSoldPrice] = useState('');
    const [profit, setProfit] = useState('');

    useEffect(() => {
        if (id === '_add') {
            return;
        } else {
            SaleService.getSaleById(id).then((res) => {
                let sale = res.data;
                setItemName(sale.itemName);
                setGivenPrice(sale.givenPrice);
                setSoldPrice(sale.soldPrice);
                setProfit(sale.soldPrice - sale.givenPrice);
            });
        }
    }, [id]);

    const saveOrUpdateSale = (e) => {
        e.preventDefault();
        let sale = { itemName, givenPrice, soldPrice, profit: soldPrice - givenPrice };
        console.log('sale => ' + JSON.stringify(sale));

        if (id === '_add') {
            SaleService.createSale(sale).then(res => {
                navigate('/sales');
            });
        } else {
            SaleService.updateSale(sale, id).then(res => {
                navigate('/sales');
            });
        }
    };

    const changeItemNameHandler = (event) => {
        setItemName(event.target.value);
    };

    const changeGivenPriceHandler = (event) => {
        setGivenPrice(event.target.value);
    };

    const changeSoldPriceHandler = (event) => {
        setSoldPrice(event.target.value);
    };

    const cancel = () => {
        navigate('/sales');
    };

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add Sale</h3>
        } else {
            return <h3 className="text-center">Update Sale</h3>
        }
    };

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Item Name: </label>
                                    <input
                                        placeholder="Item Name"
                                        name="itemName"
                                        className="form-control"
                                        value={itemName}
                                        onChange={changeItemNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Given Price: </label>
                                    <input
                                        placeholder="Given Price"
                                        name="givenPrice"
                                        className="form-control"
                                        value={givenPrice}
                                        onChange={changeGivenPriceHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Sold Price: </label>
                                    <input
                                        placeholder="Sold Price"
                                        name="soldPrice"
                                        className="form-control"
                                        value={soldPrice}
                                        onChange={changeSoldPriceHandler}
                                    />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateSale}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSaleComponent;
