import { Button } from "antd";

const BookForm = () => {
    return (
        <div className="book-form" style={{ margin: "0 0 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Table Book</h3>
                <Button type="primary">Create Book</Button>
            </div>
        </div >
    );
}

export default BookForm;