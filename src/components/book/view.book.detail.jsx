import { Drawer } from "antd";

const BookDetail = ({ openBookDetail, setOpenBookDetail, dataBookDetail, setDataBookDetail, loadBook }) => {

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Book Detail"
                onClose={() => { setOpenBookDetail(false); setDataBookDetail(null) }}
                open={openBookDetail}
            >
                {dataBookDetail ?
                    <>
                        <p>ID: {dataBookDetail._id}</p> <br />
                        <p>Title: {dataBookDetail.mainText}</p> <br />
                        <p>Author: {dataBookDetail.author}</p> <br />
                        <p>Category: {dataBookDetail.category}</p> <br />
                        <p>Price: {dataBookDetail.price} ₫</p> <br />
                        <p>Quantity: {dataBookDetail.quantity}</p> <br />
                        <p>Sold: {dataBookDetail.sold}</p> <br />
                        <p>Thumbnail: </p>
                        <div style={{ marginTop: "20px", width: "50%", border: "1px solid black" }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`} />
                        </div>
                    </>
                    :
                    <p> No data</p>
                }
            </Drawer >
        </>
    );
}

export default BookDetail;