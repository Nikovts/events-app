import React from "react";
import "./WishList.css";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRef } from "react";


function WishList() {
  const printRef = useRef();
  const wishList = JSON.parse(localStorage.getItem("wishList"));
  const header = ['Event name', 'Event date', 'Number of tickets', 'Total amount'];
  const wishKeys = ['name', 'date', 'tickets', 'amount'];
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('wishlist.pdf');
  };
  const headerList = header.map((title, index) => (
    <h4 key={index} className={`wishlist-header-title${title === 'Event name' ? '-name' : ''}`}>
      {title}
    </h4>
  ))
  const dataList = wishList.map((event, index) => (
    <div key={index} className="wishlist-data-row">
      {
        wishKeys.map((key, index) => (
          <span className={`wishlist-data-row-${key === 'name' ? 'name' : 'item'}`} key={index}>{event[key]} </span>
        ))
      }
    </div>
  ))

  return (
    <>
      <button type="button" onClick={handleDownloadPdf} className="download-button">
        Download as PDF
      </button>
      <div ref={printRef}>
        <h1>
          Wish List
        </h1>
        {wishList.length

        ? <div className="wishlist">
            <div className="wishlist-header">
              {headerList}
            </div>
            <div className="wishlist-data">
              {dataList}
            </div>
          </div>
        : <h3 className="No-data">No events added to your Wish List</h3>}
      </div>
    </>
  )
}
export default WishList;