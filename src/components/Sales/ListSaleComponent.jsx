import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SaleService from '../../services/SaleService';

const ListSaleComponent = () => {
    const [sales, setSales] = useState([]);
    const pdfRef = useRef();

    useEffect(() => {
        SaleService.getSales().then((res) => {
            setSales(res.data);
        });
    }, []);

    const deleteSale = (id) => {
        if (window.confirm("Are you sure you want to delete this sale?")) {
            SaleService.deleteSale(id).then((res) => {
                setSales(sales.filter(sale => sale.id !== id));
            });
        }
    };

    const downloadPDF = () => {
        const input = pdfRef.current;
        const actions = input.querySelectorAll('.actions');
        actions.forEach(action => action.style.display = 'none');

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 40;

            // Add title to PDF
            pdf.setFontSize(20);
            pdf.text('Sales Report', pdfWidth / 2, 20, { align: 'center' });

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('sales_report.pdf');

            actions.forEach(action => action.style.display = '');
        });
    };

    return (
        <div>
            <h2 className="text-center">Sales List</h2>
            <div className="row">
                <Link to="/add-sale/_add" className="btn btn-primary">Add Sale</Link>
                <button onClick={downloadPDF} className="btn btn-primary ml-3">Download PDF</button>
            </div>
            <br />
            <div className="row" ref={pdfRef}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Item Id </th>
                            <th> Item Name </th>
                            <th> Given Price Rs</th>
                            <th> Sold Price Rs </th>
                            <th> Profit Rs</th>
                            <th className="actions"> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr key={sale.id}>
                                <td> {sale.id} </td>
                                <td> {sale.itemName} </td>
                                <td> {sale.givenPrice} </td>
                                <td> {sale.soldPrice} </td>
                                <td> {sale.profit} </td>
                                <td className="actions">
                                    <Link to={`/update-sale/${sale.id}`} className="btn btn-info">Update</Link>
                                    <button
                                        onClick={() => deleteSale(sale.id)}
                                        className="btn btn-danger"
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSaleComponent;
